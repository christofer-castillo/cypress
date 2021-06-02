describe('Everything type in Cypress', () => {

    beforeEach(() => cy.visit('http://localhost:8080/'));

    it('should type in a standard text input', () => {
        const text = 'random string of characters';
        cy.get('#normal-text').type(text);
        cy.get('#normal-text').should('have.value', text);
    });

    it('should type in a textarea', () => {
        const text = 'spaghetti & meatballs';
        cy.get('#textarea').type(text);
    });

    it('should type in a date field', () => {
        const date = '2021-05-07';
        cy.get('#date').type(date).should('have.value', date);
    });

    it('should type in a time field', () => {
        // HH-MM-SS
        // HH = 0-23, MM = 0-59, SS = 0-59
        const time = '13:00';
        cy.get('#time').type(time);
    });

    it('should use key combinations', () => {
        cy.get('#key-combo').type('{ctrl}Chris');
    });
});

describe.only('Global shortcuts', () => {
    // beforeEach(() => cy.visit('http://localhost:8080/'));

    // it('should use global shortcuts', () => {
    //     cy.get('body').type('{downarrow}');
    // });

    beforeEach(() => cy.visit('https://docs.cypress.io/api/table-of-contents'));

    it.only('should scroll down', () => {
        cy.get('body').type('{downarrow}{downarrow}');
    });
});