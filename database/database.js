
'use strict';

exports.insertContainer = insertContainer;
exports.allowedContainer = allowedContainer;
exports.deleteContainers = deleteContainers;
exports.listContainers = listContainers;

const db = require('../src/db');

function insertContainer(name) {
  return db.getDb().then(dataBase =>
    dataBase.run('INSERT INTO container(name) VALUES(?)', [name]));
}

function allowedContainer(name) {
  return db.getDb().then(dataBase =>
    dataBase.get("SELECT * FROM container WHERE name = ? OR name = 'all-containers'", name));
}

function deleteContainers() {
  return db.getDb().then(dataBase => dataBase.run('DELETE FROM container'));
}

function listContainers() {
  return 'SELECT * FROM container';
}
