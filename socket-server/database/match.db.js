import PouchDB from 'pouchdb-node'
import pouchfind from 'pouchdb-find';

PouchDB.plugin(pouchfind);

const db = new PouchDB('match');

export default db;