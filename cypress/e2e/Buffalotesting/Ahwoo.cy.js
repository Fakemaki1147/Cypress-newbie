describe('Ahwoo', () => {
    const LOGIN_URL = 'https://bingo.terminal8.co.th/en/login';
    const INVENTORY_URL = 'https://bingo.terminal8.co.th/en/dashboards/crm';

    const USERNAME_INPUT = 'input[name="account"]';
    const PASSWORD_INPUT = 'input[name="password"]';
    const APP_LOGO = 'img[alt*="Logo"]';

    beforeEach(() => {
        cy.visit(LOGIN_URL);
    });

    it('test1', () => {

        cy.get(USERNAME_INPUT).type('T0045');
        cy.get(PASSWORD_INPUT).type('12345678tT');
        cy.contains('Login').click();
        cy.url().should('eq', INVENTORY_URL);

        cy.get(APP_LOGO).should('be.visible');

    });
});