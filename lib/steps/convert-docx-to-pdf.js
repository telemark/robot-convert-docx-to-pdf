'use strict'

const convertToPdf = require('../convert-to-pdf')

module.exports = data => {
  return new Promise(async (resolve, reject) => {
    const files = data.documents.map(data => data.file)
    await Promise.all(
      files.map(async (document, i) => {
        data.documents[i].file = await convertToPdf(document)
      }))
      .then(() => {
        resolve(data)
      })
      .catch(reject)
  })
}
