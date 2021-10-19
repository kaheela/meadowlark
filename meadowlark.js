const express = require('express')
const app = express()
const port = process.env.PORT || 3001
const expressHandlebars = require('express-handlebars')
// configure Handlebars view engine
app.engine('handlebars', expressHandlebars())
app.set('view engine', 'handlebars')
app.use(express.static(__dirname + '/public'))
/*
Bind application-level middleware to an instance of the app object by using the app.use() and app.METHOD() functions (e.g. "GET"),
where METHOD is the HTTP method of the request that the middleware function handles (such as GET, PUT, or POST) in lowercase.
This example shows a middleware function with no mount path. The function is executed every time the app receives a request. */

// custom 500 page
app.use((err, req, res, next) => {
  console.error(err.message)
  res.type('text/plain')
  res.status(500)
  res.render('500')
})

app.get('/', (req, res) => {
  res.render('home');
})

app.get('/about', (req, res) => {
  res.render('about')
})

const fortunes = [//data array for 'fortunes' dynamic data example
"Conquer your fears or they will conquer you.",
"Rivers need springs.",
"Do not fear what you don't know.",
"You will have a pleasant surprise.",
"Whenever possible, keep it simple.",
]

app.get('/fortunes', (req, res) => {
  const randomFortune = fortunes[Math.floor(Math.random()*fortunes.length)]
  res.render('fortunes', { fortune: randomFortune })
})

// custom 404 page (put AFTER route declarations!)
app.use((req, res) => {
  res.type('text/plain')
  res.status(404)
  res.render('404')
})

app.listen(port, () => console.log(
`Express started on http://localhost:${port}; ` +
`press Ctrl-C to terminate.`))
