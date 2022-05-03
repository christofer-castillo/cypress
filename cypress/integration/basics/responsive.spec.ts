import ViewportPreset = Cypress.ViewportPreset;

context('Cypress Viewport Options', () => {

    beforeEach(() => cy.visit('https://developer.mozilla.org/en-US/'));

    describe('Dynamically testing the viewport', () => {

        const viewportSizes: (number[] | ViewportPreset)[] = [[1920, 1080], [1366, 1024], [844, 390], 'iphone-x']; // full hd, iPad Pro, iPhone 12 Pro

        viewportSizes.forEach(i => {
            it(`should visit the webpage with the viewport size: ${i}`, () => {

                if (Cypress._.isArray(i)){
                    cy.viewport(i[0], i[1]);
                } else {
                    cy.viewport(i);
                }
    
                cy.get('[aria-label="MDN homepage"]').should('be.visible');
            });
        });
    });

    describe('Viewport presets', () => {

        it('should set the viewport size', () => {
            cy.viewport('iphone-x');

            cy.get('#hp-search-q').should('have.attr', 'required');
        });

        it('should set the viewport size: ipad', () => {
            cy.viewport('ipad-2');

            cy.contains('Documenting web technologies, including CSS, HTML, and JavaScript, since 2005.').should('be.visible');
        });

        it('should set the viewport size with a preset and orientation', () => {
            cy.viewport('ipad-mini', 'landscape'); // default will be portrait

            cy.contains('Documenting web technologies, including CSS, HTML, and JavaScript, since 2005.').should('be.visible');
        });
    });

    describe('Test Configuration', {
        viewportHeight: 400,
        viewportWidth: 400
    }, () => {
        it('should search for responsive design', () => {
            cy.get('button[title="Open main menu"]').click();

            cy.contains('Get MDN Plus').should('be.visible');
        });
    });

});