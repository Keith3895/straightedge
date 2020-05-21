import express from 'express';
import { Preferences } from '../preference';
export const CoreAPI = express.Router();
import { Workspace } from '../Workspace';
import { Seeder } from '../../codeGen/seed';
import path from 'path';
const WSinstance = new Workspace();
CoreAPI.get('/preference', (req, res) => {
    let preferenceInstance = new Preferences();
    res.send(preferenceInstance.preference);
});

CoreAPI.get('/workspace', (req, res) => {
    if (WSinstance.WsPath) {
        return res.send({
            workspace: WSinstance.WsPath,
            list: WSinstance.loadWs()
        });
    }
});

CoreAPI.post('/workspace', (req, res) => {
    WSinstance.WsPath = req.body.path;
    res.status(200).send({
        'message': 'success'
    });
});

CoreAPI.post('/createProject', (req, res) => {
    let projectName = req.body.projectName.replace(/(\s)|(\.)/ig, '_');
    let seeder = new Seeder(projectName, WSinstance.WsPath);
    seeder.run(path.join(__dirname, '../../config/__template/seedApp'));
    res.status(200).send({
        'message': 'success',
    });
});