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


const path = "/Users/technicalpickles/.gitconfig"

fs.readFile(path, 'utf8', function (err, data) {
  if (err) {
    return console.log(err);
  }

	const props = {
		contents: data
	}

	const app = React.createElement(App, props)
	ink.render(app)
});
