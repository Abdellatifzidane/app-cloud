const { Sequelize } = require('sequelize');

// Database Connection
const sequelize = new Sequelize(
  process.env.DATABASE_URL, // Connection string from environment variable
  {
    dialect: 'postgres',
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false, // Necessary for many cloud-hosted databases
      },
    },
    define: {
      createdAt: 'added', // Custom field names
      updatedAt: 'updated',
    },
  }
);

(async () => {
  try {
    await sequelize.authenticate();
    console.log('Database connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
})();

sequelize.sync();

module.exports = sequelize;
