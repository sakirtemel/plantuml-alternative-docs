import fs from 'fs'

fs.writeFileSync('./docs_from_alphadoc/timestamp.txt', (new Date()).toISOString())
