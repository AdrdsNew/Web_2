const request = require('supertest')
const User = require('../../models/user')
const app = require('../../app')

describe('Users API', () => {
  beforeEach(async () => { 
    await User.deleteMany({}) 
  })

  test('deve criar um novo usuário com sucesso (201)', async () => {
    const newUser = { 
      username: 'usuario_novo', 
      name: 'Joao Silva', 
      password: 'senha123' 
    }
    const response = await request(app)
      .post('/api/users')
      .send(newUser)
      .expect(201)

    expect(response.body.username).toBe('usuario_novo')
    expect(response.body.passwordHash).toBeUndefined()
  })

  test('rejeita senha com menos de 3 caracteres', async () => {
    const newUser = { username: 'root', password: '12' }
    
    const response = await request(app)
      .post('/api/users')
      .send(newUser)
      .expect(400)
    
    expect(response.body.error).toContain('password must be at least 3 characters long')
  })
})