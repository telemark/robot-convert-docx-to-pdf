'use strict'

const getNextJobFromQueue = require('./lib/steps/get-next-job-from-queue')
const getFileData = require('./lib/steps/get-file-data')
const convertDocxToPdf = require('./lib/steps/convert-docx-to-pdf')
const logger = require('./lib/logger')

logger('info', ['index', 'start'])

getNextJobFromQueue()
  .then(getFileData)
  .then(convertDocxToPdf)
  .then(() => {
    logger('info', ['index', 'done'])
    process.exit(0)
  })
  .catch(error => {
    logger('error', ['index', 'error', JSON.stringify(error)])
    process.exit(1)
  })
