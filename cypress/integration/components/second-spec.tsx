import App from 'App';
import * as React from 'react';
import { mount } from '@cypress/react';
import {ThemeProvider} from "styled-components";
import { theme} from "styles/theme";

describe('App.tsx main component test', () => {
    it('should input some data and verify it displays', () => {
        mount(
            <ThemeProvider theme={theme}>
                <App />
            </ThemeProvider>
        );

        cy
            .get('[data-test="todo-id"]')
            .click()
            .type('random{enter}');

        cy.contains('random').should('be.visible');
    });

    it('should verify there is an error message when the form is submitted without a value', () => {
        mount(
            <ThemeProvider theme={theme}>
                <App />
            </ThemeProvider>
        );

        cy
            .get('[data-test="todo-id"]')
            .click()
            .type('{enter}');

        cy.on('window:alert', (text) => {
            expect(text).to.contains('Please enter a todo.');
        });
    });

    it('should add and delete a new todo by clicking the delete icon', () => {
        mount(
            <ThemeProvider theme={theme}>
                <App />
            </ThemeProvider>
        );

        cy.get('input').type('new todo{enter}');
        cy.contains('new todo').should('be.visible');
        cy.get('button').click();

    });
});