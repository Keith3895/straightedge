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
}