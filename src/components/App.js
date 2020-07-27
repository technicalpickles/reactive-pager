const React = require('react')
const { useState, useEffect } = React
const PropTypes = require('prop-types')
const { Text, useStdout, useInput } = require('ink')
const readline = require('readline')

const DisplayArea = require('./DisplayArea')
const StatusBar = require('./StatusBar')

const currentDimensions = (stdout) => {
  return { height: stdout.rows, width: stdout.columns }
}

// const enterAltScreenCommand = '\x1b[?1049h';
// const leaveAltScreenCommand = '\x1b[?1049l';

const App = ({ path, stream }) => {
  const { stdout } = useStdout()
  const [lines, setLines] = useState([])

  const [dimensions, setDimensions] = useState(currentDimensions(stdout))
  const [widthOffset, setWidthOffset] = useState(0)
  const [heightOffset, setHeightOffset] = useState(0)

  useEffect(() => {
    const rl = readline.createInterface({
      input: stream,
      terminal: false
    })

    rl.on('line', (line) => setLines(l => [...l, line]))
  }, [])

  useEffect(() => {
    stdout.on('resize', () => {
      setDimensions(currentDimensions(stdout))
    })
  }, [])

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
    if (key.pageDown || input === ' ') {
      adjustHeightOffset(heightOffset + dimensions.height - 2)
      return
    }

    // page up
    if (key.pageUp || input === 'b') {
      adjustHeightOffset(heightOffset - dimensions.height + 1)
    }

    if (input === 'q') {
      process.exit()
    }

    if (key.leftArrow) {
      if (widthOffset > 0) {
        setWidthOffset(widthOffset - 1)
      }
    }

    if (key.rightArrow) {
      setWidthOffset(widthOffset + 1)
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
  stream: PropTypes.object.isRequired,
  path: PropTypes.string.isRequired
}

App.defaultProps = {
}

module.exports = App
