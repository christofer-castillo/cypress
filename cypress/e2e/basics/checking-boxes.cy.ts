describe('Check & uncheck commands', () => {
    beforeEach(() => cy.visit('http://localhost:3000/checkboxes'));

    it('should check all checkboxes that are not checked in the first section', () => {
        cy.get('#first-section')
            .within(() => {
                cy.get('input')
                    .check()
                    .should('be.checked');
            });
    });

    it('should uncheck all checkboxes that are checked in the second section', () => {
        cy.get('#second-section')
            .within(() => {
                cy.get('input[type="checkbox"]')
                    .uncheck()
                    .should('not.be.checked');
            });
    });

    it('should test the indeterminate state', () => {
        cy.get('#indeterminate')
            .should('have.prop', 'indeterminate', true)
            .check()
            .should('have.prop', 'indeterminate', false);
    });

    it('should verify the disabled checkbox is uncheckable', () => {
        cy.get('#disabled-checkbox').should('have.prop', 'disabled', true);
         // can try to click but will fail the Actionability of Cypress
         // unless { force: true }
        cy.get('#disabled-checkbox')
            .click({ force: true })
            .should('be.checked')
            .should('be.disabled');
    });
});