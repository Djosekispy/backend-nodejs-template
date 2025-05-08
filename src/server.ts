import express from 'express';
import path from 'path';
import { corsMiddleware } from './shared/middlewares/cors';
import { errorHandler } from './core/erros/handle';

const app = express();

app.use(corsMiddleware);
app.use(express.json());

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/templates'));

app.use('/public', express.static('public'));


//app.use(routes);
app.use(errorHandler);

export { app };
