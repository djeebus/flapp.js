var fs = require('fs');

let books = {}

let dirs = fs.readdirSync(__dirname + '/books/');
for (let dirIndex in dirs) {
    let dirname = dirs[dirIndex]

    if (!dirname.startsWith('book')) {
        continue
    }

    let fulldirname = __dirname + '/books/' + dirname
    let stat = fs.statSync(fulldirname)
    if (!stat.isDirectory()) {
        continue
    }

    books[dirname] = {}

    let files = fs.readdirSync(fulldirname)
    for (let fileIndex in files) {
        let fname = files[fileIndex]
        if (!fname.endsWith('.xml')) {
            continue
        }

        let fullfname = fulldirname + '/' + fname
        let data = fs.readFileSync(fullfname, 'utf-8')
        books[dirname][fname] = data
    }
}

fs.writeFileSync(__dirname + '/books.json', JSON.stringify(books))
