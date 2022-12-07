describe('Meat Suit Scrambler browser tests', () => {
  it('visits the page', () => {
    cy.visit('https://quargsgreene.github.io/meat-suit-scrambler/dist/index.html');
  });

  it('displays the canvas', () => {
    cy.get('#play').click();
  });
});
