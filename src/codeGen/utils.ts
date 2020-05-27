import * as fs from "fs";
import * as path from "path";
export class Utils {
    public findTemplate(folderPath: string) {
        //
    }

    public isFolderThere(folderPath) {
        if (folderPath) {
            return fs.existsSync(folderPath);
        } else {
            return false;
        }
    }
    listDirectorySync(from, to, overwriteFiles) {
        const files = fs.readdirSync(from);
        this.copyFromArraySync(files, from, to, overwriteFiles);
    }

    copyFromArraySync(files, from, to, overwriteFiles) {
        if (files.length === 0) return true;
        const f = files.shift();
        this.copydirSync(path.join(from, f), path.join(to, f), overwriteFiles);
        this.copyFromArraySync(files, from, to, overwriteFiles);
    }

    public mkdir(folderPath, root?) {
        let dirs = folderPath.split(path.sep);
        let dir = dirs.shift();
        root = (root || '') + dir + path.sep;
        try {
            fs.mkdirSync(root);
        } catch (e) {
            // dir wasn't made, something went wrong
            if (!fs.statSync(root).isDirectory()) throw new Error(e);
        }
        return !dirs.length || this.mkdir(dirs.join(path.sep), root);
    }
    copydirSync(from, to, overwriteFiles = false) {
        const stats = fs.lstatSync(from);
        let statsname: string;
        if (stats.isDirectory()) {
            statsname = 'directory';
        } else if (stats.isFile()) {
            statsname = 'file';
        } else if (stats.isSymbolicLink()) {
            statsname = 'symbolicLink';
        }
        if (statsname === 'directory' || statsname === 'symbolicLink') {
            // Directory or SymbolicLink
            try {
                fs.statSync(to);
            } catch (err) {
                if (err.code === 'ENOENT') {
                    this.mkdir(to);
                } else {
                    throw err;
                }
            }
            this.listDirectorySync(from, to, overwriteFiles);
        } else if (stats.isFile()) {
            try {
                fs.statSync(to);
                if (overwriteFiles) {
                    this.writeFileSync(from, to);
                }
            } catch (err) {
                if (err.code === 'ENOENT') {
                    this.writeFileSync(from, to);
                } else {
                    throw err;
                }
            }
        } else {
            throw new Error('stats invalid: ' + from);
        }
    }
    public writeFileSync(from, to) {
        fs.writeFileSync(to, fs.readFileSync(from, 'binary'), 'binary');
    }
    /**
     * Method to replace the templatized values on the file.
     * @param {string} fileStringReplaceOptions.filePath - the path of the file to replace.
     * @param {boolean} fileStringReplaceOptions.ensure - to ensure check the file and add it.
     * @param {Function} fileStringReplaceOptions.replaceCallback - callback functions.
     */
    public fileStringReplaceSync(fileStringReplaceOptions: any) {
        if (!fileStringReplaceOptions.filePath || !fileStringReplaceOptions.replaceCallback || (typeof fileStringReplaceOptions.replaceCallback != 'function')) {
            throw new Error('Invalid fileStringReplaceOptions: Should have a valid filePath string and replaceCallback should be of type function which will have file utf-8 as first argument')
        }
        if (fileStringReplaceOptions.ensure) {
            this.ensureFileSync({
                filePath: fileStringReplaceOptions.filePath
            });
        }
        let data = fs.readFileSync(fileStringReplaceOptions.filePath, 'utf-8')
        data = fileStringReplaceOptions.replaceCallback(data);
        fs.writeFileSync(fileStringReplaceOptions.filePath, data);
        return data;
    }

    writeJSON2File(filePath, json,callback?) {
        fs.writeFileSync(filePath, JSON.stringify(json), 'utf8');
    }
    readFileAsJSON(filePath) {
        let dataString = fs.readFileSync(filePath, 'utf-8');
        let dataJSON = {};
        try {
            dataJSON = JSON.parse(dataString);
        } catch (e) {
            throw new Error('JSON parse failed');
        }
        return dataJSON;
    }
    ensureFileSync({
        filePath = '',
        isJson = false,
        initialValue = ''
    } = {}) {
        let filePathObject = path.parse(filePath);
        this.mkdir(filePathObject.dir);
        try {
            fs.statSync(filePath);
        } catch (acessError) {
            let content = initialValue;
            if (initialValue && isJson) {
                try {
                    if (typeof initialValue !== 'string') {
                        content = JSON.stringify(initialValue);
                    } else {
                        JSON.parse(initialValue);
                    }
                } catch (e) {
                    throw new Error(e);
                }
            } else if (isJson) {
                content = '{}';
            }
            fs.writeFileSync(filePath, content);
        }
    }
}