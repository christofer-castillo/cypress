describe('Command Logging', () => {

    it('should display cy.log() information', () => {
        cy.log('Origin', window.origin);

        cy.visit('https://example.cypress.io/commands/actions');

        cy.log('Cypress information', window);
    });

    it('should display Cypress.log() information', () => {
        cy.visit('https://example.cypress.io/commands/local-storage');
        cy.contains('Populate Local Storage').click();
        cy.seedLocalStorage('Las Vegas', 'Raiders').then(() => {
            cy.log(`LocalStorage: ${localStorage.getItem('Las Vegas')}`);
        });
        
        cy.log(`LocalStorage: ${localStorage.getItem('Las Vegas')}`);

        cy.log(`${Math.floor(Math.random() * 10)}`);
    });
});