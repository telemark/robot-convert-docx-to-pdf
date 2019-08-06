const convertToPdf = require('../convert-to-pdf')

module.exports = async data => {
  const jobs = data.documents.map(document => !document.file ? document : document.file)
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
      await next()
    } else {
      return data
    }
  }

  const result = await next()
  return result
}
