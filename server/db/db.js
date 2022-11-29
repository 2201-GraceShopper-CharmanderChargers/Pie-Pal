const Sequelize = require('sequelize');
const packageJson = require('../../package.json');

const databaseName =
  packageJson.name + (process.env.NODE_ENV === 'test' ? '-test' : '');

const config = {
  logging: false,
  dialect: 'postgres',
  protocol: 'postgres',
  dialectOptions: {
    ssl: true,
    native: true,
  },
};
if (process.env.LOGGING === 'true') {
  delete config.logging;
}
//let config;

// if (process.env.DATABASE_URL) {
//     config.dialectOptions = {
//       ssl: {
//         //require: true,
//         rejectUnauthorized: false,
//       },
//     };
// } else {
//   config = {
//     logging: false,
//   };
// }

if (process.env.DATABASE_URL) {
  config.dialectOptions = {
    ssl: {
      rejectUnauthorized: false,
    },
  };
}

const db = new Sequelize(
  process.env.DATABASE_URL || `postgres://localhost:5432/${databaseName}`,
  config
);
module.exports = db;

//////

// const databaseName =
//   pkg.name + (process.env.NODE_ENV === 'test' ? '-test' : '');

// let config;

// if (process.env.DATABASE_URL) {
//   config = {
//     logging: false,
//     ssl: true,
//     dialectOptions: {
//       ssl: {
//         require: true,
//         rejectUnauthorized: false,
//       },
//     },
//   };
// } else {
//   config = {
//     logging: false,
//   };
// }

// const db = new Sequelize(
//   process.env.DATABASE_URL || `postgres://localhost:5432/${databaseName}`,
//   config
// );

// module.exports = db;

// // This is a global Mocha hook used for resource cleanup.
// // Otherwise, Mocha v4+ does not exit after tests.
// if (process.env.NODE_ENV === 'test') {
//   after('close database connection', () => db.close());
// }

// console.log(chalk.blue(`Opening database connection to ${packageJson.name}`));

// const databaseName =
//   packageJson.name + (process.env.NODE_ENV === 'test' ? '-test' : '');
// const config = {
//   logging: false,
// };

// if (process.env.LOGGING === 'true') {
//   delete config.logging;
// }

// //https://stackoverflow.com/questions/61254851/heroku-postgres-sequelize-no-pg-hba-conf-entry-for-host
// if (process.env.DATABASE_URL) {
//   config.dialectOptions = {
//     ssl: {
//       rejectUnauthorized: false,
//     },
//   };
// }

// console.log(`Opening database connection to ${databaseName}`);
// const db = new Sequelize(
//   process.env.DATABASE_URL || `postgres://localhost:5432/${databaseName}`, config

// );
