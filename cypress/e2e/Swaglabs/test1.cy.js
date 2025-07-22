describe('Product Page', () => {
    const Inventory_URL = 'https://www.saucedemo.com/v1/inventory.html';
    const LOGIN_URL = 'https://www.saucedemo.com/v1/index.html';
    const bAdd = 'button[class="btn_primary btn_inventory"]';
    const bRemove = 'button[class="btn_secondary btn_inventory"]';
    const bBussketRemove = 'button[class="btn_secondary cart_button"]';
    
    const iconbusket = 'path[fill="currentColor"]';
    const drop_1 = 'select[class="product_sort_container"]';

    beforeEach(() => {
        cy.visit(LOGIN_URL);
        cy.visit(Inventory_URL);

    });

    it('Add, Remove item', () => {
        cy.visit(Inventory_URL);

        cy.get(bAdd).each(($el) => {
        cy.wrap($el).click();
        });

        cy.get(iconbusket).click();
        cy.get(bBussketRemove).each(($el) => {
        cy.wrap($el).click();
        });
    });

    it('Product should correctly sorts items from A to Z', () => {
        cy.visit(Inventory_URL);
        cy.get(drop_1).select('az'); //ตัวที่เป็น select ให้ใช้แบบนี้

          // ตรวจสอบว่า items ถูกเรียงจาก A ถึง Z
        cy.get('.inventory_item_name') // สมมุติว่า class ของชื่อ item คือแบบนี้
            .then($items => {
            const itemTexts = [...$items].map(el => el.innerText.toLowerCase().trim());
            const sortedTexts = [...itemTexts].sort(); // sort ตาม a-z
            expect(itemTexts).to.deep.equal(sortedTexts); // ตรวจสอบว่าเรียงถูกต้อง
            });
        
    });

    it('Product should correctly sorts items from Z to A', () => {
        cy.visit(Inventory_URL);
        cy.get(drop_1).select('za'); //ตัวที่เป็น select ให้ใช้แบบนี้

          // ตรวจสอบว่า items ถูกเรียงจาก A ถึง Z
        cy.get('.inventory_item_name')
            .then($items => {
            const itemTexts = [...$items].map(el => el.innerText.toLowerCase().trim());
            const sortedTexts = [...itemTexts].sort().reverse(); // sort แล้ว reverse เพื่อได้ Z → A
            expect(itemTexts).to.deep.equal(sortedTexts);
            });
        
    });

    it('Product should correctly sort prices from Low to High', () => {
    cy.visit(Inventory_URL);

    // เลือก dropdown เป็นเรียงราคาต่ำไปสูง
    cy.get(drop_1).select('lohi');

    // ตรวจสอบราคาสินค้าเรียงถูกต้อง
    cy.get('.inventory_item_price') // ตรวจสอบ class ที่แสดงราคาว่าถูกต้องหรือไม่
        .then($prices => {
        const priceNumbers = [...$prices].map(el => 
            parseFloat(el.innerText.replace('$', '').trim()) // แปลงจาก "$29.99" เป็น 29.99
        );
        const sortedPrices = [...priceNumbers].sort((a, b) => a - b); // เรียงจากน้อยไปมาก
        expect(priceNumbers).to.deep.equal(sortedPrices);
        });
    });

    it('Product should correctly sort prices from High to Low', () => {
    cy.visit(Inventory_URL);

    cy.get(drop_1).select('hilo');

    // ตรวจสอบราคาสินค้าเรียงถูกต้อง
    cy.get('.inventory_item_price')
        .then($prices => {
        const priceNumbers = [...$prices].map(el => 
            parseFloat(el.innerText.replace('$', '').trim()) // แปลงจาก "$29.99" เป็น 29.99
        );
        const sortedPrices = [...priceNumbers].sort((a, b) => a + b); // เรียงจากน้อยไปมาก
        expect(priceNumbers).to.deep.equal(sortedPrices);
        });
    });

    it('Should navigate to the cart page when clicking the cart icon', () => {
        cy.visit(Inventory_URL);
        cy.get(iconbusket).click();
        cy.url().should('include', 'https://www.saucedemo.com/v1/cart.html');
    });

});                     
