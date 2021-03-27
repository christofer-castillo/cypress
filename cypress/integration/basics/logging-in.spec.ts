/// <reference types="cypress" />
describe('Alternative to programmatically logging in', {
    baseUrl: 'https://react-redux.realworld.io/#/?_k=d2t9lf'
}, () => {
    context('Utilizing API Request', () => {
        before(() => cy.getAndSetToken());

        it('should validate login status', () => {
            cy.visit('/');
            cy.contains('Christoff').should('be.visible');
        });
    });
    context('Utilizing Local Storage', () => {
        before(() => {
            cy.login();
            cy.saveLocalStorage();
        });

        it('should validate login status', () => {
            cy.restoreLocalStorage();
            cy.visit('/');
            cy.contains('Christoff').should('be.visible');
        });

        it('should not be logged in', () => {
            cy.visit('/');
            cy.contains('Sign in').should('be.visible');
        });
    });
});