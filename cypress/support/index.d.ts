declare namespace Cypress {
    interface Chainable {
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
      getDataTag(value: string): Chainable<Element>;
      interceptGraphQl(opName: string): Chainable;
      getAndSetToken(): VoidFunction;
      saveLocalStorage(): Chainable;
      restoreLocalStorage(): Chainable;
      login(): Chainable;
      requestGraphQl(operationName: string): Chainable;
      customFormCommand({firstName,
        lastName,
        email,
        number,
        subject}): Chainable;
    }
  }