/// <reference types="cypress" />

describe('Title of test suite', () => {

    before(() => {
        // callback function to execute before all tests
    });

    beforeEach(() => {
        // callback function to execute before each test
    });

    after(() => {
        // callback function to execute after all tests
    });

    afterEach(() => {
        // callback function to execute after each test
    });

    it('Title of test case', () => {
        // commands to execute for the test
    });
});

context('Title of test suite', () => {

    // skip the test
    specify.skip('Title of test case', () => {
        // commands to execute for the test
    });

    // only run the specified test
    specify.only('Title of test case', () => {
        // commands to execute for the test
    });

    specify('Title of test case', {
        // config values that can be passed in a describe/context block or it/specify block
        // animationDistanceThreshold, baseUrl, browser, defaultCommandTimeout, execTimeout, env, includeShadowDom,
        // requestTimeout, responseTimeout, retries, scrollBehavior, viewportHeight, viewportWidth, waitForAnimations
    }, () => {
        // commands to execute for the test
    });
});