'use strict'

const logger = require('./logger')
const unoconv = require('unoconv2')

module.exports = document => {
  return new Promise((resolve, reject) => {
    logger('info', ['convert-docx-to-pdf'])
    const docx = Buffer.from(document.data, 'base64')
    unoconv.convert(docx, 'pdf', { port: '2002' }, (err, pdfFile) => {
      if (err) {
        logger('error', ['convert-docx-to-pdf', err])
        reject(err)
      } else {
        const file = {
          title: document.replace('.docx', '.pdf'),
          data: pdfFile.toString('base64')
        }
        logger('info', ['convert-docx-to-pdf', `Converted ${document} to ${file.title}`])
        resolve(file)
      }
    })
  })
}
