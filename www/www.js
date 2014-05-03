var express = require('express'),
    app = express()

app.use(express.static('./game'))

app.listen(5000)
console.log('Play @ http://localhost:5000/')
