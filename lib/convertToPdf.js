'use strict'

const logger = require('./logger')
const unoconv = require('unoconv2')
const saveFile = require('./save-file')
const deleteFile = require('./delete-file')

module.exports = document => {
  return new Promise(async (resolve, reject) => {
    logger('info', ['convert-docx-to-pdf'])

    unoconv.convert(document, 'pdf', { port: '2002' }, async (err, result) => {
      if (err) {
        logger('error', ['convert-docx-to-pdf', err])
        reject(err)
      }

      try {
        const pdfFileName = document.replace('.docx', '.pdf')
        await saveFile(pdfFileName, result)
        await deleteFile(document)
        logger('info', ['convert-docx-to-pdf'], `Converted ${document} to ${pdfFileName}`)
        resolve()
      } catch (error) {
        logger('error', ['convert-docx-to-pdf', error])
        reject(error)
      }
    })
  })
}
