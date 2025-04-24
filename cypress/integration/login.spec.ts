describe('Login test', () => {
  const localStorageUserToken = {
    token:
      'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1NzUwMjIzNjQsImlhdCI6MTU3NDE1ODM2NCwic3ViIjp7ImVtYWlsIjoiYWRtaW5AYXZhbnMubmwiLCJpZCI6IjVkYzlhY2Y3NmUzOTVhMTY1ODkwMjk2MiJ9fQ.qRPy-lTPIopAJPrarJYZkxK0suUJF_XZ9szeTtie4nc'
  }

  it('Visits the login page', () => {
    cy.visit('/login')
    cy.contains('Login')
    cy.contains('Email')
    cy.contains('Wachtwoord')
    cy.contains('Inloggen')
    cy.get('small').should('have.text', 'Nog geen account? Registreer hier.')
    cy.get('button#submitbutton').should('have.text', ' Inloggen ')
  })

  it('Error on wrong email', () => {
    cy.visit('/login')
    cy.get('input#email').type('wrong email dot com')
    cy.get('input#password').click()
    cy.get('#invalid-email').should('have.text', ' Voer in een geldig email. ')
  })

  it('Token should be returned on login', () => {
    cy.visit('/login')
    cy.get('input#email').type('adress@server.com')
    cy.get('input#password').type('somepassword')
    cy.get('button#submitbutton')
      .click()
      .should(() => {
        //
        expect(localStorage.getItem('currentuser')).to.eq(JSON.stringify(localStorageUserToken))
      })
    cy.location('pathname').should('eq', '/dashboard')
    // cy.get('button#userFullName').should('have.text', ' Firstname Lastname ');
    cy.get('.navbar-nav').should('contain', 'Gebruikers')
  })
})
