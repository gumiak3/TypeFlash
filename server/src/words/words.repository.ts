import * as fs from 'fs';
import * as path from 'path';

export class WordsRepository {
  private fileName: string;
  constructor() {
    this.fileName = path.join(__dirname, '../../data/words.data');
  }

  async getWords(): Promise<string[]> {
    return new Promise((resolve, reject) => {
      fs.readFile(this.fileName, 'utf-8', (err, data) => {
        if (err) {
          return reject(err);
        }
        resolve(data.split('\n').map((word) => word.trim()));
      });
    });
  }
}
