'use strict'

const getNextJobFromQueue = require('./lib/steps/get-next-job-from-queue')
const getFileData = require('./lib/steps/get-file-data')
const convertDocxToPdf = require('./lib/steps/convert-docx-to-pdf')
const saveToDone = require('./lib/steps/save-to-done')
const removeFromQueue = require('./lib/steps/remove-from-queue')
const logger = require('./lib/logger')

logger('info', ['index', 'start'])

getNextJobFromQueue()
  .then(getFileData)
  .then(convertDocxToPdf)
  .then(saveToDone)
  .then(removeFromQueue)
  .then(() => {
    logger('info', ['index', 'done'])
    process.exit(0)
  })
  .catch(error => {
    logger('error', ['index', 'error', error])
    process.exit(1)
  })
