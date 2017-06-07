'use strict'

const fs = require('fs')
const logger = require('./logger')

module.exports = options => {
  return new Promise((resolve, reject) => {
    fs.writeFile(options.filePath, options.data, error => {
      if (error) {
        logger('error', ['save-file', options.filePath, 'error', JSON.stringify(error)])
        reject(error)
      } else {
        logger('info', ['save-file', options.filePath, 'success'])
        resolve(options.filePath)
      }
    })
  })
}
