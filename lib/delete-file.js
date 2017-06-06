'use strict'

const fs = require('fs')
const logger = require('./logger')

module.exports = filePath => {
  return new Promise((resolve, reject) => {
    logger('info', ['delete-file', filePath])
    fs.unlink(filePath, (error, data) => {
      if (error) {
        logger('error', ['delete-file', filePath, error])
      } else {
        logger('info', ['delete-file', filePath, 'deleted'])
      }
      resolve(data)
    })
  })
}
