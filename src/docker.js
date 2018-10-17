'use strict';

exports.startContainer = startContainer;
exports.stopContainer = stopContainer;
exports.restartContainer = restartContainer;

const Docker = require('dockerode');
const db = require('../database/database');

function startContainer(hubot, message, awnser, containerName) {
  containerFlow(hubot, message, awnser, containerName, 'START');
}

function stopContainer(hubot, message, awnser, containerName) {
  containerFlow(hubot, message, awnser, containerName, 'STOP');
}

function restartContainer(hubot, message, awnser, containerName) {
  containerFlow(hubot, message, awnser, containerName, 'RESTART');
}

function containerFlow(hubot, message, awnser, containerName, action) {
  const container = new Docker().getContainer(containerName);

  container.inspect()
    .then(() => db.getAllowedContainers())
    .then(permissionConfig => containerAllowed(container, permissionConfig))
    .then(() => containerAction(container, action))
    .then(() => hubot.speak(message, awnser, { containerName }))
    .catch(err => handleWithError(hubot, message, err));
}

function containerAllowed(container, permissionConfig) {
  if (permissionConfig.filter(c => match(container.id, c.name))[0]) {
    return Promise.resolve();
  }

  return Promise.reject(new Error('nowAllowed'));
}

function match(string, searchCriteria) {
  if (searchCriteria === string || searchCriteria === '*') {
    return true;
  }

  if (searchCriteria.startsWith('*') && searchCriteria.endsWith('*')
      && string.includes(searchCriteria.replace(/\*/g, ''))) {
    return true;
  }

  if (searchCriteria.startsWith('*') && string.endsWith(searchCriteria.replace('*', ''))) {
    return true;
  }

  return searchCriteria.endsWith('*') && string.startsWith(searchCriteria.replace('*', ''));
}

function containerAction(container, action) {
  if (action === 'START') {
    return container.start();
  }

  if (action === 'STOP') {
    return container.stop();
  }

  if (action === 'RESTART') {
    return container.restart();
  }

  return Promise.reject(new Error('unknow action'));
}

function handleWithError(hubot, message, err) {
  if (err && err.statusCode === 304) {
    hubot.speak(message, 'docker:container.already');
  } else if (err && err.statusCode === 404) {
    hubot.speak(message, 'docker:container.notFound');
  } else if (err.message === 'nowAllowed') {
    hubot.speak(message, 'docker:container.withoutPermission');
  } else {
    hubot.logDetailedError('docker:log.error.container', err);
    hubot.speak(message, 'docker:log.error.unexpectedError');
  }
}
