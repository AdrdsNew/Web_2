const middleware = require('../../utils/middleware')

describe('Middleware ErrorHandler', () => {
  const mockRes = () => {
    const res = {}
    res.status = jest.fn().mockReturnValue(res)
    res.json = jest.fn().mockReturnValue(res)
    return res
  }

  test('retorna 401 para token inválido', () => {
    const res = mockRes()
    const error = { name: 'JsonWebTokenError', message: 'invalid signature' }
    
    middleware.errorHandler(error, {}, res, () => {})
    
    expect(res.status).toHaveBeenCalledWith(401)
    expect(res.json).toHaveBeenCalledWith({ error: 'invalid token' })
  })
})