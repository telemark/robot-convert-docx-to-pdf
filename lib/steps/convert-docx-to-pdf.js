const convertToPdf = require('../convert-to-pdf')

module.exports = data => {
  return new Promise(async (resolve, reject) => {
    let jobs = data.documents.map(data => data.file)
    let counter = 0

    const next = async () => {
      if (jobs.length > 0) {
        const document = jobs.shift()
        data.documents[counter].file = await convertToPdf(document)
        counter++
        await next()
      } else {
        resolve(data)
      }
    }

    await next()
  })
}
