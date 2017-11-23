var fs = require('fs');


const TOTAL_FILES = 680;

var results = [];
for (let x = 1; x <= TOTAL_FILES; x++) {
    let fname = __dirname + '/book1/' + x + '.xml';

    console.log('reading ' + fname);
    let data = fs.readFileSync(fname, 'utf8');

    results.push(data);
}

fs.writeFileSync(__dirname + '/book1.json', JSON.stringify(results));
