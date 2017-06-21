'use strict'

const uuid = require('uuid')
const unoconv = require('better-unoconv')
const config = require('../config')
const deleteFile = require('./delete-file')
const saveFile = require('./save-file')
const logger = require('./logger')

module.exports = document => {
  return new Promise(async (resolve, reject) => {
    logger('info', ['convert-to-pdf', document.title])
    const docx = Buffer.from(document.data, 'base64')
    const fileName = `${config.TEMP_DIRECTORY_PATH}/${uuid()}.docx`
    await saveFile({filePath: fileName, data: docx})

    unoconv.convert(fileName, 'pdf', { port: '2002' }, async (error, pdfFile) => {
      if (error) {
        logger('error', ['convert-docx-to-pdf', error])
        await deleteFile(fileName)
        reject(error)
      } else {
        const file = {
          title: document.title.replace('.docx', '.pdf'),
          fileName: document.title,
          data: pdfFile.toString('base64')
        }
        logger('info', ['convert-docx-to-pdf', `Converted ${fileName} to ${file.title}`])
        await deleteFile(fileName)
        resolve(file)
      }
    })
  })
}
