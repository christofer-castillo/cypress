describe('.then command', { baseUrl: 'https://swapi.dev/api' }, () => {

    let coolestCharacter; // Darth Vader of course
    before(() => {
        cy.request({
            url: '/people',
            method: 'GET'
        }).then(response => {
            coolestCharacter = response.body.results[3].name;
        });
    });

    it('should utilize the request from the before block and input the name', () => {
        cy.visit('https://example.cypress.io/commands/actions');
        cy.get('#fullName1').type(coolestCharacter);
    });

    it("should chain on multiple .then's  - looks like callback hell", () => {
        cy.request({
            url: '/',
            method: 'GET',
            failOnStatusCode: false
        }).then(response => {
            const { films } = response.body;
            cy.request({
                url: `${films}`,
                method: 'GET'
            }).then(response => {
                const { url } = response.body.results[0];
                cy.request({
                    url, // same as url: url
                    method: 'GET'
                });
            });
        });
    });

    it('should chain on .thens to a DOM element and manipulate it', () => {
        cy.visit('https://example.cypress.io/commands/actions');

        cy.get('h1').then(h1 => {
            cy.log(h1.text().toLowerCase());
        });
    });
});

// Other examples include:
// getAndSetToken command
// command log spec
// test-requests-with-headers spec