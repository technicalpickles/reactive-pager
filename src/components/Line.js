const React = require('react')
const PropTypes = require('prop-types')
const { Text } = require('ink')

const Line = ({ width, widthOffset, text }) => {
  // return early for empty lines
  if (text === '') {
    return <Text> </Text> // note, we need to make this non-empty to make sure it renders
  }

  // replace tabs with spaces for counting
  // TODO is there a ink way of doing this?
  text = text.replace('\t', '        ')

  // trim beginning
  // truncate after terminal width
  text = text.substring(widthOffset, width)

  return <Text>{text}</Text>
}

Line.propTypes = {
  text: PropTypes.string.isRequired,
  width: PropTypes.number.isRequired,
  widthOffset: PropTypes.number.isRequired
}

module.exports = Line
