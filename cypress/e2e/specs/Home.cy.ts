describe('Test render home page', () => {
  it('Render HeaderApp with title', () => {
    cy.visit('/')
    cy.contains('h1', 'Wallet Digitalz')
  })
})
