
      const LOGIN_URL = 'https://bingo.terminal8.co.th/en/login';
      const username = 'input[name="account"]';
      const password = 'input[name="password"]';
      const Blogin = 'button[type="submit"]';

      const interception = '';

  beforeEach(() => {
      cy.visit(LOGIN_URL); 
  });

describe('Login API Status Code Test', () => {
  it('should successfully log in and return a 200 status code', () => {
    cy.visit(LOGIN_URL);
    cy.intercept('GET', '**/v1/inventory').as('loginRequest'); 

    cy.get(username).type('T0045');
    cy.get(password).type('12345678tT');
    cy.get(Blogin).click();

    cy.wait('@loginRequest').then((interception) => {

      expect(interception.response.statusCode).to.equal(200);

    });
    
    cy.url().should('include', '/inventory');
  });
});

describe('Login API Failure Status Code Test', () => {
  it.only('should fail to log in and return a 401 status code', () => {
    const invalidUsername = 'T0045';
    const invalidPassword = '12345678tT';

    cy.intercept('POST', '**/en/login/').as('loginFailureRequest'); // ✅ ดัก request ก่อน

    cy.visit(LOGIN_URL);

    // ใส่ข้อมูล login ที่ไม่ถูกต้อง
    cy.get(username).type(invalidUsername);
    cy.get(password).type(invalidPassword);
    cy.get(Blogin).click();

    // ✅ รอให้ request ยิงออก แล้วตรวจ status code
    cy.wait('@loginFailureRequest').then((interception) => {
      expect(interception.response.statusCode).to.equal(401);
    });

    // ✅ ตรวจสอบว่ายังอยู่ที่หน้า login
    cy.url().should('include', '/login');

    // ✅ ตรวจสอบว่าแสดงข้อความผิดพลาด
    cy.contains(/invalid|incorrect|unauthorized|ไม่ถูกต้อง/i).should('be.visible');
  });
});

describe('', () => {
    
});



