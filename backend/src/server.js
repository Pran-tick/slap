import express from 'express';
import { ENV } from './config/env.js';
const app = express();

app.get('/', (req, res) => {
  res.send('Hello World1!')
})

console.log(`mongo uri: ${ENV.MONGO_URI}`)

app.listen(ENV.PORT, () => {
  console.log(`Server is running on port: ${ENV.PORT}`)
})

