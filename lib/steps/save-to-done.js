const saveFile = require('../save-file')
const logger = require('../logger')
const config = require('../../config')

module.exports = async data => {
  logger('info', ['save-to-done', data._id])
  const fileName = `${config.DONE_DIRECTORY_PATH}/${data._id}.json`
  await saveFile({ filePath: fileName, data: JSON.stringify(data, null, 2) })

  return data
}
