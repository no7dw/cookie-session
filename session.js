var session = require('express-session')

const app = require('express')();

// Use the session middleware
app.use(session({ secret: 'session-secret', cookie: { maxAge: 3000 }}))

let sess = {}
// Access the session as req.session
app.get('/', function(req, res, next) {
  sess = req.session
  if(!sess.views) sess.views = 0
  sess.views++
  res.write('<p>views: ' + sess.views + '</p>')
  res.write('<p>expires in: ' + (sess.cookie.maxAge / 1000) + 's</p>')
  res.end()
})
app.listen(3001, function () {
  console.log('session app listening on port 3001!')
})