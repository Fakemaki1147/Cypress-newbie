describe('cart page', () => {
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

    it('The cart badge should displays the correct number of items currently in the cart', () => {
         cy.visit(Inventory_URL);
            cy.get(bAdd).then(($items) => {
                const expectedCount = $items.length;

                cy.wrap($items).each(($el) => {
                cy.wrap($el).click();
                });

                cy.get('.shopping_cart_badge')
                .invoke('text') //.invoke ดึงข้อความใน .shopping_cart มาตรวจ
                .then((text) => {
                    const count = parseInt(text.trim(), 10); //10 ตรงนี้คือตัวเลขฐาน
                    expect(count).to.equal(expectedCount);
                });
            });
    });
});