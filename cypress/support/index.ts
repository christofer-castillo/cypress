/// <reference types="cypress" />
import './commands';
import './component';
import { CustomForm } from './commands';
import { mount } from 'cypress/react';

declare global {
    namespace Cypress {
        interface Chainable {
            configureCypressTestingLibrary(config: Config): Chainable;
            /**
             * Custom command that seeds local storage with the following params:
             * @param key
             * @param value
             */
            seedLocalStorage(key: string, value: string): Chainable;
            /**
             * @param value string attached to data-cy = ''
             * @example cy.getDataTag('selector')
             */
            getDataTag(value: string): Chainable;
            interceptGraphQl(opName: string): Chainable;
            getAndSetToken(): VoidFunction;
            saveLocalStorage(): Chainable;
            restoreLocalStorage(): Chainable;
            login(): Chainable;
            requestGraphQl(operationName: string): Chainable;
            customFormCommand({ firstName, lastName, email, number, subject }: CustomForm): Chainable;
            mount: typeof mount;
        }
    }
}