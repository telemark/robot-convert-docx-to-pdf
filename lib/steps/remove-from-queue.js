const config = require('../../config')
const deleteFile = require('../delete-file')
const logger = require('../logger')

module.exports = async data => {
  logger('info', ['remove-from-queue', data._id])
  const fileName = `${config.QUEUE_DIRECTORY_PATH}/${data._id}.json`
  await deleteFile(fileName)
  return data
}
