import { expect } from 'chai';
import { Utils } from './utils';
import sinon from 'sinon';
import fs from 'fs';
import mock from 'mock-fs';
describe('Utils.', () => {
    let utilObj: Utils;
    let sandbox;
    beforeEach(() => {
        sandbox = sinon.createSandbox();
        sandbox.stub(fs, 'existsSync').withArgs('./output1').returns(true)
            .withArgs('fail').returns(false);
        sandbox.stub(fs, 'readdirSync').withArgs('somewhere').returns([
            'codecept.conf.js',
            'jsconfig.json',
            'package.json',
            'steps.d.ts',
            'steps_file.js'
        ]);
        mock({
            'some/dir': mock.directory({
                mode: '0755',
                items: {
                    file1: 'file one content',
                    file2: Buffer.from([8, 6, 7, 5, 3, 0, 9])
                }
            })
        });
        utilObj = new Utils();
    });
    afterEach(() => {
        sandbox.restore();
        mock.restore();
    });
    it('test isFolderThere: true', () => {

        let isFolderResp = utilObj.isFolderThere(process.cwd()+'/some');
        expect(isFolderResp).to.equal(true);
    });
    it('test isFolderThere: false', () => {
        let isFolderResp = utilObj.isFolderThere('fail');
        expect(isFolderResp).to.equal(false);
    });
    it('test isFolderThere empty parameters: false', () => {
        let isFolderResp = utilObj.isFolderThere(null);
        expect(isFolderResp).to.equal(false);
    });
    it('listDirectorySync positive.', () => {
        let from = process.cwd()+'/some';
        let to = process.cwd()+'/some/dir';
        let overwriteFiles = false;
        let copyStub = sandbox.stub(utilObj, 'copyFromArraySync').withArgs([
            'dir'
        ], from, to, overwriteFiles);
        utilObj.listDirectorySync(from, to, overwriteFiles);
        expect(copyStub.calledOnce).to.equal(true);
    });
    it('copydirSync: dir (dir not there)', () => {
        let mkdriStub = sandbox.stub(utilObj, 'mkdir');
        let listStub = sandbox.stub(utilObj, 'listDirectorySync');
        utilObj.copydirSync('some/dir', 'dir');
        expect(mkdriStub.callCount).to.equal(1);
        expect(listStub.callCount).to.equal(1);
    });
    it('copydirSync: dir (dir is present)', () => {
        let mkdriStub = sandbox.stub(utilObj, 'mkdir');
        let listStub = sandbox.stub(utilObj, 'listDirectorySync');
        utilObj.copydirSync('some/dir', 'some/dir');
        expect(mkdriStub.callCount).to.equal(0);
        expect(listStub.callCount).to.equal(1);
    });
    it('copydirSync: flie (flie not there):overwriteFiles = true', () => {
        let writeFileStub = sandbox.stub(utilObj, 'writeFileSync');
        utilObj.copydirSync('some/dir/file1', 'dir', true);
        expect(writeFileStub.callCount).to.equal(1);
    });
    it('copydirSync: file (file is present)', () => {
        let writeFileStub = sandbox.stub(utilObj, 'writeFileSync');
        utilObj.copydirSync('some/dir/file1', 'file1');
        expect(writeFileStub.callCount).to.equal(1);
    });
});