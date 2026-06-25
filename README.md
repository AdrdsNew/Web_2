# Projeto Full-Stack (React + Node.js)

Este é um projeto full-stack completo, estruturado em um único repositório dividido entre uma aplicação de cliente (frontend) e uma API RESTful (backend).

## 📁 Estrutura do Repositório

O repositório é organizado de forma modular para isolar os ambientes de desenvolvimento:

- **`/frontend`**: Aplicação Single Page Application (SPA) desenvolvida com **React 19** e **Vite 8**.
- **`/backend`**: API RESTful desenvolvida em **Node.js** com **Express 5** e banco de dados **MongoDB**.

---

## 🛠️ Tecnologias e Dependências Reais

### Frontend (`/frontend`)

- **Core:** React 19.2.5, React DOM 19.2.5, Vite 8.0.10
- **Comunicação:** Axios 1.15.2
- **UI/Popups:** SweetAlert2 11.26.24
- **Qualidade e Testes:** Cypress 15.14.2, ESLint 10.2.1 (com plugins `eslint-plugin-cypress` e `eslint-plugin-react`)

### Backend (`/backend`)

- **Core:** Express 5.2.1
- **Banco de Dados:** Mongoose 9.5.0, `mongoose-unique-validator` 4.0.0
- **Segurança:** `jsonwebtoken` 9.0.3, `bcrypt` 6.0.0
- **Qualidade e Testes:** Jest 30.3.0, Supertest 7.2.2, `cross-env` 10.1.0, `nodemon` 3.1.14

## ⚙️ Configuração do Ambiente

### 1. Variáveis de Ambiente no Backend

Crie um arquivo `.env` dentro do diretório `/backend` seguindo este modelo exato:

```env
PORT=3001
SECRET=sua_chave_secreta_jwt_aqui
MONGODB_URI=sua_url_do_banco_original_desenvolvimento
TEST_MONGODB_URI=sua_url_do_banco_exclusivo_para_testes
```
