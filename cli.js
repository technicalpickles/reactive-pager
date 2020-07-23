#!/usr/bin/env node
const ink = require("ink")
const meow = require("meow")

App = require("./src/components/App")

const cli = meow(`
	Usage
		$ reactive-pager

	Options
		--name  Your name

	Examples
		$ reactive-pager --name=Jane
		Hello, Jane
`);

const props = {
	...cli.flags,
	dimensions: {
		height: process.stdout.columns,
		width: process.stdout.rows
	}
}
ink.render(React.createElement(App, props))
