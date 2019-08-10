const convertToPdf = require('../convert-to-pdf')
const logger = require('../logger')

module.exports = async data => {
  const jobs = data.documents.map(document => !document.file ? document : document.file)
  logger('info', ['steps', 'convert-docx-to-pdf', 'start', 'jobs', jobs.length])
  let counter = 0
  const next = async () => {
    if (jobs.length > 0) {
      const document = jobs.shift()
      if (data.documents[counter].file) {
        data.documents[counter].file = await convertToPdf(document)
      } else {
        data.documents[counter] = await convertToPdf(document)
      }
      counter++
      logger('info', ['steps', 'convert-docx-to-pdf', 'jobs done', counter])
      await next()
    } else {
      return data
    }
  }

  const result = await next()
  logger('info', ['steps', 'convert-docx-to-pdf', 'finished', 'jobs done', counter])
  return result
}
