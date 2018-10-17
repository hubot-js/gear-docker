
'use strict';

exports.insertContainer = insertContainer;
exports.getAllowedContainers = getAllowedContainers;
exports.deleteContainers = deleteContainers;
exports.listContainers = listContainers;

const db = require('../src/db');

function insertContainer(name) {
  return db.getDb().then(dataBase =>
    dataBase.run('INSERT INTO container(name) VALUES(?)', [name]));
}

function getAllowedContainers() {
  return db.getDb().then(dataBase => dataBase.all('SELECT * FROM container'));
}

function deleteContainers() {
  return db.getDb().then(dataBase => dataBase.run('DELETE FROM container'));
}

function listContainers() {
  return 'SELECT * FROM container';
}
