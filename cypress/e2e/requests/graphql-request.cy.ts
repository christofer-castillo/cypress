import { pokemonNameQuery as query } from 'support/graphql-queries';

describe('GraphQL Requests', () => {

    const pokemonNameQuery = `
        query samplePokeAPIquery {
            pokemon_v2_pokemon {
              id
              name
            }
          }
        `;

    // Updating the test to request an actual endpoint that works now 😀
    it('should use a locally defined query to make the request', () => {
        cy.request({
            url: 'https://beta.pokeapi.co/graphql/v1beta',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: {
                query: pokemonNameQuery
            },
            failOnStatusCode: false
        }).then(response => {
            expect(response.body.data.pokemon_v2_pokemon).to.be.an('array');
            expect(response.body.data.pokemon_v2_pokemon[0].name).to.be.eq('bulbasaur');
        });
    });

    it('should import the query to make the request', () => {
        cy.request({
            url: 'https://beta.pokeapi.co/graphql/v1beta',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            // name the variable query to shortcut the object (it would be query: query), but this way is way cooler
            body: { query },
            failOnStatusCode: false
        });
    });

    it('should utilize a custom command to make the request', () => {
        cy.log('Custom command like the one above.');
        cy.requestGraphQl(pokemonNameQuery);
    });
});
