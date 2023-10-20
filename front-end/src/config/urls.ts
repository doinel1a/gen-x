const BACK_END_BASE_URL =
  process.env.NODE_ENV === 'production'
    ? 'https://gen-x-back-end.fly.dev'
    : 'http://localhost:8080';

export { BACK_END_BASE_URL };
