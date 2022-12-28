const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
   defaultCommandTimeout: 10000,
   baseUrl: 'http://api.football-data.org/v4',
  },
});
