import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  const jateDB = await openDB("jate", 1);
  const text = jateDB.transaction("jate", "readwrite");
  const storeDb = text.objectStore("jate");
  const ask = storeDb.put({ jate: content });
  const result = await ask;
  console.log("Database", result);
};

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  const jateDB = await openDB("jate", 1);
  const text = jateDB.transaction("jate", "readonly");
  const storeDb = text.objectStore("jate");
  const ask = storeDb.getAll();
  const result = await ask;
  console.log(result);
};

initdb();
