const React = require("react")
const {Text} = require('ink')

const StatusBar = ({dimensions, lines, widthOffset, heightOffset}) => {
	return (
		<Text bold background="white" color="green">
			[Terminal: {dimensions.width}x{dimensions.height}]
			[Lines: {lines.length}]
			[Offset: {widthOffset}x{heightOffset}]
		</Text>
	)

}

module.exports = StatusBar
