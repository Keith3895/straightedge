export class Workspace {
    wsPath: string;
    constructor(path?) {
        if (path) {
            this.wsPath = path;
        }
    }
    set WsPath(path) {
        // set the json to config file.
        this.wsPath = path;
    }

    get WsPath() {
        return this.wsPath;
    }
}