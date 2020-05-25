const profile = require('./profile.js');

/* 'process' is a global object within Node.js, allows for capturing command line arguments via 'argv' property */
const users = process.argv.slice(2);
users.forEach(profile.getUserName);