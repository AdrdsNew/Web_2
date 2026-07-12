import { useState, useEffect } from 'react'
import notify from './utils/notify'
import itemService from './services/items'
import loginService from './services/login'
import userService from './services/users'
import AuthForm from './components/AuthForm'
import ItemForm from './components/ItemForm'

const App = () => {
  const [items, setItems] = useState([])
  const [user, setUser] = useState(null)

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedItemAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setUser(user)
      itemService.setToken(user.token)
      itemService.getAll().then(initialItems => setItems(initialItems))
    }
  }, [])

  const handleLogin = async (credentials) => {
    try {
      const user = await loginService.login(credentials)
      window.localStorage.setItem('loggedItemAppUser', JSON.stringify(user)) 
      itemService.setToken(user.token)
      setUser(user)
      const initialItems = await itemService.getAll()
      setItems(initialItems)
      notify.toast(`Bem-vindo, ${user.name}!`)
    } catch { 
      notify.toast('Usuário ou senha inválidos', 'error') 
    }
  }

  const handleSignup = async (userObject) => {
    try {
      await userService.create(userObject)
      notify.toast('Conta criada! Agora você pode entrar.')
      return true
    } catch (e) { 
      notify.toast(e.response?.data?.error || 'Erro ao criar conta', 'error')
      return false
    }
  }

  const handleLogout = async () => {
    const isConfirmed = await notify.confirmLogout()
    if (isConfirmed) {
      window.localStorage.removeItem('loggedItemAppUser')
      itemService.setToken(null)
      setUser(null)
      setItems([])
      notify.toast('Sessão encerrada', 'info')
    }
  }

  const createItem = async (itemObject) => {
    try {
      const returnedItem = await itemService.create(itemObject)
      setItems(items.concat(returnedItem))
      notify.toast('Item adicionado com sucesso!')
    } catch { 
      notify.toast('Erro ao adicionar item', 'error')
    }
  }

  const toggleStatusOf = async (id) => {
    const item = items.find(i => i.id === id)
    const newStatus = await notify.promptStatus(item.status)
    
    if (newStatus) {
      const changedItem = { ...item, status: newStatus }
      try {
        const returnedItem = await itemService.update(id, changedItem)
        setItems(items.map(i => i.id !== id ? i : returnedItem))
        notify.toast('Status atualizado!')
      } catch { // 🛠️ CORRIGIDO: Removido o (e) não utilizado
        notify.toast('Erro ao atualizar status', 'error')
      }
    }
  }

  const deleteItemOf = async (id) => {
    const item = items.find(i => i.id === id)
    const isConfirmed = await notify.confirmDelete(item.name)
    
    if (isConfirmed) {
      try {
        await itemService.remove(id)
        setItems(items.filter(i => i.id !== id))
        notify.toast('Item removido com sucesso!')
      } catch (error) { 
        notify.toast(error.response?.data?.error || 'Não autorizado a apagar este item', 'error')
      }
    }
  }

  return (
  
    <div style={{ fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif', backgroundColor: '#f4f6f9', minHeight: '100vh' }}>
      {user === null ? (
        <AuthForm handleLogin={handleLogin} handleSignup={handleSignup} />
      ) : (
        <div>
          {/* Header */}
          <header style={{
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            backgroundColor: '#fff', maxWidth: '1000px', margin: '40px auto', padding: '15px 40px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)',boxSizing: 'border-box'
          }}>
            <h1 style={{ margin: 0, color: '#333', fontSize: '24px' }}>📦 Meu Inventário de Jogos</h1>
            <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
              <span style={{ color: '#666' }}>Olá, <strong style={{ color: '#333' }}>{user.name}</strong></span>
              <button 
                onClick={handleLogout} 
                style={{
                  padding: '8px 16px', backgroundColor: '#dc3545', color: 'white',
                  border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: '600'
                }}
              >
                Sair
              </button>
            </div>
          </header>

          {/* Main Content */}
          <main style={{ maxWidth: '1000px', margin: '40px auto', padding: '0 20px' }}>
            <section style={{ marginBottom: '40px' }}>
              <h2 style={{ color: '#444', marginBottom: '20px' }}>Adicionar Novo Item</h2>
              <ItemForm createItem={createItem} />
            </section>

            <section>
              <h2 style={{ color: '#444', marginBottom: '20px' }}>Meus Itens Guardados</h2>
              <ul style={{ listStyleType: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '15px' }}>
             {items.map(item => (
  <li key={item.id} style={{
    backgroundColor: 'white', padding: '20px', borderRadius: '8px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.04)', display: 'flex',
    justifyContent: 'space-between', alignItems: 'center',
   
    borderLeft: `5px solid ${
      item.status === 'Concluído com Platina' ? '#28a745' : 
      item.status === 'Concluído sem Platina' ? '#ffc107' : '#dc3545' 
    }`
  }}>
    <div>
      <h3 style={{ margin: '0 0 5px 0', color: '#333' }}>{item.name}</h3>
      <span style={{
        fontSize: '12px', backgroundColor: '#e9ecef', padding: '4px 8px',
        borderRadius: '4px', color: '#495057', fontWeight: 'bold'
      }}>{item.category}</span>
      
      
      <span style={{
        fontSize: '12px', marginLeft: '10px', padding: '4px 8px', borderRadius: '4px',
        fontWeight: 'bold',
        backgroundColor: 
          item.status === 'Concluído com Platina' ? '#d4edda' : 
          item.status === 'Concluído sem Platina' ? '#fff3cd' : '#f8d7da',
        color: 
          item.status === 'Concluído com Platina' ? '#155724' : 
          item.status === 'Concluído sem Platina' ? '#856404' : '#721c24'
      }}>{item.status || 'Não Informado'}</span>
      
      <p style={{ margin: '10px 0 0 0', color: '#666', fontSize: '14px' }}>{item.description}</p>
    </div>
    <div style={{ display: 'flex', gap: '10px' }}>
      <button 
        onClick={() => toggleStatusOf(item.id)}
        style={{ 
          padding: '8px 12px', backgroundColor: '#ffc107', border: 'none', 
          borderRadius: '6px', cursor: 'pointer', color: '#333', fontWeight: '600'
        }}
      >
        Editar Status
      </button>
      <button 
        onClick={() => deleteItemOf(item.id)}
        style={{ 
          padding: '8px 12px', backgroundColor: '#dc3545', border: 'none', 
          borderRadius: '6px', cursor: 'pointer', color: 'white', fontWeight: '600'
        }}
      >
        Apagar
      </button>
    </div>
  </li>
))}
                {items.length === 0 && (
                  <p style={{ textAlign: 'center', color: '#999', marginTop: '40px' }}>
                    Nenhum item encontrado. Comece adicionando um acima!
                  </p>
                )}
              </ul>
            </section>
          </main>
        </div>
      )}
    </div>
  )
}

export default App

