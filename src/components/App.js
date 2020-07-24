const React = require("react")
const {useState, useEffect} = React
const PropTypes = require('prop-types')
const {Text, useStdout, useInput} = require('ink')

const DisplayArea = require("./DisplayArea")

const currentDimensions = (stdout) => {
	return { height: stdout.rows, width: stdout.columns }
}

const App = ({lines}) => {
	const {stdout} = useStdout()

	const [dimensions, setDimensions] = useState(currentDimensions(stdout))

	useEffect(() => {
		stdout.once('resize', () => {
			setDimensions(currentDimensions(stdout))
		});
	})

	useInput((input, key) => {
		if (input === 'q') {
			process.exit()
		}
	})

	const displayHeight = dimensions.height - 2
	return (
		<>
			<DisplayArea lines={lines} height={displayHeight}/>
			<Text>{dimensions.width}x{dimensions.height}</Text>
		</>
		)
}

App.propTypes = {
	lines: PropTypes.arrayOf(PropTypes.string).isRequired,
}

App.defaultProps = {
}

module.exports = App
