import { access_token, stringifiedNewUserData } from 'support/utils';

interface TestData {
    username: string;
    password: string;
    random: string;
}

const testData: TestData = {
    username: "chris",
    password: "super secret password",
    random: "random string"
}

describe('All things Fixtures', () => {

    const requestUrl = 'https://gorest.co.in/public-api/users';

    beforeEach(() => cy.visit('https://gorest.co.in/rest-console'));

    it('should load fixture data then access it via .then()', () => {
        cy.fixture('requests-folder/requests.json').then(json => {
            // intercept is a new method in cypress v6.0 - it's dope
            cy.intercept(requestUrl, json);
        });

        cy.contains('Send Request').click();
    });

    it('should retrieve a fixture of data via cy.intercept()', () => {
        cy.intercept(requestUrl, {
            // special property fixture on cy.intercept() StaticResponse object
            // can be used instead of what is done above
            fixture: 'request.json' // cypress/fixtures/request.json
            // Cypress will automatically validate fixture files - errors show in command log
        });

        cy.contains('Send Request').click();
    });

    it('should retrieve a fixture of data from a specific folder', () => {
        cy.intercept(requestUrl, {
            // path to file within cypress/fixtures
            fixture: 'requests-folder/requests'
            // when no extension is passed in, cypress will resolve in a specific order - json first
        });
        cy.contains('Send Request').click();
    });

    it('should stub a POST request with fixture data', () => {
        cy.intercept('POST', requestUrl, {
            fixture: 'requests-folder/requests'
        });

        cy.get('#rsq_type').select('POST');

        cy.get('#rsq_header_value_0').clear().type(`Bearer ${access_token}`);

        cy.get('#rsq_body').type(stringifiedNewUserData);

        cy.contains('Send Request').click();
    });

    it('should make a request and then write the response', () => {
        cy.request(requestUrl).then(response => {
            cy.writeFile('cypress/fixtures/empty.json', response.body)
        });

        cy.fixture('empty.json').then(response => {
            expect(response.data[0].id).to.be.a('number');
        });
    });

});

describe('Fixtures and the this keyword', () => {
    // has to be a normal function - not an arrow function due to the this context
    before(function () {
        cy.visit('https://gorest.co.in/rest-console');
        cy.fixture('test-data.ts').then(data => {
            this.data = data;
        });
    });

    // has to be a normal function - not an arrow function
    it('should type the password', function () {
        cy.get('#rsq_header_value_0').clear().type(this.data.username);

        cy.get('#rsq_body').type(this.data.password);
    });
});

describe('Fixtures and closure variables', () => {
    // using a closure variable
    let testData: TestData;

    before(() => {
        cy.visit('https://gorest.co.in/rest-console');
        cy.fixture('test-data.ts').then(data => {
            testData = data;
        });
    });

    it('should type the password', () => {
        cy.get('#rsq_header_value_0').clear().type(testData.username);

        cy.get('#rsq_body').type(testData.password);
    });
});

describe('Fixtures and imports', () => {
    before(() => cy.visit('https://gorest.co.in/rest-console'));

    it('should type the password', () => {
        // using testData that was imported above
        cy.get('#rsq_header_value_0').clear().type(testData.username);
        cy.get('#rsq_body').type(testData.password);
        cy.log(testData.random);
    });
});

describe('Fixtures and declaring aliases', () => {
    // load the fixture before hitting the tests
    before(() => {
        cy.fixture('request').as('yes');
        cy.visit('https://gorest.co.in/rest-console')
    });

    it('should load fixture data and declare an alias', () => {
        // retrieve the fixures and do what needs to be done
        cy.get('@yes').then((json: any) => {
            cy.get('#rsq_header_value_0').clear().type(json.data[0].name);
        });
    });
});