import dotenv from "dotenv";

console.log(process.env.NODE_ENV);

const env = dotenv.config({
  path: `env/.env.${process.env.NODE_ENV}`,
}).parsed;

console.log(env);
