const express = require("express");
const fs = require("fs").promises;
const winston = require("winston");
const accountsRouter = require("./routes/accounts.js");
const app = express();
const port = 3000;

global.fileName = "accounts.json";

const { combine, timestamp, label, printf } = winston.format;

const myFormat = printf(({ level, message, label, timestamp }) => {
  return `${timestamp} [${label}] ${level}: ${message}`;
});

global.logger = winston.createLogger({
  level: "silly",
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: "my-bank-api.log" }),
  ],
  format: combine(label({ label: "my-bank-api" }), timestamp(), myFormat),
});

// configurar que na instância será usado o express com json

app.use(express.json());
app.use("/account", accountsRouter);

// Método listen - criar um registro na API sem promises

// app.listen(port, function () {
//   try {
//     fs.readFile(global.fileName, 'utf8', (err, data) => {
//       if (err) {
//         const initialJson = {
//           nextId: 1,
//           accounts: [],
//         };
//         fs.writeFile(global.fileName, JSON.stringify(initialJson), (err) => {
//           console.log(err);
//         });
//       }
//     });
//   } catch (err) {
//     console.log(err);
//   }

//   console.log(`Listening to port: ${port}`);
// });

// método listen com promises

app.listen(port, async () => {
  try {
    await fs.readFile(global.fileName, "utf8");
    logger.info(`Listening to port: ${port}`);
  } catch (err) {
    const initialJson = {
      nextID: 1,
      accounts: [],
    };
    fs.writeFile(global.fileName, JSON.stringify(initialJson)).catch((err) => {
      logger.error(err);
    });
  }
});
