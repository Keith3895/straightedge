import fs from 'fs';
import preferenceConfig from '../config/preference.json';
import path from 'path';
export class Preferences {
    updateWorkspace(WsPath) {
        let config = preferenceConfig;
        config['workspace'] = WsPath;
        fs.writeFile(path.join(__dirname, '../config/preference.json'), JSON.stringify(config), 'utf8', (err) => {
            if (err) throw err;
        });
    }
    get preference() {
        return preferenceConfig;
    }
}