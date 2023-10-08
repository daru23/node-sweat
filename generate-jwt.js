const utils = require("./utils.js");

// Access the command-line arguments
const args = process.argv;
const arg2 = args[2];

if (!arg2) { return; }

const jwt = utils.generateToKen(arg2);
console.log(jwt)
