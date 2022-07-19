import { defineConfig } from 'cypress'

export default defineConfig({
  env: {
    baseUrl: 'http://localhost:3000/',
    url: 'https://developer.mozilla.org/en-US/',
  },
  e2e: {
    // We've imported your old cypress plugins here.
    // You may want to clean this up later by importing these.
    setupNodeEvents(on, config) {
      return require('./cypress/plugins/index.ts')(on, config)
    },
  },
  component: {
    devServer: {
      framework: 'create-react-app',
      bundler: 'webpack',
    },
    setupNodeEvents(on, config) {},
    specPattern: 'cypress/integration/components/**/*spec.tsx',
  },
})
