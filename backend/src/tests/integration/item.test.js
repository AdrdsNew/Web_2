const request = require('supertest')
const Item = require('../../models/item')
const User = require('../../models/user')
const jwt = require('jsonwebtoken')
const app = require('../../app')

describe('Items API', () => {
  let token
  let userId

  beforeEach(async () => {
    await Item.deleteMany({})
    await User.deleteMany({})

    const user = new User({ username: 'tester', passwordHash: 'hash' })
    const savedUser = await user.save()
    userId = savedUser._id

    const userForToken = { username: savedUser.username, id: savedUser._id }
    token = jwt.sign(userForToken, process.env.SECRET || 'secret')
  })

  test('cria um item com nome válido e token', async () => {
    const newItem = { 
      name: 'Gameboy Color', 
      category: 'Console', 
      status: 'Coleção' 
    }
    
    const res = await request(app)
      .post('/api/items')
      .set('Authorization', `Bearer ${token}`)
      .send(newItem)
      .expect(201)

    expect(res.body.name).toBe('Gameboy Color')
    
    expect(res.body.user.id.toString()).toBe(userId.toString())
  })

  test('falha ao criar item com nome menor que 3 caracteres', async () => {
    const shortItem = { name: 'G', category: 'Console' }
    
    await request(app)
      .post('/api/items')
      .set('Authorization', `Bearer ${token}`)
      .send(shortItem)
      .expect(400)
  })
})