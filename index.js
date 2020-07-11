const path = require("path")
const newman = require("newman")
const async = require("async")

const PARALLELCOUNT = 2

const PARAMS = {
    //collection: path.join(__dirname, '/your/collection/file/path/here.json'),
    collection: '/your/collection/file/path/here.json',
    reporters: 'cli'
}

const paralelCollectionRun = (done) => {
    newman.run(PARAMS, done)
}

let commands = []

for (let i = 0; i < PARALLELCOUNT; i++) {
    commands.push(paralelCollectionRun)
}

async.parallel(commands, (error, results) => {
        error && console.error('error', error)
        results.forEach( (result) => {
            let fails = result.run.failures
            console.info(fails.length ? JSON.stringify(fails.failures, null, 2) : ` ${result.collection.name} finish`
            )
        })
    }
)
