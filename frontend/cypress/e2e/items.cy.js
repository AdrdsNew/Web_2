describe("Gerenciamento do Inventário de Jogos", () => {
  beforeEach(() => {
    cy.resetDb();

    cy.createUser({
      username: "tester_jogos",
      name: "Alan Silva",
      password: "password123",
    });

    cy.loginViaApi({ username: "tester_jogos", password: "password123" });
  });

  it("Permite adicionar um jogo à lista com sucesso", () => {
    cy.createItemWithUi({
      name: "Chrono Trigger",
      category: "Super Nintendo",
      status: "Concluído com Platina",
      description: "Melhor RPG de todos os tempos.",
    });

    cy.contains("Chrono Trigger").should("be.visible");
    cy.contains("Super Nintendo").should("be.visible");
    cy.contains("Concluído com Platina").should("be.visible");
    cy.contains("Melhor RPG de todos os tempos.").should("be.visible");
  });

  it("Permite alterar o status de conclusão de um jogo (Update Status)", () => {
    cy.createItemWithUi({
      name: "Elden Ring",
      category: "PlayStation 5",
      status: "Abandonado",
      description: "Muito difícil!",
    });

    cy.get("ul").contains("Abandonado").should("be.visible");

    cy.contains("Editar Status").click();

    cy.get(".swal2-select", { timeout: 10000 })
      .should("be.visible")
      .select("Concluído com Platina");

    cy.contains("button.swal2-confirm", "Atualizar", { timeout: 10000 })
      .should("be.visible")
      .click();

    cy.get("ul").contains("Concluído com Platina").should("be.visible");

    cy.get("ul").contains("Abandonado").should("not.exist");
  });
  it("Permite remover um jogo permanentemente da lista", () => {
    cy.createItemWithUi({
      name: "Jogo Ruim 2026",
      category: "PC",
      status: "Abandonado",
    });

    cy.contains("Jogo Ruim 2026").should("be.visible");

    cy.contains("Apagar").click();

    cy.contains("button.swal2-confirm", "Sim, apagar!", { timeout: 10000 })
      .should("be.visible")
      .click();

    cy.contains("Jogo Ruim 2026").should("not.exist");
  });
});
