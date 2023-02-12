describe('Radio buttons', () => {
    beforeEach(() => cy.visit('/radios'));

    it('should check the first group of radio buttons', () => {
        // Referencing next because of the silliness 
        // that you see in Material UI and how they 
        // define the radio buttons
        cy.get('#first-group')
            .next()
            .within(() => {
                cy.get('input')
                    .first()
                    .click()
                    .should('be.checked');

                cy.get('input')
                    .last()
                    .should('not.be.checked');
            });
    });

    it('should check to verify the disabled radio button cannot be clicked unless the scenario is met', () => {
        // The scenario: If the initial state of the first
        // two radio groups has not changed, then the `Red`
        // radio button is disabled. If they change then the 
        // button is enabled
        cy.log('Verifying the initial state.');
        cy.get('#third-group')
            .next()
            .within(() => {
                cy.get('#Red').should('be.disabled');
                cy.get('#Blue').should('be.checked');
            });

        cy.get('#first-group')
            .next()
            .within(() => {
                cy.get('input')
                    .last()
                    .check();
            });

        cy.get('#second-group')
            .next()
            .within(() => {
                cy.get('input')
                    .last()
                    .check();
            });

        cy.get('#Red')
            .should('not.be.disabled')
            .click()
            .should('be.checked');
    });
});