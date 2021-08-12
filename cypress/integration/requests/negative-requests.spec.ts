/// <reference types="cypress" />
import {
    newUserData
} from 'support/utils';
import {
    getHeaders
} from 'support/api-headers';

describe('Negative Testing APIs', {
    baseUrl: 'https://gorest.co.in/public-api'
}, () => {

    it('should create a user -- happy path', () => {
        cy.request({
            method: 'POST',
            url: '/users',
            headers: getHeaders(),
            body: newUserData
        }).then(response => {
            expect(response.isOkStatusCode).to.be.true;
        });
    });

    it('should attempt to create a user with no body', () => {
        cy.request({
            method: 'POST',
            url: '/users',
            headers: getHeaders()
        }).then(response => {
            const {
                code,
                data
            } = response.body;
            expect(code).to.eq(422);
            data.forEach(i => {
                expect(i.message).to.be.eq("can't be blank");
            });
        });
    });

    it('should attempt to create a user with missing fields', () => {
        cy.request({
            method: 'POST',
            url: '/users',
            headers: getHeaders(),
            body: {
                email: 'randomEmail200@gmail.com'
            }
        }).then(response => {
            const {
                code,
                data
            } = response.body;
            expect(code).to.eq(422);
            data.forEach(i => {
                expect(i.message).to.be.eq("can't be blank");
            });
        });
    });

    it('should attempt to create a user with invalid input', () => {
        cy.request({
            method: 'POST',
            url: '/users',
            headers: getHeaders(),
            body: {
                name: true
            }
            // notice the response does not display a type error
        });
    });

    it('should attempt to create a user with invalid type', () => {
        cy.request({
            method: 'POST',
            url: '/users',
            headers: getHeaders(),
            body: {
                email: 2
            }
        }).then(response => {
            expect(response.body.data[3].message).to.be.eq('is invalid');
        });
    });

    it('should attempt to create a user with invalid HTTP method', () => {
        cy.request({
            method: 'PUT',
            url: '/users',
            headers: getHeaders(),
            body: newUserData,
            failOnStatusCode: false
        }).then(response => {
            expect(response.isOkStatusCode).to.be.false;
        });
    });

    it('should attempt to create a user with invalid endpoint', () => {
        cy.request({
            method: 'POST',
            url: '/users/1',
            headers: getHeaders(),
            body: newUserData,
            failOnStatusCode: false
        }).then(response => {
            expect(response.isOkStatusCode).to.be.false;
        });
    });

    it('should attempt to create a user with extra data', () => {
        cy.request({
            method: 'POST',
            url: '/users',
            headers: getHeaders(),
            body: {
                email: 'randomEmail202021@gmail.com',
                name: 'Brad Pitt',
                gender: 'Male',
                status: 'Active',
                extra: 'does not belong here'
            }
        }).then(response => {
            expect(response.isOkStatusCode).to.be.true;
        });
    });

    it('should attempt to delete a nonexistent user', () => {
        cy.request({
            method: 'DELETE',
            url: '/users/4000',
            headers: getHeaders(),
            failOnStatusCode: false
        }).then(response => {
            expect(response.body.data.message).to.eq('Resource not found');
        });
    });
});