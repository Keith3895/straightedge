import { Utils } from "./utils";

export class Seeder extends Utils {
    constructor(
        private projectName,
        private workspacePath
    ) {
        super();
    }
    /**
     * Method called to check the validity projectName.
     * @param {String} projectName - The name of the project
     * @returns {boolean}
     */
    private _checkProjectName(projectName: string): boolean {
        if (projectName) {
            return true;
        } else {
            return false;
        }
    }

    private seedFiles(templatePath, outputPath) {
        this.copydirSync(templatePath, outputPath, true);
    }


    public run(templatePath?) {
        if (this._checkProjectName(this.projectName)) {
            if (this.isFolderThere(this.workspacePath)) {
                // do something.
                this.seedFiles(templatePath, this.workspacePath);
            }
        }
    }
}
