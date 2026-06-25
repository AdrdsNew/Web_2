Cypress.Commands.add("resetDb", () => {
  cy.request("POST", "http://localhost:3001/api/testing/reset");
});

Cypress.Commands.add("createUser", ({ username, name, password }) => {
  cy.request("POST", "http://localhost:3001/api/users", {
    username,
    name,
    password,
  });
});

Cypress.Commands.add("loginWithUi", ({ username, password }) => {
  cy.get('input[placeholder="Usuário"]').type(username);
  cy.get('input[placeholder="Senha"]').type(password);
  cy.get('button[type="submit"]').contains("Login").click();
});

Cypress.Commands.add("loginViaApi", ({ username, password }) => {
  cy.request("POST", "http://localhost:3001/api/login", {
    username,
    password,
  }).then(({ body }) => {
    window.localStorage.setItem("loggedItemAppUser", JSON.stringify(body));
    cy.visit("http://localhost:5173");
  });
});

Cypress.Commands.add(
  "createItemWithUi",
  ({ name, category, status, description = "" }) => {
    cy.get('input[name="name"]').clear().type(name);
    cy.get('input[name="category"]').clear().type(category);

    cy.get('select[name="status"]').select(status);

    if (description) {
      cy.get('input[name="description"]').clear().type(description);
    } else {
      cy.get('input[name="description"]').clear();
    }

    cy.get('button[type="submit"]').contains("Adicionar Jogo").click();
  },
);
