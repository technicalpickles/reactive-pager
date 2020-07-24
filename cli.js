#!/usr/bin/env node
const React = require("react")
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
}

const app = React.createElement(App, props)
ink.render(app)
