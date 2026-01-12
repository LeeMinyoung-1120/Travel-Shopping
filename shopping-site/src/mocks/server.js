const { setupServer } = require('msw');
const { handlers } = require('./handlers');

const server = setupServer(...handlers);

module.exports = { server };