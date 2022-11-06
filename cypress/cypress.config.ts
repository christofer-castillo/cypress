import { defineConfig } from 'cypress';

export default defineConfig({
  env: {
    baseUrl: 'http://localhost:3000/',
    url: 'https://developer.mozilla.org/en-US/',
  },
  e2e: {
    baseUrl: 'http://localhost:3000/',
    env: {
      url: 'https://developer.mozilla.org/en-US/'
    }
  },
  component: {
    devServer: {
      framework: 'create-react-app',
      bundler: 'webpack',
    },
    specPattern: 'cypress/components/**/*.cy.tsx',
  },
})
