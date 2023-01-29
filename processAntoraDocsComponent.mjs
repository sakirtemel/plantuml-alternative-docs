import fs from 'fs'

const outputDirectory = 'docs/modules/ROOT/pages/'

// clean up the pages before start
for (const filename of await fs.readdirSync(outputDirectory)) {
  await fs.unlink(`${outputDirectory}${filename}`)
}

// process each page
for (let filename of await fs.readdirSync('docs_from_alphadoc/')){
    if (filename === '.gitkeep'){
        continue
    }

    let content = fs.readFileSync(`docs_from_alphadoc/${filename}`, 'utf8')

    // Step1: use source code blocks for plantuml parts
    content = content.replaceAll('<plantuml>', '[source, plantuml]\n----').replaceAll('</plantuml>', '----')

    fs.writeFileSync(`${outputDirectory}${filename}`, content)
    console.info(`Processed ${filename}`)
}
