declare namespace Cypress {
    interface Chainable {
      /**
       * Custom command that seeds local storage with the following params:
       * @param key 
       * @param value 
       */
      seedLocalStorage(key: string, value: string): Chainable<void>;
      interceptGraphQl(opName: string): Chainable;
      getAndSetToken(): VoidFunction;
      saveLocalStorage(): Chainable;
      restoreLocalStorage(): Chainable;
      login(): Chainable;
      requestGraphQl(operationName: string): Chainable;
    }
  }