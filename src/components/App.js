const React = require("react")
const {useState, useEffect} = React
const PropTypes = require('prop-types')
const {Text, useStdout, useInput} = require('ink')

const DisplayArea = require("./DisplayArea")
const StatusBar = require("./StatusBar")

const currentDimensions = (stdout) => {
	return { height: stdout.rows, width: stdout.columns }
}

const App = ({path, lines}) => {
	const {stdout} = useStdout()

	const [dimensions, setDimensions] = useState(currentDimensions(stdout))
	const [widthOffset, setWidthOffset] = useState(0)
	const [heightOffset, setHeightOffset] = useState(0)

	useEffect(() => {
		stdout.once('resize', () => {
			setDimensions(currentDimensions(stdout))
		});
	})


	useInput((input, key) => {
		if (key.downArrow) {
			setHeightOffset(heightOffset + 1)
			return
		} else if (key.upArrow) {
			setHeightOffset(heightOffset - 1)
			return
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
