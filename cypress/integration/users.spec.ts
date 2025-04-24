describe('Users test', () => {
  const localStorageUserToken = {
    token:
      'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1NzUwMjIzNjQsImlhdCI6MTU3NDE1ODM2NCwic3ViIjp7ImVtYWlsIjoiYWRtaW5AYXZhbnMubmwiLCJpZCI6IjVkYzlhY2Y3NmUzOTVhMTY1ODkwMjk2MiJ9fQ.qRPy-lTPIopAJPrarJYZkxK0suUJF_XZ9szeTtie4nc'
  }

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

  it('Visits the users page', () => {
    cy.visit('/users')
    cy.get('h2').should('have.text', 'Gebruikers')
    cy.get('table > tbody').should('have.length', 4)
  })

  it('Visit singular user page', () => {
    cy.visit('/login')
    cy.get('input#email').type('adress@server.com')
    cy.get('input#password').type('somepassword')
    cy.get('button#submitbutton')
      .click()
      .should(() => {
        //
        expect(localStorage.getItem('currentuser')).to.eq(JSON.stringify(localStorageUserToken))
      })

    cy.visit('/users/61st6dd80bef6a39n07d8dd8')
    cy.contains('Account informatie')
    cy.contains('Details')
    cy.contains('Naam')
    cy.contains('Stefan de Nijs')
    cy.contains('Email')
    cy.contains('Stefan@deNijs.nl')
    cy.contains('Geslacht')
    cy.contains('Man')
    cy.contains('Geboortedatum')
  })

  it('Visit another user page', () => {
    cy.visit('/login')
    cy.get('input#email').type('adress@server.com')
    cy.get('input#password').type('somepassword')
    cy.get('button#submitbutton')
      .click()
      .should(() => {
        //
        expect(localStorage.getItem('currentuser')).to.eq(JSON.stringify(localStorageUserToken))
      })

    cy.get('a#users').click()
    cy.get('table > tbody > td > a').eq(1).should('have.text', 'Dion Koeze').click()
    cy.contains('Account informatie')
    cy.contains('Details')
    cy.contains('Naam')
    cy.contains('Dion Koeze')
    cy.contains('Email')
    cy.contains('Dion@Koeze.nl')
    cy.contains('Geslacht')
    cy.contains('Man')
    cy.contains('Geboortedatum')
  })

  it('Delete another user', () => {
    cy.visit('/login')
    cy.get('input#email').type('adress@server.com')
    cy.get('input#password').type('somepassword')
    cy.get('button#submitbutton')
      .click()
      .should(() => {
        //
        expect(localStorage.getItem('currentuser')).to.eq(JSON.stringify(localStorageUserToken))
      })

    cy.get('a#users').click()
    cy.get('table > tbody > td > a').eq(3).click()
    cy.get('button#deletebutton').click()
  })

  it('Update another user', () => {
    cy.visit('/login')
    cy.get('input#email').type('adress@server.com')
    cy.get('input#password').type('somepassword')
    cy.get('button#submitbutton')
      .click()
      .should(() => {
        //
        expect(localStorage.getItem('currentuser')).to.eq(JSON.stringify(localStorageUserToken))
      })

    cy.get('a#users').click()
    cy.get('table > tbody > td > a').eq(1).click()
    cy.get('#changebutton').click()
    cy.get('input#firstName').clear()
    cy.get('input#firstName').type(' Robin')
    cy.get('input#lastName').clear()
    cy.get('input#lastName').type('Schellius')
    cy.get('input#email').clear()
    cy.get('input#email').type('Robin@Schellius.nl')
    cy.get('select#gender').select('Man')
    cy.get('input#birthDate').clear()
    cy.get('input#birthDate').type('1960-03-12')

    cy.get('#updatebutton').click()
    cy.get('table > tbody > td > a').eq(1).click()

    cy.contains('Details')
    cy.contains('Naam')
    cy.contains('Robin Schellius')
    cy.contains('Email')
    cy.contains('Robin@Schellius.nl')
    cy.contains('Geslacht')
    cy.contains('Man')
    cy.contains('Geboortedatum')
    cy.contains('12-03-1960')
  })
})
