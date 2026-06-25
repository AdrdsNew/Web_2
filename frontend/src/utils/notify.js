import Swal from "sweetalert2";

// Alerta de sucesso ou erro rápido (toast)
const toast = (title, icon = "success") => {
  Swal.fire({
    title,
    icon,
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
  });
};

const confirmLogout = async () => {
  const result = await Swal.fire({
    title: "Sair da conta?",
    text: "Você precisará fazer login novamente para acessar seus itens.",
    icon: "question",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#aaa",
    confirmButtonText: "Sim, sair!",
    cancelButtonText: "Continuar logado",
  });
  return result.isConfirmed;
};

// Confirmação para deletar
const confirmDelete = async (itemName) => {
  const result = await Swal.fire({
    title: "Tem certeza?",
    text: `Você vai excluir "${itemName}" permanentemente!`,
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#dc3545",
    cancelButtonColor: "#6c757d",
    confirmButtonText: "Sim, apagar!",
    cancelButtonText: "Cancelar",
  });
  return result.isConfirmed;
};

// Caixa de entrada para atualizar status
// ... restante do arquivo notify.js igual acima

// Caixa de entrada para atualizar status do jogo
const promptStatus = async (currentStatus) => {
  const { value: newStatus } = await Swal.fire({
    title: "Atualizar Status do Jogo",
    input: "select",
    // 🛠️ CORRIGIDO: Novas opções de status para os Jogos
    inputOptions: {
      "Concluído com Platina": "🏆 Concluído com Platina",
      "Concluído sem Platina": "🎮 Concluído sem Platina",
      Abandonado: "❌ Abandonado",
    },
    inputValue: currentStatus,
    inputPlaceholder: "Selecione o novo status",
    showCancelButton: true,
    confirmButtonColor: "#007bff",
    cancelButtonColor: "#6c757d",
    confirmButtonText: "Atualizar",
    cancelButtonText: "Cancelar",
  });
  return newStatus;
};

export default {
  toast,
  confirmLogout,
  confirmDelete,
  promptStatus,
};
