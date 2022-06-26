describe('First Todo Test Suite', () => {
    beforeEach(() => cy.visit(Cypress.env('baseUrl')));

    it('should do something', () => {
        cy.contains('Todo Input').should('be.visible');

        cy.get('[data-test="todo-id"]').type('something{enter}');

        cy.contains('something').should('be.visible');

        cy.wait(1000);

        cy
            .window()
            .then(() => {
                expect(localStorage.getItem('todos')).to.exist;
            });
    });
});