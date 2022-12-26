describe('Login Scenarios', () => {
  let LOGIN_URL= "https://practicetestautomation.com/practice-test-login/"
  let VALID_USERNAME = 'student'
  let VALID_PASSWORD = 'Password123'
  let USERNAME_LOCATOR = '#username'
  let PASSWORD_LOCATOR = '#password'
  let SUBMIT_LOCATOR = '#submit'
  let ERROR_LOCATOR = '#error'
  let LOGGED_PATH = 'logged-in-successfully/'

  it('login success', () => {
    cy.visit(LOGIN_URL)
    cy.get(USERNAME_LOCATOR).type(VALID_USERNAME)
    cy.get(PASSWORD_LOCATOR).type(VALID_PASSWORD)
    cy.get(SUBMIT_LOCATOR).click()
    cy.url().should('include', LOGGED_PATH)
    cy.get('h1').should('be.visible')
    cy.get('h1').contains('Logged In Successfully')
  })

  it('invalid password', () => {
      cy.visit(LOGIN_URL)
      cy.get(USERNAME_LOCATOR).type(VALID_USERNAME)
      cy.get(PASSWORD_LOCATOR).type('invalid')
      cy.get(SUBMIT_LOCATOR).click()
      cy.get(ERROR_LOCATOR).should('be.visible')
      cy.get(ERROR_LOCATOR).contains('Your password is invalid!')
    })


  it('invalid username', () => {
      cy.visit(LOGIN_URL)
      cy.get(USERNAME_LOCATOR).type('invalid')
      cy.get(PASSWORD_LOCATOR).type(VALID_PASSWORD)
      cy.get(SUBMIT_LOCATOR).click()
      cy.get(ERROR_LOCATOR).should('be.visible')
      cy.get(ERROR_LOCATOR).contains('Your username is invalid!')
    })
})