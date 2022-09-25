# Cypress
## Command Line Args
### Run all tests:
`yarn cypress run`
### Run specific spec
`yarn cypress run --spec "cypress/integration/basics/command-line-run.spec.ts"`
### Run specific browser
`yarn cypress run --spec "cypress/integration/basics/command-line-run.spec.ts" --browser chrome`
### Run with specific config
`yarn cypress run --spec "cypress/integration/basics/command-line-run.spec.ts" --config defaultCommandTimeout=1000`
### Run with specific config file
`yarn cypress run --spec "cypress/integration/basics/command-line-run.spec.ts" --config-file cypress/config/config-file-1.json`
### Run with specific env vars
`yarn cypress run --spec "cypress/integration/basics/command-line-run.spec.ts" --env url="<https://youtube.com>"`
### Run with json reporter
`yarn cypress run --spec "cypress/integration/basics/command-line-run.spec.ts" --reporter json`
### Run with junit reporter
`yarn cypress run --spec "cypress/integration/basics/command-line-run.spec.ts" --reporter junit`
### Run with quiet flag
`yarn cypress run --spec "cypress/integration/basics/command-line-run.spec.ts" --quiet`
### Run headed
`yarn cypress run --spec "cypress/integration/basics/command-line-run.spec.ts" --headed --no-exit`
### Run headless
`yarn cypress run --spec "cypress/integration/basics/command-line-run.spec.ts" --headless`

hi