import fs from 'fs'

const outputDirectory = 'docs/modules/ROOT/pages/'
const sourceDirectory = 'docs_from_alphadoc/'

// ensure the output directory exists
if (!fs.existsSync(outputDirectory)){
    fs.mkdirSync(outputDirectory, { recursive: true });
}

// clean up the pages before start
let existingFiles = []
try {
  existingFiles = await fs.readdirSync(outputDirectory)
} catch (error) {
  console.info(error)
}
for (const filename of existingFiles) {
  await fs.unlink(`${outputDirectory}${filename}`)
}

// process each page
for (let filename of await fs.readdirSync(sourceDirectory)){
    if (filename === '.gitkeep'){
        continue
    }

    let content = fs.readFileSync(`${sourceDirectory}${filename}`, 'utf8')

    // Step1: use source code blocks for plantuml parts
    content = content.replaceAll('<plantuml>', '[source, plantuml]\n----').replaceAll('</plantuml>', '----')

    fs.writeFileSync(`${outputDirectory}${filename}`, content)
    console.info(`Processed ${filename}`)
}
