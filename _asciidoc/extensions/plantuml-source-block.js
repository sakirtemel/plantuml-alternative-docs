const plantumlEncoder = require('plantuml-encoder')

module.exports = function (registry) {
    registry.block(function () {
        const self = this
        self.named('plantuml')
        self.onContext('listing')
        self.process(function (parent, reader) {
            const lines = reader.getLines()

            const codeBlock = self.createBlock(parent, 'listing', lines, { style: "source", language: "plantuml" }).convert()

            const imagePath = plantumlEncoder.encode(lines.join("\n"))
            const imageBlock = `<img loading="lazy" src="https://plantuml.com/plantuml/pmg/${imagePath}"/>`

            const html = `<div class="plantuml-diagram">${codeBlock} ${imageBlock}</div>`
            return self.createBlock(parent, 'pass', html, {}, {})
        })
    })
}
