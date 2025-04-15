const BASE_URL = process.env.BASE_URL as string;
const DB_CONNECTION_STRING = process.env.DB_CONNECTION_STRING as string;
const AUTH_SECRET = process.env.DB_CONNECTION_STRING as string;
const EMAIL_JWT = process.env.EMAIL_JWT as string;
const NODEMAILER_USER = process.env.NODEMAILER_USER as string;
const NODEMAILER_PASSWORD = process.env.NODEMAILER_PASSWORD as string;

if (
  !BASE_URL ||
  !DB_CONNECTION_STRING ||
  !AUTH_SECRET ||
  !EMAIL_JWT ||
  !NODEMAILER_USER ||
  !NODEMAILER_PASSWORD
) {
  throw new Error(`Cannot access environment variables`);
}

// Dev
const AUTH_EMAIL = process.env.AUTH_EMAIL as string;
const AUTH_PASSWORD = process.env.AUTH_PASSWORD as string;

export {
  BASE_URL,
  DB_CONNECTION_STRING,
  AUTH_SECRET,
  EMAIL_JWT,
  NODEMAILER_USER,
  NODEMAILER_PASSWORD,
  AUTH_EMAIL,
  AUTH_PASSWORD,
};
