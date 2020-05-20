import fs from 'fs';
import { Preferences } from './preference';
export class Workspace {
    wsPath: string;
    preferenceInstance = new Preferences();
    constructor(path?) {
        if (path) {
            this.wsPath = path;
        } else {
            this.wsPath = this.preferenceInstance.preference.workspace;
        }
    }
    set WsPath(path) {
        // set the json to config file.
        this.wsPath = path[0];
        this.preferenceInstance.updateWorkspace(this.wsPath);
    }
    get WsPath() {
        return this.wsPath;
    }
    loadWs() {
        let dirRawList = fs.readdirSync(this.wsPath);
        return dirRawList.filter(el => this.isProjectFolder);
    }
    isProjectFolder = (folderPath) => {
        let content = fs.readdirSync(folderPath);
        let result = content.findIndex(el => /ste.json$/.test(el));
        return result >= 0;
    }
}