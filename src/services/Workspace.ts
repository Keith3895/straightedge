import fs from 'fs';
import { Preferences } from './preference';
import { Utils } from '../codeGen/utils';
import * as Path from 'path';
export class Workspace extends Utils {
    wsPath: string;
    preferenceInstance = new Preferences();
    constructor(path?) {
        super();
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
        return dirRawList.map(el => this.isProjectFolder(Path.join(this.wsPath, el))).filter(el => el);
    }
    private isProjectFolder = (folderPath) => {
        if (fs.lstatSync(folderPath).isDirectory()) {
            let content = fs.readdirSync(folderPath);
            let result = content.findIndex(el => /ste.json$/.test(el));
            if (result >= 0) {
                return this.readFileAsJSON(Path.join(folderPath, content[result]));
            } else {
                return false;
            }
        } else {
            return false;
        }
    }
}