const React = require("react")
const {useState, useEffect} = React
const PropTypes = require('prop-types')
const {Text, useStdout, useInput} = require('ink')

const currentDimensions = (stdout) => {
	return { height: stdout.columns, width: stdout.rows }
}

const App = ({contents}) => {
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

	return (
		<>
			<Text>{contents}</Text>
			<Text>{dimensions.height}x{dimensions.width}</Text>
		</>
		)
}

App.propTypes = {
	path: PropTypes.string.isRequired,
}

App.defaultProps = {
}

module.exports = App
