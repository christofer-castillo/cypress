/// <reference types="cypress" />

describe('Return Values', {
    baseUrl: 'https://jsonplaceholder.cypress.io'
}, () => {
    // Closures

    it('should not be done cause this is wack', () => {
        cy.visit('/');

        // This is no bueno, it is naughty
        const btn = cy.get('button');
        btn.click();
    });

    it('should yield the element\'s object', () => {
        cy.visit('/');

        cy.get('#run-button').then(obj => {
            console.log(obj);
        })
    });

    it('should display closures running completely before other commands', () => {
        cy.visit('/');

        cy.get('button').then(btn => {
            const txt = btn.text();

            cy.get('h1').click();

            expect(txt).to.be.eq('Try it');
        });

        // Note these will run after all of the nested commands finish
        cy.get('button').click();

        cy.get('#result').should('be.visible');
    });

    it('should allow you to inspect the objects Cypress yields with debugger', () => {
        cy.visit('https://example.cypress.io/commands/actions');

        cy.contains('button', 'Click to toggle popover').then(btn => {
            debugger;
            cy.get('.action-select').select('apples').then(selected => {
                debugger;
                cy.get('#password1').type('secrety secret').then(secret => {
                    debugger;
                    console.log(secret);
                    console.log(btn);
                    console.log(selected);
                });
            });
        })
    });

    // Variables
    // With the closures mentioned above, there is normally no need to declare variables
    // By using closures, you'll always have access to the objects yielded
    // Cypress mentions having mutable objects and trying to compare them you can store the values
    // Declaring a variable to compare is it


    // Aliases
    it('should alias a request made by Cypress', () => {
        cy.request('/comments').as('comments')

        // do stuff with other test code, get some coffee, then come back the request below

        cy.get('@comments').should((response) => {
            // @ts-ignore
            if (response.status === 200) {
                expect(response).to.have.property('duration')
                console.log(response);
            } else {
                // whatever else you want to look at
                console.error('Failure!');
            }
        })
    });
});