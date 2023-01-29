import fs from 'fs'

const files = fs.readdirSync('docs_from_alphadoc/')

for (let filename of files){
    if (filename === '.gitkeep'){
        continue
    }

    let content = fs.readFileSync(`docs_from_alphadoc/${filename}`, 'utf8')

    // Step1: use source code blocks for plantuml parts
    content = content.replaceAll('<plantuml>', '[source, plantuml]\n----').replaceAll('</plantuml>', '----')

    fs.writeFileSync(`docs/${filename}`, content)
    console.info(`Processed ${filename}`)
}
