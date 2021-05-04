context('Cypress Viewport Options', () => {

    beforeEach(() => cy.visit('https://developer.mozilla.org/en-US/'));

    describe('Dynamically testing the viewport', () => {

        const viewportSizes = [[1920, 1080], [1366, 1024], [844, 390], 'iphone-x']; // full hd, iPad Pro, iPhone 12 Pro

        viewportSizes.forEach(i => {
            it(`should visit the webpage with the viewport size: ${i}`, () => {

                if (Cypress._.isArray(i)){
                    cy.viewport(i[0], i[1]);
                } else {
                    // @ts-ignore
                    cy.viewport(i);
                };
    
                cy.get('[aria-label="MDN Web Docs"]').should('be.visible');
            });
        });
    });

    describe('Viewport presets', () => {

        it('should set the viewport size', () => {
            cy.viewport('iphone-x');

            cy.get('.main-menu-toggle').click();

            cy.get('#main-q').should('have.attr', 'placeholder', 'Search MDN');
        });

        it('should set the viewport size: ipad', () => {
            cy.viewport('ipad-2');

            cy.get('#main-q').type('responsive design{enter}');
        });

        it('should set the viewport size with a preset and orientation', () => {
            cy.viewport('ipad-mini', 'landscape'); // default will be portrait

            cy.get('#main-q').type('responsive design{enter}');
        });
    });

    describe('Test Configuration', {
        viewportHeight: 400,
        viewportWidth: 400
    }, () => {
        it('should search for responsive design', () => {
            cy.get('.main-menu-toggle').click();

            cy.get('#main-q').type('responsive design{enter}');
        });
    });

});