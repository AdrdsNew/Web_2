describe("Autenticação e Cadastro (Itens)", () => {
  beforeEach(() => {
    cy.resetDb();

    cy.createUser({
      username: "tester_jogos",
      name: "Alan Silva",
      password: "password123",
    });

    cy.visit("http://localhost:5173");
  });

  it("Exibe o formulário de login por padrão com os textos corretos", () => {
    cy.contains("📦 Entrar").should("be.visible");
    cy.get('input[placeholder="Usuário"]').should("be.visible");
    cy.get('input[placeholder="Senha"]').should("be.visible");
  });

  it("Permite alternar para cadastro, criar uma conta e pular de volta para o login", () => {
    cy.contains("Não tem conta? Cadastre-se").click();
    cy.contains("📝 Criar Conta").should("be.visible");

    cy.get('input[placeholder="Seu Nome Completo"]').type("Novo Jogador");
    cy.get('input[placeholder="Usuário"]').type("novo_user");
    cy.get('input[placeholder="Senha"]').type("senha123");

    cy.get('button[type="submit"]').contains("Cadastrar").click();

    cy.contains("📦 Entrar").should("be.visible");
  });

  it("Sucesso ao efetuar login com credenciais válidas", () => {
    cy.loginWithUi({ username: "tester_jogos", password: "password123" });

    cy.contains("📦 Meu Inventário de Jogos").should("be.visible");
    cy.contains("Olá, Alan Silva").should("be.visible");
  });

  it("Falha ao tentar logar com credenciais inválidas", () => {
    cy.loginWithUi({ username: "tester_jogos", password: "senha_errada" });

    cy.contains("📦 Entrar").should("be.visible");
    cy.contains("📦 Meu Inventário de Jogos").should("not.exist");
  });

  it("O usuário consegue encerrar a sessão (Logout)", () => {
    cy.loginWithUi({ username: "tester_jogos", password: "password123" });

    cy.get("button").contains("Sair").click();

    cy.contains("Sim, sair!", { timeout: 10000 }).should("be.visible").click();

    cy.contains("📦 Entrar").should("be.visible");
    cy.window().then((win) => {
      expect(win.localStorage.getItem("loggedItemAppUser")).to.be.null;
    });
  });
});
