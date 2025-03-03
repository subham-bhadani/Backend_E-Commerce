import fs from "fs";
import winston from "winston";

const fsPromise = fs.promises;

// async function log(logData) {
//   try {
//     logData = new Date().toISOString() + " log data: " + logData + "\n";
//     await fsPromise.appendFile("log.txt", logData);
//   } catch (err) {
//     console.log(err);
//   }
// }

const logger = winston.createLogger({
  level: "info",
  format: winston.format.json(),
  defaultMeta: { service: "request-logging" },
  transports: [new winston.transports.File({ filename: "log.txt" })],
});

const loggerMiddleware = async (req, res, next) => {
  const logData = `${req.url} - ${JSON.stringify(req.body)}`;
  //   await log(logData);
  logger.info(logData);
  next();
};

export default loggerMiddleware;
