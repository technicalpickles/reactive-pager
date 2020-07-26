const React = require("react")
const {useState, useEffect, useLayoutEffect} = React
const PropTypes = require('prop-types')
const {Text, useStdout, useInput} = require('ink')

const DisplayArea = require("./DisplayArea")
const StatusBar = require("./StatusBar")

const currentDimensions = (stdout) => {
	return { height: stdout.rows, width: stdout.columns }
}

// const enterAltScreenCommand = '\x1b[?1049h';
// const leaveAltScreenCommand = '\x1b[?1049l';

const App = ({path, lines}) => {
	const {stdout} = useStdout()

	const [dimensions, setDimensions] = useState(currentDimensions(stdout))
	const [widthOffset, setWidthOffset] = useState(0)
	const [heightOffset, setHeightOffset] = useState(0)

	useLayoutEffect(() => {
		// stdout.write(enterAltScreenCommand)
	})

	useEffect(() => {
		stdout.once('resize', () => {
			setDimensions(currentDimensions(stdout))
		});

	})

	const adjustHeightOffset = (newHeightOffset) => {
		if (newHeightOffset > lines.length - dimensions.height) { // prevent going to far down
			setHeightOffset(lines.length - dimensions.height)
		} else if (newHeightOffset < 0) { // prevent going too far back
			setHeightOffset(0)
		} else { // adjust as normal
			setHeightOffset(newHeightOffset)
		}
	}

	useInput((input, key) => {
		if (key.downArrow) {
			adjustHeightOffset(heightOffset + 1)
			return
		}

		if (key.upArrow) {
			adjustHeightOffset(heightOffset - 1)
			return
		}

		// page down
		if (input == '\u001b[6~' || input == ' ') {
			adjustHeightOffset(heightOffset + dimensions.height - 2)
			return
		}

		// page up
		if (input == '\u001b[5~' || input == 'b') {
			adjustHeightOffset(heightOffset - dimensions.height + 1)
		}

		if (input === 'q') {
			process.exit()
		}
	})

	const displayHeight = dimensions.height - 3
	const displayWidth = dimensions.width
	return (
		<>
			<Text bold>{path}</Text>
			<DisplayArea lines={lines} width={displayWidth} widthOffset={widthOffset} height={displayHeight} heightOffset={heightOffset}/>
			<StatusBar lines={lines} dimensions={dimensions} heightOffset={heightOffset} widthOffset={widthOffset} />
		</>
		)
}

App.propTypes = {
	lines: PropTypes.arrayOf(PropTypes.string).isRequired,
}

App.defaultProps = {
}

module.exports = App
