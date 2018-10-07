# gear-docker
A Hubot Gear for manage Docker containers

[![Build Status](https://travis-ci.org/hubot-js/gear-docker.svg?branch=master)](https://travis-ci.org/hubot-js/gear-docker)  [![npm](https://img.shields.io/npm/v/gear-docker.svg)](https://www.npmjs.com/package/gear-docker) [![dependencies Status](https://david-dm.org/hubot-js/gear-docker/status.svg)](https://david-dm.org/hubot-js/gear-docker)  [![devDependencies Status](https://david-dm.org/hubot-js/gear-docker/dev-status.svg)](https://david-dm.org/hubot-js/gear-docker?type=dev)

> A Hubot Gear for manage Docker containers

This is a gear to add to hubot.js the ability to manipulate Docker containers. If you do not know the hubot.js or do not know what they are gears like this [click here](https://github.com/hubot-js/hubot.js/blob/master/README.md) for more details.

![all-operations](media/all-operations.gif)

## Configuration

Some settings are required. They can be made by Slack using the following command:

```
configure docker
```
![configure](media/configure.png)

These settings are stored, so you just need to do them once. But if necessary can make them again.

## Usage

### Restart a container

```
restart containerName
```

![restart-operation](media/restart-operation.gif)

### Stop a container

```
stop containerName
```

![stop-operation](media/stop-operation.gif)

### Start a container

```
start containerName
```

![start-operation](media/start-operation.gif)

## Meta
Robson Bittencourt - @rluizv - robson.luizv@gmail.com

Distributed under the MIT license. See [LICENSE](LICENSE) for more information.

https://github.com/hubot-js/gear-docker
