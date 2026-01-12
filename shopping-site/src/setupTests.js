require('@testing-library/jest-dom');

require('cross-fetch/polyfill');

global.TextEncoder = require('util').TextEncoder;
global.TextDecoder = require('util').TextDecoder;

global.BroadcastChannel = class {
  constructor() {}
  postMessage() {}
  addEventListener() {}
  removeEventListener() {}
};

global.WritableStream = class {};
global.ReadableStream = class {};

// MSW 비활성화 (나중에 필요하면 다시 활성화)
// const { server } = require('./mocks/server');

// beforeAll(() => server.listen());

// afterEach(() => server.resetHandlers());

// afterAll(() => server.close());