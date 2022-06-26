describe('Everything type in Cypress', () => {

    // Run the command: `yarn start` to start the local server to be able to view this
    beforeEach(() => cy.visit('http://localhost:3000/inputs'));

    it('should type in a standard text input', () => {
        const text = 'random string of characters';
        cy.get('#normal-text').type(text).should('have.value', text);
    });

    it('should type in a textarea', () => {
        const text = 'spaghetti & meatballs';
        cy.get('#textarea').type(text).should('have.value', text);
    });

    it('should type in a date field', () => {
        // Date Inputs: <input type="date">
        // yyyy-mm-dd
        const date = '2021-05-07';
        cy.get('#date').type(date).should('have.value', date);
    });

    it('should type in a month field', () => {
        // Month Inputs <input type="month">
        // yyyy-mm
        const month = '1991-12';
        cy.get('#month').type(month).should('have.value', month);
    });

    it('should type in a time field', () => {
        // Time Inputs <input type="time">
        // HH-MM-SS
        // HH = 0-23, MM = 0-59, SS = 0-59
        const time = '13:00';
        cy.get('#time').type(time).should('have.value', time);
    });

    it('should use key combinations', () => {
        cy.get('#key-combo').type('{ctrl}Chris');

        cy.get('#key-combo').clear().type('{ctrl+alt}billy');
    });

    it('should type into a contenteditable field', () => {
        cy.get('[contenteditable]').clear().type('something');
    });
});
