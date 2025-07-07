// user : T0045
// pass :12345678tT

describe('Aotga Login Test', () => {
    // กำหนด URL ของหน้า Login และหน้า Inventory
    const LOGIN_URL = 'https://bingo.terminal8.co.th/en/login';
    const INVENTORY_URL = 'https://bingo.terminal8.co.th/en/dashboards/crm';

    // กำหนด Selector สำหรับ Element ต่างๆ
    const USERNAME_INPUT = 'input[name="account"]';
    const PASSWORD_INPUT = 'input[name="password"]';
    // const LOGIN_BUTTON = '.MuiTouchRipple-root mui-4mb1j7';
    const APP_LOGO = 'img[alt*="Logo"]';

    // ใช้ beforeEach เพื่อให้ Cypress เข้าไปที่หน้า Login ก่อนแต่ละ Test Case
    beforeEach(() => {
        cy.visit(LOGIN_URL);
    });

    it('test1', () => {
        // 1. กรอก Username
        cy.get(USERNAME_INPUT).type('T0045');

        // 2. กรอก Password
        cy.get(PASSWORD_INPUT).type('12345678tT');

        // 3. คลิกปุ่ม Login ดีที่ cypress อ่าน ui ได้เลยง่าย ถ้าเป็น playwright จะอ่านเป็น Element ยากกว่านี้เยอะ
        cy.contains('Login').click();

        // 4. ตรวจสอบว่า URL เปลี่ยนไปที่หน้า Inventory (ยืนยันการเข้าสู่ระบบสำเร็จ)
        cy.url().should('eq', INVENTORY_URL);

        // 5. (เพิ่มเติม) ตรวจสอบว่ามี Element เฉพาะบนหน้า Inventory ปรากฏขึ้น
        //    เพื่อยืนยันอีกครั้งว่าการเข้าสู่ระบบสำเร็จและหน้าเว็บโหลดถูกต้อง
        cy.get(APP_LOGO).should('be.visible');

    });

    it('test2', () => {

        cy.get(USERNAME_INPUT).type('invalid_user');

        cy.get(PASSWORD_INPUT).type('wrong_password');

        // cy.get(Login).click(); //คำสั่ง .get จะเลือกไปที่ element แต่ .contain จะเลือกไปที่ ปุ่มที่ตั้ง text จากชื่อไว้จึงง่าย
        cy.contains('Login').click();

        // 4. ตรวจสอบว่า URL ยังคงอยู่ที่หน้า Login (แสดงว่าเข้าสู่ระบบไม่สำเร็จ)
        cy.url().should('eq', LOGIN_URL);

        // 5. ตรวจสอบว่ามีข้อความ Error ปรากฏขึ้นและมีเนื้อหาตามที่คาดหวัง
        cy.get('.flex.is-full.min-bs-full.flex-auto.flex-col').should('be.visible');

        cy.log('Login failed as expected: Error message displayed.');
    });

    it('test3', () => {
        // 1. ทิ้งช่อง Username ว่างไว้
        // cy.get(USERNAME_INPUT).type(''); // ไม่ต้องพิมพ์อะไรลงไปก็ได้

        // 2. กรอก Password
        cy.get(PASSWORD_INPUT).type('secret_sauce');

        cy.contains('Login').click();

        cy.url().should('eq', LOGIN_URL);

        // 5. ตรวจสอบข้อความ Error
        cy.get('.flex.is-full.min-bs-full.flex-auto.flex-col').should('be.visible')
                                       .and('contain.text', '_required');

        cy.log('Login failed as expected: Username is required message displayed.');
    });

    it('test4', () => {

        cy.get(USERNAME_INPUT).type('standard_user');

        // 2. ทิ้งช่อง Password ว่างไว้
        // cy.get(PASSWORD_INPUT).type(''); // ไม่ต้องพิมพ์อะไรลงไปก็ได้

        cy.contains('Login').click();

        cy.url().should('eq', LOGIN_URL);

        cy.get('.flex.is-full.min-bs-full.flex-auto.flex-col').should('be.visible')
                                       .and('contain.text', '_required');

        cy.log('Login failed as expected: Password is required message displayed.');
    });
});