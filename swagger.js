const swaggerJsdoc = require("swagger-jsdoc");

// configure specification for swagger----->
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Triveous Ecommerce Backend Documentation",
      version: "1.0.0",
    },
    components: {
        securitySchemes: {
          bearerAuth: {
            type: 'http',
            scheme: 'bearer',
            bearerFormat: 'JWT',
          },
        },
      },
    servers: [
      {
        url: "https://pear-gorgeous-tortoise.cyclic.app",
      },
    ],
  },
  apis: ["./routes/*.js"],
};

// specification----->
const swaggerSpec = swaggerJsdoc(options);

module.exports = {
    swaggerSpec
};