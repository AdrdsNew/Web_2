import { useState } from "react";

const AuthForm = ({ handleLogin, handleSignup }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const onSubmit = async (event) => {
    event.preventDefault();
    if (isLogin) {
      handleLogin({ username, password });
    } else {
      const success = await handleSignup({ username, password, name });
      if (success) {
        setIsLogin(true);
      }
    }
  };
  const styles = {
    container: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
      backgroundColor: "#f0f2f5",
    },
    form: {
      backgroundColor: "white",
      padding: "40px",
      borderRadius: "12px",
      boxShadow: "0 8px 24px rgba(0,0,0,0.1)",
      width: "100%",
      maxWidth: "350px",
      textAlign: "center",
    },
    input: {
      width: "100%",
      padding: "12px",
      margin: "8px 0",
      border: "1px solid #ddd",
      borderRadius: "6px",
      fontSize: "16px",
      boxSizing: "border-box",
    },
    button: {
      width: "100%",
      padding: "12px",
      backgroundColor: isLogin ? "#007bff" : "#28a745",
      color: "white",
      border: "none",
      borderRadius: "6px",
      fontSize: "16px",
      fontWeight: "bold",
      cursor: "pointer",
      marginTop: "15px",
    },
    toggleText: {
      marginTop: "20px",
      color: "#666",
      fontSize: "14px",
      cursor: "pointer",
      textDecoration: "underline",
    },
  };

  return (
    <div style={styles.container}>
      <form onSubmit={onSubmit} style={styles.form}>
        <h2 style={{ color: "#333", marginBottom: "20px" }}>
          {isLogin ? "📦 Entrar" : "📝 Criar Conta"}
        </h2>

        {!isLogin && (
          <input
            style={styles.input}
            value={name}
            onChange={({ target }) => setName(target.value)}
            placeholder="Seu Nome Completo"
            required
          />
        )}

        <input
          style={styles.input}
          value={username}
          onChange={({ target }) => setUsername(target.value)}
          placeholder="Usuário"
          required
        />
        <input
          style={styles.input}
          type="password"
          value={password}
          onChange={({ target }) => setPassword(target.value)}
          placeholder="Senha"
          required
        />

        <button type="submit" style={styles.button}>
          {isLogin ? "Login" : "Cadastrar"}
        </button>

        <p style={styles.toggleText} onClick={() => setIsLogin(!isLogin)}>
          {isLogin ? "Não tem conta? Cadastre-se" : "Já tem conta? Faça login"}
        </p>
      </form>
    </div>
  );
};

export default AuthForm;
