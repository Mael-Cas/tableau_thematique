const { readFile} = require('fs')
const { promisify } = require('util')
const readFileAsync = promisify(readFile)
const READ_OPTIONS = {encoding: 'UTF-8'}

module.exports = async () => {
    return await readFileAsync('api/page/index.html', READ_OPTIONS)
}
