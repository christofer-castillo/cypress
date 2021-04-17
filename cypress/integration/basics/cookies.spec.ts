// Remember to run the http server command `yarn http-server` before running this test suite
const localUrl = 'http://127.0.0.1:8080/';

describe('Cypress.Cookies - debug', () => {

    beforeEach(() => cy.visit(localUrl));

    it('should just click the button', () => {
        cy.get('button').click();

        cy.getCookie('Las Vegas').should('exist');
        cy.getCookie('Kansas City').should('exist');
    });
});

describe('Cypress.Cookies - preserveOnce', () => {

    before(() => {
        cy.visit(localUrl);
        cy.get('button').click();
    });

    beforeEach(() => {
        cy.log('Preserving the cookies before the test');
        Cypress.Cookies.preserveOnce('Las Vegas');
    });

    it('should preserve the cookies for the spec', () => {
        const stub = cy.stub();
        cy.on('window:alert', stub);
        cy.get('button')
            .click()
            .then(() => {
                expect(stub.getCall(0)).to.be.calledWith('Cookie exists');
        });
    });
});

describe.only('Cypress.Cookies - defaults', () => {
    before(() => {
        cy.clearCookies();
        Cypress.Cookies.defaults({
            preserve: ['Las Vegas', 'Kansas City', 'random'] // can just be a string, regExp, or function
        });
        cy.visit(localUrl);
        cy.get('button').click();
    });

    it('should have this preserved no problem', () => {
        cy.getCookie('Kansas City').should('exist');
        cy.getCookie('Las Vegas').should('exist');
    });
});