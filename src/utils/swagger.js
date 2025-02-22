const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Balance API',
    description: 'API to manager user balance',
  },
  host: 'localhost:3000',
  schemes: ['http'],
  consumes: ['application/json'],
  produces: ['application/json'],
};

const outputFile = './swagger-output.json';
const endpointsFiles = ['./src/routes/user.routes.js'];

swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
  console.log('Swagger definitions generated.');
});
