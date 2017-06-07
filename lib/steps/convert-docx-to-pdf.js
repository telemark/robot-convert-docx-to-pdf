'use strict'

const convertToPdf = require('../convert-to-pdf')

module.exports = file => {
  return new Promise(async (resolve, reject) => {
    const files = file.documents.map(data => data.file)
    await Promise.all(
      files.map(async (document, i) => {
        file.documents[i].file = await convertToPdf(document)
      }))
      .then(() => {
        console.log(file)
        resolve(file)
      })
      .catch(reject)
  })
}
