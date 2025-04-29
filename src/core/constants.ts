const BASE_URL = process.env.BASE_URL as string;
const DB_CONNECTION_STRING = process.env.DB_CONNECTION_STRING as string;
const AUTH_SECRET = process.env.DB_CONNECTION_STRING as string;
const EMAIL_JWT = process.env.EMAIL_JWT as string;
const NODEMAILER_USER = process.env.NODEMAILER_USER as string;
const NODEMAILER_PASSWORD = process.env.NODEMAILER_PASSWORD as string;

// LocalStorage keys
const LANG_CODE_KEY = 'langCode';
const DASHBOARD_STATE_KEY = 'dashboard_state';
const MBTI_TYPE_STATE_KEY = 'mbti_type_state';
const MBTI_TYPES_STATE_KEY = 'mbti_types_state';
const MBTI_TEST_RESULTS_STATE_KEY = 'mbti_test_results_state';
const PROMPT_STATE_KEY = 'prompt_state';
const PROMPT_SIMPLE_OUTPUT_KEY = 'prompt_simple_output';

export {
  BASE_URL,
  DB_CONNECTION_STRING,
  AUTH_SECRET,
  EMAIL_JWT,
  NODEMAILER_USER,
  NODEMAILER_PASSWORD,
  LANG_CODE_KEY,
  DASHBOARD_STATE_KEY,
  MBTI_TYPE_STATE_KEY,
  MBTI_TYPES_STATE_KEY,
  MBTI_TEST_RESULTS_STATE_KEY,
  PROMPT_STATE_KEY,
  PROMPT_SIMPLE_OUTPUT_KEY,
};
