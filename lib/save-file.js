'use strict'

const fs = require('fs')
const logger = require('./logger')

module.exports = options => {
  return new Promise((resolve, reject) => {
    fs.writeFile(options.filePath, JSON.stringify(options.data, null, 2), error => {
      if (error) {
        logger('error', ['save-file', options.data._id, options.filePath, 'error', JSON.stringify(error)])
        reject(error)
      } else {
        logger('info', ['save-file', options.data._id, options.filePath, 'success'])
        resolve(options.data)
      }
    })
  })
}
