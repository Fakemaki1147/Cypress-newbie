describe('template spec', () => {
  const LOGIN_URL = 'https://www.saucedemo.com/v1/index.html';

  beforeEach(() => {
      cy.visit(LOGIN_URL); 
  });
  //ตรวจ title
  it('title', () => {
    cy.url().visit(LOGIN_URL)
    cy.title().should('eq', 'Swag Labs')
  })
  //ถ้า title ผิดจะ error
  // it('notitle', () => {
  //   cy.visit('https://www.saucedemo.com/v1/index.html')
  //   cy.title().should('eq', 'Swag Labs1')
  // })

})
//npx cypress run --browser chrome