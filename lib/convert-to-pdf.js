const uuid = require('uuid')
const unoconv = require('lib-unoconv')
const config = require('../config')
const deleteFile = require('./delete-file')
const saveFile = require('./save-file')
const logger = require('./logger')

module.exports = async document => {
  logger('info', ['convert-to-pdf', document.title])
  if (document.data !== '') {
    const docx = Buffer.from(document.data, 'base64')
    const fileName = `${config.TEMP_DIRECTORY_PATH}/${uuid()}.docx`
    await saveFile({ filePath: fileName, data: docx })
    return new Promise((resolve, reject) => {
      unoconv.convert(fileName, 'pdf', { port: '2002' }, async (error, pdfFile) => {
        if (error) {
          logger('error', ['convert-to-pdf', error])
          await deleteFile(fileName)
          reject(error)
        } else {
          if (document.title) {
            document.title = document.title.replace('.docx', '.pdf')
          }
          document.data = pdfFile.toString('base64')
          logger('info', ['convert-to-pdf', `Converted ${fileName} to ${document.title}`])
          await deleteFile(fileName)
          resolve(document)
        }
      })
    })
  } else {
    logger('error', ['convert-to-pdf', `Missing data field`])
    throw new Error('document.data is empty')
  }
}
