const itemsRouter = require("express").Router();
const Item = require("../models/item");
const User = require("../models/user");
const jwt = require("jsonwebtoken");

const getTokenFrom = (request) => {
  const authorization = request.get("authorization");
  return authorization && authorization.startsWith("Bearer ")
    ? authorization.replace("Bearer ", "")
    : null;
};

const requireAuth = async (request) => {
  const token = getTokenFrom(request);
  if (!token) return null;

  try {
    const decodedToken = jwt.verify(token, process.env.SECRET);
    if (!decodedToken.id) return null;

    return await User.findById(decodedToken.id);
  } catch (error) {
    return null;
  }
};

itemsRouter.get("/", async (request, response, next) => {
  try {
    const user = await requireAuth(request);
    if (!user) {
      return response.status(401).json({ error: "token missing or invalid" });
    }

    const items = await Item.find({ user: user._id }).populate("user", {
      username: 1,
      name: 1,
    });
    response.json(items);
  } catch (error) {
    next(error);
  }
});

itemsRouter.post("/", async (request, response, next) => {
  try {
    const user = await requireAuth(request);
    if (!user) {
      return response.status(401).json({ error: "token missing or invalid" });
    }

    const body = request.body;
    const item = new Item({
      name: body.name,
      category: body.category,
      status: body.status || "Coleção",
      description: body.description,
      user: user._id,
    });

    const savedItem = await item.save();

    user.items = user.items.concat(savedItem._id);
    await user.save();

    const populatedItem = await savedItem.populate("user", {
      username: 1,
      name: 1,
    });
    response.status(201).json(populatedItem);
  } catch (error) {
    next(error);
  }
});

itemsRouter.delete("/:id", async (request, response, next) => {
  try {
    const user = await requireAuth(request);
    if (!user) {
      return response.status(401).json({ error: "token missing or invalid" });
    }

    const item = await Item.findById(request.params.id);
    if (!item) {
      return response.status(404).json({ error: "item not found" });
    }

    if (item.user.toString() !== user._id.toString()) {
      return response
        .status(403)
        .json({ error: "only the owner can delete this item" });
    }

    await Item.findByIdAndDelete(request.params.id);
    response.status(204).end();
  } catch (error) {
    next(error);
  }
});

itemsRouter.put("/:id", async (request, response, next) => {
  try {
    const user = await requireAuth(request);
    if (!user) {
      return response.status(401).json({ error: "token missing or invalid" });
    }

    const itemToUpdate = await Item.findById(request.params.id);
    if (!itemToUpdate) {
      return response.status(404).json({ error: "item not found" });
    }

    if (itemToUpdate.user.toString() !== user._id.toString()) {
      return response
        .status(403)
        .json({ error: "not authorized to update this item" });
    }

    const body = request.body;
    const updatedData = {
      name: body.name || itemToUpdate.name,
      category: body.category || itemToUpdate.category,
      status: body.status || itemToUpdate.status,
      description: body.description || itemToUpdate.description,
    };

    const updatedItem = await Item.findByIdAndUpdate(
      request.params.id,
      updatedData,
      { new: true, runValidators: true },
    ).populate("user", { username: 1, name: 1 });

    response.json(updatedItem);
  } catch (error) {
    next(error);
  }
});

module.exports = itemsRouter;
