require('dotenv').config();
const app = require('./src/app');
const { connectDatabase } = require('./src/config/database');

const port = process.env.PORT || 10000;

(async () => {
  try {
    const connected = await connectDatabase();
    if (!connected) {
      console.error('Database not connected at startup');
    }
  } catch (e) {
    console.error('Unexpected error during startup:', e && e.message ? e.message : e);
  }
  app.listen(port, () => {});
})();