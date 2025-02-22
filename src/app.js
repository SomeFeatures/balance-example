const express = require('express');
const path = require('path');

const swaggerUi = require('swagger-ui-express');
const userRoutes = require('./routes/user.routes');
const umzug = require('./utils/umzug');
const config = require('./config');
const { User } = require('./models/user.model');

// eslint-disable-next-line import/no-dynamic-require
const swaggerFile = require(path.join(__dirname, '../src/utils/swagger-output.json'));

const app = express();
app.use(express.json());

app.use('/users', userRoutes);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));

/**
 * Start server.
 */
async function startServer() {
  try {
    await umzug.up();

    const [, created] = await User.findOrCreate({
      where: { id: 1 },
      defaults: { balance: 10000 },
    });
    if (created) {
      console.log('Created initial user with balance 10000');
    }

    app.listen(config.port, () => {
      console.log(`Server is running on port ${config.port}`);
      console.log(`Swagger docs at http://localhost:${config.port}/api-docs`);
    });
  } catch (error) {
    console.error('Error starting server:', error);
    process.exit(1);
  }
}

module.exports = { app, startServer };
