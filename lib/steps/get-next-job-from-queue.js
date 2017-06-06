'use strict'

const fs = require('fs')
const config = require('../../config')
const logger = require('../logger')
const isPdf = file => file.endsWith('.docx')

module.exports = () => {
  return new Promise((resolve, reject) => {
    fs.readdir(config.QUEUE_DIRECTORY_PATH, (error, files) => {
      if (error) {
        logger('error', ['get-next-job-from-queue', 'error', JSON.stringify(error)])
        reject(error)
      } else {
        const pdfFiles = files.filter(isPdf).map(fileName => `${config.QUEUE_DIRECTORY_PATH}/${fileName}`)
        if (pdfFiles) {
          logger('info', ['get-next-job-from-queue', 'jobs found'])
          resolve(pdfFiles)
        } else {
          logger('info', ['get-next-job-from-queue', 'no jobs found'])
          process.exit(0)
        }
      }
    })
  })
}
