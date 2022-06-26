/// <reference types="cypress" />
/// <reference path="../support/index.d.ts" />
import '@testing-library/cypress/add-commands';

Cypress.Commands.add('configureCypressTestingLibrary', (config) => {
    cy.configureCypressTestingLibrary(config);
});

Cypress.Commands.add('interceptGraphQl', (opName: string) => {
    cy.intercept('POST', 'insertURL', req => {
        const {
            operationName
        } = JSON.parse(req.body);
        if (operationName === opName) {
            console.log(operationName);
            req.alias = opName;
        }
    });
});

Cypress.Commands.add('requestGraphQl', operationName => {
    cy.request({
        url: '/',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: {
            query: operationName
        },
        failOnStatusCode: false
    });
});

let LOCAL_STORAGE = {};

Cypress.Commands.add('saveLocalStorage', () => {
    Cypress.log({
        message: 'Grabbing local storage and saving to variable.',
        displayName: 'SaveLocal'
    });
    Object.keys(localStorage).forEach(key => {
        LOCAL_STORAGE[key] = localStorage[key];
    });
});

Cypress.Commands.add('restoreLocalStorage', () => {
    Cypress.log({
        message: 'Grabbing local storage variable and setting.',
        displayName: 'SetLocal'
    });
    Object.keys(LOCAL_STORAGE).forEach(key => {
        localStorage.setItem(key, LOCAL_STORAGE[key]);
    });
});

const email = Cypress.env('email');
const password = Cypress.env('password');

Cypress.Commands.add('login', () => {
    cy.visit('https://react-redux.realworld.io/#/?_k=d2t9lf');
    cy.get('a[href="#login"]').click();
    cy.get('input[type=email]').type(email);
    cy.get('input[type=password]').type(password);
    cy.get('button').click();
});

Cypress.Commands.add('getAndSetToken', () => {
    Cypress.log({
        message: 'Requests token and sets in local storage.',
        displayName: 'GetToken'
    });
    cy.request({
        url: 'https://conduit.productionready.io/api/users/login',
        method: 'POST',
        body: {
            user: {
                email,
                password
            }
        }
    }).then(response => {
        const {
            token
        } = response.body.user;
        localStorage.setItem('jwt', token);
    });
});

Cypress.Commands.add('seedLocalStorage', (key, value) => {
    // Cypress.log takes an 'options' object
    Cypress.log({
        // $el: jQuery element for the command if it exists
        name: 'seedLocalStorage',
        displayName: 'seedLs',
        message: `key: ${key}, value: ${value}`,
        consoleProps: () => {
            return {
                'Key': key,
                'Value': value,
                'Local Storage': window.localStorage
            }
        }
    });

    localStorage.setItem(key, value);
});

Cypress.Commands.add("getDataTag", (value: string) => {
    return cy.get(`[data-cy=${value}]`);
});

Cypress.Commands.add('customFormCommand', ({
    firstName,
    lastName,
    email,
    number,
    subject
}) => {
    // First Name
    cy.getDataTag('first-name')
        .clear()
        .type(firstName);
    // Last Name
    cy.getDataTag('last-name')
        .clear()
        .type(lastName);
    // Email
    cy.getDataTag('email')
        .clear()
        .type(email);
    // Number
    cy.getDataTag('number')
        .clear()
        // @ts-ignore
        .type(number);
    // Subject
    cy.getDataTag('subject')
        .clear()
        .type(subject);
});