const React = require('react')
const PropTypes = require('prop-types')
const { Text } = require('ink')

const Line = ({ width, widthOffset, text }) => {
  // replace tabs with spaces for counting
  // TODO is there a ink way of doing this?
  text = text.replace('\t', '        ')

  // truncate after terminal width
  if (text.length > width) {
    text = text.substring(widthOffset, width)
  }

  // need to force this to not be falsy
  if (text === '') {
    text = ' '
  }

  return <Text>{text}</Text>
}

Line.propTypes = {
  text: PropTypes.string.isRequired,
  width: PropTypes.number.isRequired,
  widthOffset: PropTypes.number.isRequired
}

module.exports = Line
