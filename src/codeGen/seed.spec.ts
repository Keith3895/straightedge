import { expect } from 'chai';
import { Seeder } from './seed';
import Path from 'path';
import fs from 'fs';
describe('Seed app', () => {
    it('test run() : with correct project name', () => {
        let projectName = 'test';
        let seedInstance = new Seeder(projectName, `${__dirname}/../../testFolder`, 'test Description');
        seedInstance.run(Path.join(__dirname, '../config/__template/seedApp'));
        let projectFiles = fs.readdirSync(Path.join(__dirname, '/../../testFolder', projectName));
        expect(projectFiles.length).to.equal(6);
        deleteFolderRecursive(Path.join(__dirname, '/../../testFolder', projectName));
    });
    it('test run() : with no project name', () => {
        let projectName = '';
        try {
            let seedInstance = new Seeder(projectName, `${__dirname}/../../testFolder`, 'test Description');
            seedInstance.run(Path.join(__dirname, '../config/__template/seedApp'));
        } catch (e) {
            expect(e).throw(`${__dirname}/../../testFolder was not found.`);
        }
    });
});



let deleteFolderRecursive = (path) => {
    if (fs.existsSync(path)) {
        fs.readdirSync(path).forEach((file, index) => {
            const curPath = Path.join(path, file);
            if (fs.lstatSync(curPath).isDirectory()) { // recurse
                deleteFolderRecursive(curPath);
            } else { // delete file
                fs.unlinkSync(curPath);
            }
        });
        fs.rmdirSync(path);
    }
};

// mock({
//     'fake': {},
//     '__template': {
//         'seedApp': {
//             'codecept.conf.js': fs.readFileSync(`${process.cwd()}/src/config/__template/seedApp/codecept.conf.js`),
//             'jsconfig.json': fs.readFileSync(`${process.cwd()}/src/config/__template/seedApp/jsconfig.json`),
//             'package.json': fs.readFileSync(`${process.cwd()}/src/config/__template/seedApp/package.json`),
//             'steps.d.ts': fs.readFileSync(`${process.cwd()}/src/config/__template/seedApp/steps.d.ts`),
//             'steps_file.js': fs.readFileSync(`${process.cwd()}/src/config/__template/seedApp/steps_file.js`)
//         }
//     }
// });