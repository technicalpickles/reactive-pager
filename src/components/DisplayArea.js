const React = require("react")

const Line = require("./Line")

const DisplayArea = ({lines, widthOffset, heightOffset, width, height}) => {

	const relevantLines = []
	for (let i = 0; i < height && i < lines.length; i++) {
		let index = i + heightOffset
		let line = lines[index]
		if (!line) continue

		relevantLines.push(<Line key={i} width={width} widthOffset={widthOffset} text={line}/>)
	}

	return (
		<>
			{relevantLines}
		</>
	)
}

module.exports = DisplayArea
