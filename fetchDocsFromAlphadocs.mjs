import fs from 'fs'

fs.writeFileSync('./docs_from_alphadocs/timestamp.txt', (new Date()).toISOString())
