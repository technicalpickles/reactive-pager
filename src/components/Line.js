const React = require("react")
const {Text} = require("ink")

const Line = ({text}) => {
	// need to force this to not be falsy
	if (text === '') {
		text = ' '
	}
	return <Text>{text}</Text>
}

module.exports = Line
