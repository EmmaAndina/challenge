import * as fs from 'fs';
import * as path from 'path';
import dotenv from 'dotenv';

dotenv.config();

export class FileManager {
  static saveUser(data: any) {
    const filePath = path.join(__dirname, '..', '..', process.env.USER_DATA_PATH || 'src/data/userData.json');
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
  }

  static readUser(): any {
    const filePath = path.join(__dirname, '..', '..', process.env.USER_DATA_PATH || 'src/data/userData.json');
    if (fs.existsSync(filePath)) {
      const data = fs.readFileSync(filePath, 'utf8');
      return JSON.parse(data);
    }
    return null;
  }
}
