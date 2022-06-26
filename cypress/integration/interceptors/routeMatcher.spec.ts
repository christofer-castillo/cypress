const url = 'https://gorest.co.in/rest-console';

// GoRest has an ad bar blocking interaction
describe.skip('URL argument Examples', () => {
    beforeEach(() => cy.visit(url));

    it('should match based on substring', () => {
        cy.intercept('users').as('subString');
        cy.get('#rsq_send').click();
        cy.get('@subString');
    });

    it('should match based on entire url', () => {
        cy.intercept('https://gorest.co.in/public-api/users').as('wholeString');
        cy.get('#rsq_send').click();
        cy.get('@wholeString');
    });

    it('should match based on a minimatch pattern', () => {
        cy.intercept('gorest.co.in/*/users').as('minimatch');
        cy.get('#rsq_send').click();
        cy.get('@minimatch');
    });

    it('should match based on a regular expression', () => {
        cy.intercept(/\/users/).as('regex');
        cy.get('#rsq_send').click();
        cy.get('@regex');
    });
});

describe.skip('routeMatcher Examples', () => {
    beforeEach(() => cy.visit(url));

    it('should intercept the route with matching headers', () => {
        cy.get('#rsq_url').clear().type('https://gorest.co.in/public-api/users?page=2');

        // auth
        // cy.intercept({
        //     auth: {
        //         username: 'random username',
        //         password: 'random password'
        //     }
        // }).as('auth');

        // headers
        cy.intercept({
            headers: {
                authorization: 'Bearer YOUR_ACCESS_TOKEN'
            }
        }).as('headers');

        // hostname
        cy.intercept({
            hostname: 'gorest.co.in'
        }).as('hostname');

        // https
        cy.intercept({
            https: true
        }).as('https');

        // path
        cy.intercept({
            path: '/public-api/users?page=2'
        }).as('path');

        // pathname
        cy.intercept({
            pathname: '/public-api/users'
        }).as('pathname');

        // port
        // cy.intercept({
        //     port: 1
        //     port: [1,2,4]
        // }).as('port');

        // querystring
        cy.intercept({
            query: {
                page: '2'
            }
        }).as('querystring');

        cy.contains('Send Request').click();

        cy.wait('@headers');
        cy.wait('@hostname');
        cy.wait('@https');
        cy.wait('@path');
        cy.wait('@pathname');
        cy.wait('@querystring');
    });
});