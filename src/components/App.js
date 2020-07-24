const React = require("react")
const PropTypes = require('prop-types');
const {Text, useStdout} = require('ink');


const currentDimensions = (stdout) => {
	return { height: stdout.columns, width: stdout.rows }
}

const App = (name) => {

	const {stdout} = useStdout()

	const [dimensions, setDimensions] = React.useState(currentDimensions(stdout))

	React.useEffect(() => {
		stdout.on('resize', () => {
			setDimensions(currentDimensions(stdout))
		});
	})

	return (
		<Text>{dimensions.height}x{dimensions.width}</Text>
		)
}

App.propTypes = {
	name: PropTypes.string,
};

App.defaultProps = {
	name: 'Stranger'
};

module.exports = App
