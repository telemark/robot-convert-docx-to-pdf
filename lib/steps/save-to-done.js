'use strict'

const saveFile = require('../save-file')
const logger = require('../logger')
const config = require('../../config')

module.exports = data => {
  return new Promise(async (resolve, reject) => {
    logger('info', ['save-to-done', data._id])
    const fileName = `${config.DONE_DIRECTORY_PATH}/${data._id}.json`
    await saveFile({filePath: fileName, data: JSON.stringify(data, null, 2)})

    resolve(data)
  })
}
