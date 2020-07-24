const React = require("react")

const Line = require("./Line")

const DisplayArea = ({lines, widthOffset, width, height}) => {

	const relevantLines = []
	for (let i = 0; i < height && i < lines.length; i++) {
		let line = lines[i]

		// replace tabs with spaces for counting
		// TODO is there a ink way of doing this?
		line = line.replace("\t", "        ")

		// truncate after terminal width
		if (line.length > width) {
			line = line.substring(widthOffset, width)
		}

		relevantLines.push(<Line key={i} text={line}/>)
	}

	console.log(`displaying ${relevantLines.length} lines`)

	return (
		<>
			{relevantLines}
		</>
	)
}

module.exports = DisplayArea
