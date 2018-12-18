const path = require('path')
const dotenv = require('dotenv')

if (process.env.NODE_ENV === 'development') {
  const result = dotenv.config({path: path.resolve(__dirname, '../../.env')})
  if (result.error) {
    console.log('Couldn\'t load .env file at project root')
  } else {
    console.log('Loaded environment variables from .env file')
  }
}

module.exports = {
  NODE_ENV: JSON.stringify(process.env.NODE_ENV),
}