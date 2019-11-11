import { Injectable } from '@angular/core';
import { openDB } from 'idb';


@Injectable({
  providedIn: 'root'
})
export class IdbService {

  dbName:string = 'generator';
  constructor() {
  }



  async set(table, value, key) {
    

    const db = await openDB(this.dbName, 1, {
      upgrade(db) {
        db.createObjectStore('table');
        db.createObjectStore('module');
        db.createObjectStore('template');
      }
    });
    const tx = db.transaction(table, 'readwrite');
    tx.store.put(value, key);
    await tx.done;

  }

  async delete(table, key) {

    const db = await openDB(this.dbName, 1, {
      upgrade(db) {
        db.createObjectStore('table');
        db.createObjectStore('module');
        db.createObjectStore('template');
      }
    });
    const tx = db.transaction(table, 'readwrite');
    tx.store.delete(key);
    await tx.done;
  }

  async getAll(table) {
    const db = await openDB(this.dbName, 1, {
      upgrade(db) {
        db.createObjectStore('table');
        db.createObjectStore('module');
        db.createObjectStore('template');
      }
    });
    const tx = db.transaction(table, 'readwrite');
    const list = tx.store.getAll();
    await tx.done;
    return list;
  }

  async find(table, key) {

    const db = await openDB(this.dbName, 1, {
      upgrade(db) {
        db.createObjectStore('table');
        db.createObjectStore('module');
        db.createObjectStore('template');
      }
    });
    const row = db.get('table', key);
    return row;
  }


}
