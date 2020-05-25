// function to print message to console
function printMessage(username, badgeCount, points) {
    const message = `${username} has ${badgeCount} total bagde(s) and ${points} points in Javascript.`
    console.log(message)
}

const https = require('https');

function getUserName(username) {
    /* The 'http' object 'request' is created in order to connect to API and carry out the GET request */
    const request = https.get(`https://teamtreehouse.com/${username}.json`, (res) => {
        // console.dir(res.statusCode)
        console.log('statusCode:', res.statusCode);
        // console.log('headers:', res.headers);
        let body = ""

        /* Node.js system 'data' event is emitted and a chunk of data is retrieved (implies an 'end' event as seen below) */
        res.on('data', (d) => {
            body += d.toString();
            // process.stdout.write(d);
        });
    
         /* Node.js system 'end' event occurs when an the 'data' event has completed and all data has been retrieved */
        res.on('end', () => {
            // console.log(body)
            // console.log(typeof body)

            /* The the ('body') data is parsed from a string into a JSON object for use */
            const result = JSON.parse(body)
            const {name, badgeCount, points} = {name: result.name, badgeCount: result.badges.length, points: result.points.total}
            printMessage(name, badgeCount, points)
        })
    
         /* Node.js system 'error' event occurs at various encounters of errors */
        res.on('error', (e) => {
            console.error(e);
        })
    });
}

/* 'process' is a global object within Node.js, allows for capturing command line arguments via 'argv' property */
const users = process.argv.slice(2)
users.forEach(getUserName)