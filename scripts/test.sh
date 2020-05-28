NODE_ENV="test"
npm run migrations:undo
npm run migrations:test --watch
jest