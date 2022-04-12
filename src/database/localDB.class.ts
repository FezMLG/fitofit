export class LocalDB {
  db: any[];
  constructor() {
    this.db = [];
  }

  saveToLocal(object: any) {
    this.db.push(object);
  }
}
