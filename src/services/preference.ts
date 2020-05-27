import fs from 'fs';
import preferenceConfig from '../config/preference.json';
import path from 'path';
import { Utils } from '../codeGen/utils';
export class Preferences extends Utils {
    updateWorkspace(WsPath) {
        let config = preferenceConfig;
        config['workspace'] = WsPath;
        this.writeJSON2File(path.join(__dirname, '../config/preference.json'), config);
    }
    get preference() {
        return preferenceConfig;
    }
}