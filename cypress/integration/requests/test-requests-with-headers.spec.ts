/// <reference types="cypress" />
import {
    newUserData
} from 'support/utils';
import {
    getHeaders
} from 'support/api-headers';

// https://gorest.co.in/

describe('Using api header command', {
    baseUrl: 'https://gorest.co.in/public-api'
}, () => {
    let userId;

    it('Should create a user -- auth in header', () => {
        cy.request({
            method: 'POST',
            url: '/users',
            headers: getHeaders(),
            body: newUserData
        }).then(response => {
            userId = response.body.data.id;
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
            headers: getHeaders(true),
            body: newBody
        }).then(response => {
            expect(response.body.data).to.include(newBody);
        });
    });

    it('Should update the created user information', () => {
        const newEmail = 'randomEmail@gmail.com'
        cy.log('PUT /users/created-user');
        cy.request({
            method: 'PUT',
            url: `users/${userId}`,
            headers: getHeaders(true),
            body: {
                email: newEmail
            }
        }).then(response => {
            expect(response.body.data.email).to.equal(newEmail);
        });
    });

    it('Should delete the created user', () => {
        cy.log('DELETE /users/created-user.');
        cy.request({
            method: 'DELETE',
            url: `/users/${userId}`,
            headers: getHeaders(true)
        });
    });
});