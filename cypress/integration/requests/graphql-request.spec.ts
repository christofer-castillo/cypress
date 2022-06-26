import { countryNames, queryTodos } from 'support/graphql-queries';

describe('GraphQL Requests', () => {

    it('should use a locally defined query to make the request', () => {
        const countryName = `
        query countryName {
            countries {
            name,
            code,
            capital
            }
        }
        `;
        cy.request({
            url: '/',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: {
                query: countryName
            },
            failOnStatusCode: false
        }).then(response => {
            expect(response.body.data.countries[232].capital).to.be.eq("Washington D.C.");
        });
    });

    it('should import the query to make the request', () => {
        cy.request({
            url: '/',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: {
                query: countryNames
            },
            failOnStatusCode: false
        });
    });

    it('should utilize a custom command to make the request', () => {
        cy.log('Custom command like the one above.');
        cy.requestGraphQl(countryNames);
    });
});


describe('Graphql requests', () => {
    let firstTodo;

    it('should request todos', () => {
        cy.request({
            url: 'https://api.mocki.io/v1/44cb3920',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: {
                query: queryTodos
            },
            failOnStatusCode: false
        }).then(response => {
            firstTodo = response.body.data.getTodos[0].id;
        });
    });

    it('should update the first todo grabbed', () => {
        const updateTodo = `
        mutation todo {
            updateTodo(input: {id:"${firstTodo}", done: true }) {
              id
              done
            }
          }
        `;
        cy.request({
            url: 'https://api.mocki.io/v1/44cb3920',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: {
                query: updateTodo
            },
            failOnStatusCode: false
        });
    });
});