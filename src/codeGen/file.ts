import * as fs from "fs";
import * as path from "path";

export class File {
    _filename: string;
    constructor(filename: string) {
        this._filename = path.resolve(filename);
    }
    /**
     * Gets the contents of a JSON file.
     *
     * @return {Promise<T>}
     */
    async getJSON<T>(): Promise<T> {
        return this._readFile().then(
            data => {
                return new Promise<T>((resolve, reject) => {
                    try {
                        return resolve(JSON.parse(data.toString()));
                    } catch (exception) {
                        reject(exception);
                    }
                });
            }
        );
    }

    /**
     * Both getJSON() and getContent() use this method.
     *
     * @return {Promise<Buffer>}
     */
    private async _readFile(): Promise<Buffer> {
        return new Promise<Buffer>((resolve, reject) => {
            fs.readFile(this._filename, (error: NodeJS.ErrnoException, data: Buffer) => {
                if (error) {
                    return reject(error);
                }
                return resolve(data);
            })
        });
    }
}