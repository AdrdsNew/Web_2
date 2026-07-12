const ItemForm = ({ createItem }) => {
  const styles = {
    form: {
      display: 'flex', flexDirection: 'column', gap: '15px',
      backgroundColor: 'white', padding: '20px', borderRadius: '8px',
      border: '1px solid #eee', marginBottom: '20px'
    },
    input: {
      padding: '12px', border: '1px solid #ddd',
      borderRadius: '6px', fontSize: '14px', width: '100%', boxSizing: 'border-box'
    },
    button: {
      padding: '12px 20px', backgroundColor: '#28a745', color: 'white',
      border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold',
      alignSelf: 'flex-start'
    }
  }

  const addItem = (event) => {
    event.preventDefault()
    const target = event.target
    createItem({
      name: target.name.value,
      category: target.category.value,
      description: target.description.value,
      status: target.status.value 
    })
    target.reset()
  }

  return (
    <form onSubmit={addItem} style={styles.form}>
      <div style={{display: 'flex', gap: '15px'}}>
        <input name="name" style={styles.input} placeholder="Nome" required />
        <input name="category" style={styles.input} placeholder="Plataforma Jogada" required />
      </div>
      <div style={{display: 'flex', gap: '15px'}}>
  
        <select name="status" style={styles.input} required>
          <option value="Concluído com Platina">🏆 Concluído com Platina</option>
          <option value="Concluído sem Platina">🎮 Concluído sem Platina</option>
          <option value="Abandonado">❌ Abandonado</option>
        </select>
        <input name="description" style={styles.input} placeholder="Avaliação Final" />
      </div>
      <button type="submit" style={styles.button}>+ Adicionar Jogo</button>
    </form>
  )
}

export default ItemForm
