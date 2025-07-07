import '../support/commands';

describe('Tests requiring login', () => {

  // เรียกใช้ Custom Command สำหรับ Login ก่อน Test แต่ละตัว
  beforeEach(() => {
      cy.BypassLogin(); // ใช้ standard_user / secret_sauce (ตามค่า default)
      // หรือ cy.BypassLogin('problem_user', 'secret_sauce'); ถ้าต้องการ user อื่น
  });

  it('should be on the inventory page after login', () => {
      // เนื่องจาก beforeEach ได้จัดการ Login และตรวจสอบ URL แล้ว
      // Test นี้ก็สามารถเริ่มทดสอบฟังก์ชันบนหน้า Inventory ได้เลย
      cy.get('.inventory_item').should('have.length', 6);
      cy.contains('Products').should('be.visible'); // ตรวจสอบหัวข้อ 'Products'
  });

  it('should be able to add a backpack to cart', () => {
      cy.get('#add-to-cart-sauce-labs-backpack').click();
      cy.get('.shopping_cart_badge').should('have.text', '1');
  });

  // Test cases อื่นๆ ที่ต้องการสถานะ Login แล้ว
});
