describe('Testing Library Commands from ya boy Kent C. Dodds', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/form');
    });

    it('should test finding multiple inputs', () => {
        cy.findByLabelText(/First Name/i).click();
        // grabs the related input field

        cy.findByPlaceholderText(/family name/i).click();
        // grabs the related input field

        cy.findByText(/Favorite Number/i).click();
        // grabs the related input field

        cy.findByRole("button", { name: /some button/i}).click();
        // grabs the found button

        cy.on('window:alert', (txt) => {
            expect(txt).to.contains('Was found');
        });
    });
});

// Testing library supports three different prefixes -- get, query & find
// Cypress will only support find
// Find all types in this file
// https://github.com/testing-library/cypress-testing-library/blob/main/types/index.d.ts

// Issue with the current version not correctly identifying `findByRole`
// https://github.com/testing-library/cypress-testing-library/issues/205