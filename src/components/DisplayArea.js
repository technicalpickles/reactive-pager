const React = require('react')
const PropTypes = require('prop-types')

const Line = require('./Line')

const DisplayArea = ({ lines, widthOffset, heightOffset, width, height }) => {
  const relevantLines = []

  /*
  * Doc=60 lines
  * Screen=40
  *
  * down should start on line 2 (index 1), and go to line 41
  * at line 20, it should stop going down
  */
  for (let i = 0; i < height; i++) {
    const lineOffset = i + heightOffset
    if (lineOffset < lines.length) { // last line
      const line = lines[lineOffset]
      relevantLines.push(<Line key={i} width={width} widthOffset={widthOffset} text={line}/>)
    }
  }

  return (
    <>
      {relevantLines}
    </>
  )
}

DisplayArea.propTypes = {
  lines: PropTypes.arrayOf(PropTypes.string).isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  widthOffset: PropTypes.number.isRequired,
  heightOffset: PropTypes.number.isRequired
}

module.exports = DisplayArea
