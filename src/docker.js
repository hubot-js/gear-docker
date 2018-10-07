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
  getContainer(hubot, message, containerName)
    .then(container => containerAction(container, action))
    .then(() => hubot.speak(message, awnser, { containerName }))
    .catch(err => handleWithError(hubot, message, err));
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

function getContainer(hubot, message, containerName) {
  const container = new Docker().getContainer(containerName);

  return container.inspect()
    .then(c => db.allowedContainer(adjustContainerName(c)))
    .then(isAllowed => permissionValidation(hubot, message, isAllowed, container))
    .catch((err) => { throw new Error(err); });
}

function permissionValidation(hubot, message, isAllowed, container) {
  if (isAllowed) {
    return Promise.resolve(container);
  }

  return Promise.reject('nowAllowed');
}

function handleWithError(hubot, message, err) {
  if (err && err.statusCode === 304) {
    hubot.speak(message, 'docker:container.alreadyStopped');
  } else if (err && err.statusCode === 404) {
    hubot.speak(message, 'docker:container.notFound');
  } else if (err.message === 'nowAllowed') {
    hubot.speak(message, 'docker:container.withoutPermission');
  } else {
    hubot.logDetailedError('docker:log.error.container', err);
    hubot.speak(message, 'docker:log.error.unexpectedError');
  }
}

function adjustContainerName(container) {
  return container.Name.replace('/', '');
}
