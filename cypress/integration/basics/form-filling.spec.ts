import { validInformation, invalidInformation, spacesFixture } from 'fixtures/form-filling';
import { fillOutContactForm } from 'support/utility-functions';

describe('Form Filling Command', () => {
    // make sure to run the `yarn server` command to start the server
    beforeEach(() => cy.visit('http://localhost:8080/form.html'));

    it('should type with valid inputs', () => {
        fillOutContactForm(validInformation);
        cy.getDataTag('submit').click();
    });
    
    it('should type with invalid inputs', () => {
        fillOutContactForm(invalidInformation);
        cy.getDataTag('number').should('have.value', '');
        cy.getDataTag('submit').click();
        cy.contains('Your favorite number is required').should('be.visible');
    });

    it('should type in just spaces', () => {
        fillOutContactForm(spacesFixture);
        cy.getDataTag('submit').click();
        const errorMessages = [
            'First name is required',
            'Last name is required',
            'Invalid email format',
            'Subject is required'
        ];
        errorMessages.forEach(msg => {
            cy.contains(msg).should('be.visible');
        });
    });

    it('should use the custom command', () => {
        cy.customFormCommand(validInformation);
        cy.getDataTag('submit').click();
    });
});