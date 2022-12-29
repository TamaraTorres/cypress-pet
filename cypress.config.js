const { defineConfig } = require("cypress");

module.exports = defineConfig({
  reporter: 'cypress-mochawesome-reporter',
  video: false,
  screenshotsFolder: 'images',
  retries: 1,
  e2e: {
      setupNodeEvents(on, config) {
            require('cypress-mochawesome-reporter/plugin')(on);
          },
      defaultCommandTimeout: 10000,
      baseUrl: 'http://api.football-data.org/v4',
    },
  env: {
      TRELLO_BASE_URL: 'https://api.trello.com/1/',
      TRELLO_KEY: 'YOUR API KEY',
      TRELLO_TOKEN: 'YOUR API TOKEN',
      TRELLO_BASE_URL_USER :'https://api.trello.com/1/members/YOUR USER NAME/',
    },
});
