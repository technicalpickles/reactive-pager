#!/usr/bin/env node
const React = require("react")
const ink = require("ink")
const meow = require("meow")
const fs = require("fs")

App = require("./src/components/App")

const cli = meow(`
	Usage
		$ reactive-pager <path>

	Examples
		$ reactive-pager foo.txt
		Hello, Jane
`);


const path = cli.input[0]

// const enterAltScreenCommand = '\x1b[?1049h';
// const leaveAltScreenCommand = '\x1b[?1049l';
// process.stdout.write(enterAltScreenCommand);
// process.on('exit', () => {
//     process.stdout.write(leaveAltScreenCommand);
// });

fs.readFile(path, 'utf8', function (err, data) {
  if (err) {
    return console.log(err);
  }

	const lines = data.split("\n")

	const props = {
		path: path,
		lines: lines
	}

	const app = React.createElement(App, props)
	ink.render(app)
});
