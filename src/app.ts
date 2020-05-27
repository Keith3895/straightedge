import express from 'express';
import { CoreAPI } from './services/routes/coreAPI';
import cors from 'cors';
import bodyParser from 'body-parser';

const crosChange = cors({
    origin: [
        process.env.UI_HOST_URL || 'http://localhost:3000',
        process.env.BASE_URL]
    ,
    credentials: true
});
const app = express();
app.use(crosChange);
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json())
app.use('/', CoreAPI);

app.listen(3001);

export default app;