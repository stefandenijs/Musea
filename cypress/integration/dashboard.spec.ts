describe('Dashboard test', () => {
  it('Visits the dashboard page', () => {
    cy.visit('/');
    cy.contains('Musea');
    cy.contains('Login');
    cy.get('.navbar-nav').should('have.length', 2);
    // cy.get('.navbar-nav').should('not.contain', 'Gebruikers');
    cy.contains('This app is running');
  });
});
