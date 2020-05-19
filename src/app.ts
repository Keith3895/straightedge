// import { Seeder } from './codeGen/seed';

// let seeder = new Seeder('test', './output');
// seeder.run('./__template/seedApp');


import express from 'express';
import { CoreAPI } from './services/coreAPI';
const app = express();
app.use('/', CoreAPI);
app.listen(3001);
