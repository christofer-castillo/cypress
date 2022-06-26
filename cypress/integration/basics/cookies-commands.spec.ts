import { cookie } from 'fixtures/cookie';

describe('All Other Cookies Commands', () => {

    beforeEach(() => {
        cy.visit('https://example.cypress.io/commands/cookies'); // The infamous kitchen sink site
        cy.setCookie(cookie.name, cookie.value); // name: Chris Castillo, value: '123456'
    }); 

    it('should retrieve a specific cookie', () => {
        // cy.getCookie('Chris Castillo');
        cy.getCookie(cookie.name).should(cookie => {
            expect(cookie.name).to.be.eq('Chris Castillo');
            expect(cookie.value).to.be.eq('123456');
        });
    });

    it('should retrieve all cookies', () => {
        cy.getCookies().should(cookies => {
            expect(cookies[0]).to.have.property('name', 'Chris Castillo');
            expect(cookies[0]).to.have.property('value', '123456');
        });
    });

    it('should remove a specific cookie', () => {
        cy.getCookies().should('have.length', 1).then(cookie => {
            cy.clearCookie(cookie[0].name); // Chris Castillo
        });

        cy.getCookies().should('have.length', 0);
    });

    it('should remove all cookies', () => {
        cy.getCookies().should('have.length', 1);

        cy.clearCookies();

        cy.getCookies().should('be.empty');
    });
});