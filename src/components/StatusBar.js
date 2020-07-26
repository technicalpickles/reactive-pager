const React = require('react')
const PropTypes = require('prop-types')
const { Text } = require('ink')

const StatusBar = ({ dimensions, lines, widthOffset, heightOffset }) => {
  return (
    <Text bold background="white" color="green">
      [Terminal: {dimensions.width}x{dimensions.height}]
      [Lines: {lines.length}]
      [Offset: {widthOffset}x{heightOffset}]
    </Text>
  )
}

StatusBar.propTypes = {
  dimensions: PropTypes.shape({
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired
  }).isRequired,
  heightOffset: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  lines: PropTypes.arrayOf(PropTypes.string).isRequired,
  widthOffset: PropTypes.number.isRequired
}

module.exports = StatusBar
