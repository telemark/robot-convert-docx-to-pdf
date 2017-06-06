'use strict'

const convertToPdf = require('../convertToPdf')

module.exports = documents => {
  return new Promise(async (resolve, reject) => {
    Promise.all(documents.map(convertToPdf))
      .then(resolve)
      .catch(reject)
  })
}
