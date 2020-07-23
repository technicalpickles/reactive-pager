React = require("react")
ink = require("ink")
const PropTypes = require('prop-types');
const {Text, Color} = require('ink');

App = ({name, dimensions}) => (
	<>
	<ink.Text>Hi <ink.Color green>{name}</ink.Color></ink.Text>
	<ink.Text>{dimensions.height}x{dimensions.width}</ink.Text>
	</>
)

App.propTypes = {
	name: PropTypes.string,
	dimensions: PropTypes.shape({
		height: PropTypes.number,
		width: PropTypes.number
	})
};

App.defaultProps = {
	name: 'Stranger'
};

module.exports = App
