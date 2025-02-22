module.exports = {
  port: process.env.PORT || 8080,
  db: {
    username: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASS || 'postgres',
    database: process.env.DB_NAME || 'proddb',
    host: process.env.DB_HOST || 'localhost',
    dialect: 'postgres',
    logging: false,
  },
};
