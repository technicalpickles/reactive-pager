#!/usr/bin/env node
const React = require('react')
const ink = require('ink')
const meow = require('meow')
const fs = require('fs')
const tty = require('tty')

const App = require('./src/components/App')

const cli = meow(`
  Usage
    $ reactive-pager <path>

  Examples
    $ reactive-pager foo.txt
    Hello, Jane
`)

const path = cli.input[0]

// FIXME duped in app.js
// const enterAltScreenCommand = '\x1b[?1049h'
// const leaveAltScreenCommand = '\x1b[?1049l'
// process.stdout.write(enterAltScreenCommand)
// process.on('exit', () => {
//   process.stdout.write(leaveAltScreenCommand)
// })

let stream
if (path === '-' || !process.stdin.isTTY) {
  stream = process.stdin
  process.stdin = new tty.ReadStream(fs.openSync('/dev/tty', 'r'))
  console.log(require('util').inspect(process.stdin))
  process.stdin.setRawMode(true)
} else {
  stream = fs.createReadStream(path)
}

const props = {
  path: path,
  stream: stream
}

const app = React.createElement(App, props)
ink.render(app)
