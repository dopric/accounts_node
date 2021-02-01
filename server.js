const express = require('express')
const app = express()
const routes = require('./routes')

app.use(express.urlencoded({ extended: true }))
app.use(routes)
app.set('view engine', 'ejs')




app.listen(3000, function() {
	console.log('server is listening to port 3000')
})
