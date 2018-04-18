const convertToPdf = require('../convert-to-pdf')

module.exports = data => {
  return new Promise(async (resolve, reject) => {
    let jobs = data.documents.map(document => document.file || document.data)
    let counter = 0

    const next = async () => {
      if (jobs.length > 0) {
        const document = jobs.shift()
        if (data.documents[counter].file) {
          data.documents[counter].file = await convertToPdf(document)
        }
        if (data.documents[counter].data) {
          data.documents[counter].data = await convertToPdf(document)
        }
        counter++
        await next()
      } else {
        resolve(data)
      }
    }

    await next()
  })
}
