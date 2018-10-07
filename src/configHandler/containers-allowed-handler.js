'use strict';

exports.handle = handle;

const db = require('../../database/database');

function handle(hubot, awnser) {
  if (awnser === hubot.i18n('docker:config.keep')) {
    return Promise.resolve();
  }

  db.deleteContainers();

  const containers = awnser.replace(/\s/g, '').split(',');

  containers.forEach(c => db.insertContainer(c));

  return Promise.resolve();
}
