import { Utils } from "./utils";
import path from "path";

export class Seeder extends Utils {
    constructor(
        private projectName: string,
        private workspacePath: string,
        private projectDescription: string
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
        try {
            this.copydirSync(templatePath, outputPath, true);
            let projectIdentifierPath = `${outputPath}/${this.projectName}.ste.json`;
            this.writeJSON2File(projectIdentifierPath, {
                'projectName': this.projectName,
                'projectDescription': this.projectDescription
            });
        } catch (e) {
            throw new Error(e);
        }
    }
    public run(templatePath?) {
        if (this._checkProjectName(this.projectName)) {
            if (this.isFolderThere(this.workspacePath)) {
                let projectFolder = `${this.workspacePath}/${this.projectName}`;
                this.mkdir(projectFolder);
                this.seedFiles(templatePath, projectFolder);
                this.fileStringReplaceSync({
                    filePath: path.join(projectFolder, 'package.json'),
                    replaceCallback: data => {
                        data = data.replace("%%projectName%%", this.projectName.replace(/ /g, '-'));
                        data = data.replace("%%projectDescription%%", 'still playground'); // @Keith3895 change this later.
                        return data;
                    }
                });
            } else {
                throw new Error(`${this.workspacePath} was not found.`);
            }
        }
    }
}
