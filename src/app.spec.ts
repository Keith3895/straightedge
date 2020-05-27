import { expect, request, use } from 'chai';
import chaiHttp from 'chai-http';
import app from './app';
use(chaiHttp);
describe('app entry', () => {
    it('get preference.', () => {
        request(app).get('/preference').end((err, res) => {
            expect(res).to.have.status(200);
            // tslint:disable-next-line: no-unused-expression
            expect(res.body.workspace).to.exist;
        });
    });
    it('get workspace.', () => {

        request(app).get('/workspace').end((err, res) => {
            expect(res).to.have.status(200);
            // tslint:disable-next-line: no-unused-expression
            expect(res.body.workspace).to.exist;
            // tslint:disable-next-line: no-unused-expression
            expect(res.body.list).to.exist;
        });
    });
});