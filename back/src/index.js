// const init = require("./config/socket")

const init = require("./config/socket")

const run = () => {
    try {
        init()
    } catch (e) {
        console.log('error')
    }
}

run()