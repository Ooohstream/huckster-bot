import pg from 'pg';

const config = {
  user: process.env.DB_USER,
  hostname: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: Number(process.env.DB_PORT),
};

export const client = new pg.Client(config);
