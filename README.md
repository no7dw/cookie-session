# cookies and session

### cookies

同一host, 不同port, cookies 共享 -- 相互影响
cookies response set 了header 后，传到前台，request 后每一次就自己带上header
sever 端reponse 设置 Set-Cookie
```
res.writeHead(200, {
    'Set-Cookie': 'mycookie=test2'})
```
### session

典型用法例子：
login:

```
app.post('/login', function(req, res) {
  User.findOne({ email: req.body.email }, function(err, user) {
    if (!user) {
      res.render('login.jade', { error: 'Invalid email or password.' });
    } else {
      if (req.body.password === user.password) {
        // sets a cookie with the user's info
        req.session.user = user;
        res.redirect('/dashboard');
      } else {
        res.render('login.jade', { error: 'Invalid email or password.' });
      }
    }
  });
});

```

logout:

```
app.get('/logout', function(req, res) {
  req.session.reset();
  res.redirect('/');
});
```

典型用法：例子2：as views counter

Sample:

```
sess = req.session
  if(!sess.views) sess.views = 0
  sess.views++
```

Session 结构
```
 {
  cookie:
   { path: '/',
     _expires: 2017-04-18T13:14:01.977Z,
     originalMaxAge: 3000,
     httpOnly: true },
  views: 2 
}
```

since session if not store persistently, default store in memory, it will lost after restart 
so we have :

 - [koa-redis](https://www.npmjs.com/package/koa-redis)
 - [connect-redis](https://www.npmjs.com/package/connect-redis)


ref:

[all about session](https://stormpath.com/blog/everything-you-ever-wanted-to-know-about-node-dot-js-sessions)

