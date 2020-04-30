import { Seeder } from './codeGen/seed';

let seeder = new Seeder('test', './output');
seeder.run('./__template');
