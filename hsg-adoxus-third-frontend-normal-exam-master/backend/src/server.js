import express from 'express';
import cors from 'cors';
import router from './router';
import errorHandler from './errorHandler';

const app = express();
const port = 5000;

app.use(express.json());
app.use(cors());
app.use(router);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`App is running on http://localhost:${port}`);
});

module.exports = app;
