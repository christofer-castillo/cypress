/// <reference types="cypress" />
import {
    access_token,
    stringifiedNewUserData
} from 'support/utils';

// Cy.Intercept arguments
// cy.intercept(url, routeHandler?)
// cy.intercept(method, url, routeHandler?)
// cy.intercept(routeMatcher, routeHandler?)
// routeHandler can be a string, object, StaticResponse object, or callback function

describe('Actual RouteHandler examples', () => {
    beforeEach(() => cy.visit('https://gorest.co.in/rest-console'));

    const interceptedUrl = 'https://gorest.co.in/public-api/users';

    context('Intercepting Requests', () => {

        // Available functions on req - the name used here, can be whatever name you want
        // destroy, reply(interceptor | body | status), redirect

        it('should destroy the request before it is sent out', () => {
            cy.get('#rsq_type').select('POST');
            cy.get('#rsq_header_value_0').clear().type(`Bearer ${access_token}`);
            cy.get('#rsq_body').type(stringifiedNewUserData);
            cy.intercept('POST', interceptedUrl, req => {
                req.destroy();
            });
            cy.contains('Send Request').click();
        });

        it('should intercept the request - string & headers', () => {
            cy.intercept('GET', interceptedUrl, req => {
                req.reply('stringerrrr', {
                    auth: 'Aint no auth here',
                    anotherHeader: 'merp'
                });
            });

            cy.contains('Send Request').click();
        });

        it('should intercept the request - standard object', () => {
            cy.intercept('GET', interceptedUrl, req => {
                req.reply({
                    TampaBay: 'loses',
                    KansasCity: 'wins'
                });
            });

            cy.contains('Send Request').click();
        });

        it('should intercept the request - StaticResponse object', () => {
            cy.intercept('GET', interceptedUrl, req => {
                req.reply({
                    body: 'Chris Castillo',
                    headers: {
                        auth: 'none',
                        accept: 'everything'
                    },
                    statusCode: 200,
                    delayMs: 1000,
                    // if forceNetworkError is true - must be only property in this object
                    forceNetworkError: false
                });
            });

            cy.contains('Send Request').click();
        });

        it('should intercept the request - HTTP Status', () => {
            cy.intercept('GET', interceptedUrl, req => {
                req.reply(200);
            });

            cy.contains('Send Request').click();
        });

        it('should intercept the request - redirect', () => {
            cy.intercept('GET', interceptedUrl, req => {
                req.redirect('https://gorest.co.in');
            });

            cy.contains('Send Request').click();
        });

    });

    context('Intercepting responses', () => {

        // Inside of a callback passed to req.reply(), you are able to access the
        // server's real response.
        // Available functions on res - the name used here, can be whatever name you want
        // send(status | body | staticResponse), delay, throttle

        it('should intercept a response - string & headers', () => {
            cy.intercept('GET', interceptedUrl, req => {
                req.reply(res => {
                    // Have to stringify body so API does not freak out and throw 200 parseerror
                    res.send(JSON.stringify('JBiebs is not that bad'), {
                        newAlbum: 'Not Bad',
                        auth: 'false'
                    });
                })
            }).as('first');

            cy.contains('Send Request').click();
            cy.wait('@first');
        });

        it('should intercept a response - standard object', () => {
            cy.intercept('GET', interceptedUrl, req => {
                req.reply(res => {
                    // sending a standard object
                    res.send({
                        koolAid: 'Fruit Punch',
                        color: 'Red'
                    });
                })
            }).as('second');

            cy.contains('Send Request').click();
            cy.wait('@second');
        });

        it('should intercept a response - StaticResponse object', () => {
            const staticResponseObject = {
                // StaticResponse fields:
                // fixture, body, headers, statusCode, forceNetworkError, delayMs, & throttleKbps
                // Have to stringify body so API does not freak out and throw 200 parseerror
                body: JSON.stringify('idk what to put here'),
                headers: {
                    auth: 'falso',
                    body: 'nope',
                    cache: '15'
                },
                statusCode: 201,
                delayMs: 1000
            };

            cy.intercept('GET', interceptedUrl, req => {
                req.reply(res => {
                    // sending StaticResponse object
                    res.send(staticResponseObject);
                });
            }).as('third');

            cy.contains('Send Request').click();
            cy.wait('@third');
        });

        it('should intercept a response - HTTP status', () => {
            cy.intercept('GET', interceptedUrl, req => {
                req.reply(res => {
                    // sending HTTP Status & body & headers
                    res.send(202, JSON.stringify('string thangs'), {
                        header1: 'true',
                        header2: 'false',
                        header3: 'true'
                    });
                });
            }).as('fourth');

            cy.contains('Send Request').click();
            cy.wait('@fourth');
        });

        it('should intercept a response - delay & throttle', () => {
            cy.intercept('GET', interceptedUrl, req => {
                req.reply(res => {
                    res.delay(1000);
                    res.throttle(10);
                });
            }).as('fifth');

            cy.contains('Send Request').click();
            cy.wait('@fifth');
        });
    });

    context.only('Miscellaneous items', () => {
        it('should assert on a request', () => {
            cy.get('#rsq_type').select('POST');
            cy.get('#rsq_header_value_0').clear().type(`Bearer ${access_token}`);
            cy.get('#rsq_body').type(stringifiedNewUserData);
            cy.intercept('POST', interceptedUrl, req => {
                expect(req.body).to.not.be.undefined;
            }).as('first');

            cy.contains('Send Request').click();
            cy.wait('@first');
        });

        it('should modify the request body directly', () => {
            cy.get('#rsq_type').select('POST');
            cy.get('#rsq_header_value_0').clear().type(`Bearer ${access_token}`);
            cy.get('#rsq_body').type(stringifiedNewUserData);
            cy.intercept('POST', interceptedUrl, req => {
                req.body = JSON.stringify('Super easy change.');
            }).as('second');

            cy.contains('Send Request').click();
            cy.wait('@second');
        });

        it('should alias the request', () => {
            cy.intercept('GET', interceptedUrl, req => {
                req.alias = 'holdUp';
            });

            // Another way to do this.
            // cy.intercept('GET', interceptedUrl).as('holdUp');

            cy.contains('Send Request').click();
            cy.wait('@holdUp');
        });
    });
});

describe('GraphQL Intercept', () => {
    it('should display the best way to intercept GraphQL', () => {
        cy.intercept('POST', 'insertURL', req => {
            const {
                operationName
            } = JSON.parse(req.body);
            req.alias = operationName;
        });

        cy.interceptGraphQl('operationName');
    });
});