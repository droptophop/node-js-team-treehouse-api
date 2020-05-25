// function to print message to console
function printMessage(username, badgeCount, points) {
    const message = `${username} has ${badgeCount} total bagde(s) and ${points} points in Javascript.`
    console.log(message)
}

/* require 'https' protocol */
const https = require('https');

/* require 'http' protocol for retrieval of status codes */
const http = require('http');
function printError(error) {
    console.error(error.message)
}

function getUserName(username) {
    /* Handling potential errors */
    try {
        /* The 'http' object 'request' is created in order to connect to API and carry out the GET request */
        const request = https.get(`https://teamtreehouse.com/${username}.json`, (res) => {
            const status = console.log('statusCode:', res.statusCode);
            // console.log('headers:', res.headers);

            /* Handling status codes */
            if(res.statusCode == 200) {
                let body = ""
        
                /* Node.js system 'data' event is emitted and a chunk of data is retrieved (implies an 'end' event as seen below) */
                res.on('data', (d) => {
                    body += d.toString();
                    // process.stdout.write(d);
                });
            
                 /* Node.js system 'end' event occurs when an the 'data' event has completed and all data has been retrieved */
                res.on('end', () => {

                    /* Handling potential errors */
                    try {
                        // console.log(body)
                        // console.log(typeof body)
    
                        /* The the ('body') data is parsed from a string into a JSON object for use */
                        const result = JSON.parse(body)
                        const {name, badgeCount, points} = {name: result.name, badgeCount: result.badges.length, points: result.points.total}
                        printMessage(name, badgeCount, points)
                    } catch (e) {
                        printError(e)
                    }
                });
            } else {
                const message = `There was an error getting the profile for ${username} (${http.STATUS_CODES[res.statusCode]})`
                const statusCodeError = new Error(message)
                printError(statusCodeError)
            }
        });
        
        /* Node.js system 'error' event occurs at various encounters of errors */
        request.on('error', printError)

    } catch (e) {
        printError(e)
    }
}

module.exports.getUserName = getUserName