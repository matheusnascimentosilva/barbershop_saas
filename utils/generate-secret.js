
// This script generates a random JWT_SECRET and adds it to the .env file.
// It is used to generate a new secret key for the JWT authentication.
const crypto = require('crypto');
const fs = require('fs');

const secret = crypto.randomBytes(32).toString('base64');

fs.appendFile('.env', `JWT_SECRET=${secret}\n`, (err) => {
  if (err) {
    console.error(err);
  } else {
    console.log('JWT_SECRET gerado com sucesso!');
  }
});