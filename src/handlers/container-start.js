'use strict';

const docker = require('../docker');

exports.handle = handle;

function handle(hubot, message, task, params) {
  const containerName = params[0];

  docker.startContainer(hubot, message, task.options.message, containerName);
}
