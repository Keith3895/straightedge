import express from 'express';
import { Preferences } from './preference';

export const CoreAPI = express.Router();

CoreAPI.get('/preference', (req, res) => {
    let preferenceInstance = new Preferences();
    res.send(preferenceInstance.preference);
});

CoreAPI.get('/workspace', (req, res) => {

});

CoreAPI.post('/workspace', (req, res) => {

});