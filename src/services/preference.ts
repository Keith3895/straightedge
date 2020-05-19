import fs from 'fs';
import preferenceConfig from '../config/preference.json';

export class Preferences {
    updateWorkspace(WsPath) {
        let config = preferenceConfig;
        config['workspace'] = WsPath;
        fs.writeFile('../config/preference.json', JSON.stringify(config), 'utf8', (err) => {
            if (err) throw err;
        });
    }
    get preference() {
        return preferenceConfig;
    }
}