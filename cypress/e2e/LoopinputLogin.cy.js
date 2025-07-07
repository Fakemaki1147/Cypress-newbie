
import { loginTestCases } from './Data_test/LoginData'; 

describe('Aotga Login Test with Data from File', () => {
    const LOGIN_URL = 'https://bingo.terminal8.co.th/en/login';
    const CRM_DASHBOARD_URL = 'https://bingo.terminal8.co.th/en/dashboards/crm';
    const APP_LOGO = 'img[alt*="Logo"]'; 
    const Blogin = 'button[type="submit"]';

    const USERNAME_INPUT = 'input[name="account"]';
    const PASSWORD_INPUT = 'input[name="password"]';

    loginTestCases.forEach((testCase) => {
        it(`${testCase.name} - User: ${testCase.username}`, () => {
            cy.visit(LOGIN_URL);

            // ใช้ .as() เพื่อตั้งชื่อ alias ให้กับ Cypress chain ในกรณีที่ต้องดีบัก
            cy.get(USERNAME_INPUT).as('usernameInput');
            cy.get(PASSWORD_INPUT).as('passwordInput');

            // กรอก Username และ Password
            if (testCase.username !== '') {
                cy.get('@usernameInput').type(testCase.username);
            } else {
                cy.get('@usernameInput').clear(); //เช็คว่ากรอก " " ก็ไม่มีปัญหา
            }

            // กรอก Password
            if (testCase.password !== '') {
                cy.get('@passwordInput').type(testCase.password);
            } else {
                cy.get('@passwordInput').clear(); //เมื่อ LoginData ส่งค่า '' ก็ถือว่าให้ run ต่อ
            }

            cy.get(Blogin).eq(0).click();

            if (testCase.shouldLoginPass) {
                // คาดหวังว่า Login สำเร็จ
                cy.url().should('include', testCase.expectedUrlPart); // ใช้ 'include' เพื่อความยืดหยุ่น
                cy.get(APP_LOGO).should('be.visible');
            } else {
                // คาดหวังว่า Login ไม่สำเร็จ
                cy.url().should('eq', LOGIN_URL); // คาดว่ายังอยู่ที่หน้า Login
                if (testCase.expectedMessage) {
                    // ตรวจสอบข้อความ Error
                    // คุณอาจต้องหา Selector ที่แน่นอนสำหรับข้อความ Error บนหน้า
                    // เช่น: cy.get('.error-message').should('contain', testCase.expectedMessage);
                    cy.contains(testCase.expectedMessage).should('be.visible');
                }

            }
        });
    });
});