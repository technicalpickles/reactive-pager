#!/usr/bin/env node
const React = require('react')
const ink = require('ink')
const meow = require('meow')
const fs = require('fs')
const readline = require('readline')

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
const enterAltScreenCommand = '\x1b[?1049h'
const leaveAltScreenCommand = '\x1b[?1049l'
process.stdout.write(enterAltScreenCommand)
process.on('exit', () => {
  process.stdout.write(leaveAltScreenCommand)
})

const stream = fs.createReadStream(path)
const rl = readline.createInterface({
  input: stream,
  terminal: false
})

const lines = []
rl.on('line', (line) => {
  lines.push(line)
})

rl.on('close', () => {
  const props = {
    path: path,
    lines: lines
  }

  const app = React.createElement(App, props)
  ink.render(app)
})
