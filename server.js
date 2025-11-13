require('dotenv').config();
const app = require('./src/app');
const { connectDatabase } = require('./src/config/database');

const port = process.env.PORT || 4000;

(async () => {
  try {
    await connectDatabase();
  } catch (e) {}
  app.listen(port, () => {});
})();