[![Build Status](https://travis-ci.org/telemark/robot-convert-docx-to-pdf.svg?branch=master)](https://travis-ci.org/telemark/robot-convert-docx-to-pdf)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat)](https://github.com/feross/standard)
[![Greenkeeper badge](https://badges.greenkeeper.io/telemark/robot-convert-docx-to-pdf.svg)](https://greenkeeper.io/)

# robot-convert-docx-to-pdf

Converts docx to pdf.

- Picks file from queue directory
- Converts every file in documents to pdf
- Saves new file in done

## Setup

Update docker.env with correct settings

```bash
DONE_DIRECTORY_PATH=test/directories/done
ERRORS_DIRECTORY_PATH=test/directories/errors
QUEUE_DIRECTORY_PATH=test/directories/queue
TEMP_DIRECTORY_PATH=test/directories/temp
PAPERTRAIL_HOSTNAME=convert-docx-to-pdf
PAPERTRAIL_HOST=logs.papertrailapp.com
PAPERTRAIL_PORT=12345
```

## Build

```bash
$ docker build -t convert-robot .
```

## Usage

```
$ docker run --env-file=docker.env --volume=/test/directories/queue:/src/test/directories/queue --rm convert-robot
```

This will start a container. Do the job. Stop the container and remove it.

## License

[MIT](LICENSE)

![Robohash image of robot-convert-docx-to-pdf](https://robots.kebabstudios.party/robot-convert-docx-to-pdf.png "Robohash image of robot-convert-docx-to-pdf")