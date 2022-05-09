import dotenv from 'dotenv';

dotenv.config();

const config = {
  server: {
    port: process.env['PORT'],
  },
  jwt: {
    secret: process.env['SECRET'],
  },
};

export default config;
