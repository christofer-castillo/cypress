/// <reference types="cypress" />
import {
    access_token,
    newUserData
} from '../../support/utils';

// https://gorest.co.in/

describe('Cy.Request() Part Two', () => {
    let userId;

    it('Should create a user -- auth in header', () => {
        cy.request({
            method: 'POST',
            url: '/users',
            headers: {
                Authorization: `Bearer ${access_token}`
            },
            body: newUserData
        });
    });

    it('Should create a user -- using auth argument', () => {
        cy.request({
            method: 'POST',
            url: '/users',
            auth: {
                bearer: access_token
            },
            body: newUserData
        });
    });

    it('Should get users - default page', () => {
        cy.log('GET /users - page 1');
        cy.request({
            method: 'GET',
            url: '/users'
        })
    });

    it('Should get users - added query string for specific page', () => {
        cy.log('GET /users - page 2');
        cy.request({
            method: 'GET',
            url: '/users',
            qs: {
                page: 2
            }
        });
        // Request URL = "https://gorest.co.in/public-api/users?page=2"
    });

    it('Should get users - no query string for specific page', () => {
        cy.log('GET /users - page 2');
        cy.request({
            method: 'GET',
            url: '/users?page=2'
        });
        // Request URL = "https://gorest.co.in/public-api/users?page=2"
    });

    it('Should get users - added several qs for specific page', () => {
        cy.log('GET /users - page 2 paragraph 3 word 3');
        cy.request({
            method: 'GET',
            url: '/users',
            qs: {
                page: 2,
                paragraph: 3,
                word: 3
            }
        });
        // Request URL = ""https://gorest.co.in/public-api/users?page=2&paragraph=3&word=3""
    });

    it('Should search for user that has been created by name', () => {
        cy.log('GET /users/created-user-name');
        cy.request({
            method: 'GET',
            url: '/users',
            qs: {
                name: newUserData.name
            }
        }).then(response => {
            expect(response.body.data[0]).to.include({
                name: "Billy Bob"
            });
            userId = response.body.data[0].id;
        });
    });

    it('Should search for created user by email', () => {
        cy.log('GET /users/created-user-email');
        cy.request({
            method: 'GET',
            url: '/users',
            qs: {
                email: newUserData.email
            }
        }).then(response => {
            expect(response.body.data[0]).to.include({
                email: 'fakeEmail@gmail.com'
            });
        });
    });

    it('Should update the created user information', () => {
        const newEmail = 'randomEmail@gmail.com'
        cy.log('PUT /users/created-user');
        cy.request({
            method: 'PUT',
            url: `users/${userId}`,
            auth: {
                bearer: access_token
            },
            body: {
                email: newEmail
            }
        }).then(response => {
            expect(response.body.data.email).to.equal(newEmail);
        });
    });

    it('Should create a new post for the created user', () => {
        const newBody = {
            title: 'Super creative title',
            body: 'Random jibberish'
        };
        cy.log('POST /users/created-user/new-post');
        cy.request({
            method: 'POST',
            url: `/users/${userId}/posts`,
            auth: {
                bearer: access_token
            },
            body: newBody
        }).then(response => {
            expect(response.body.data).to.include(newBody);
        });
    });

    it('Should delete the created user', () => {
        cy.log('DELETE /users/created-user.');
        cy.request({
            method: 'DELETE',
            url: `/users/${userId}`,
            auth: {
                bearer: access_token
            }
        });
    });
});