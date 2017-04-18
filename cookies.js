const app = require('express')()
const cookieParser = require('cookie-parser');

app.use(cookieParser());

app.get('/', (req,res)=>{

    // read cookies
    console.log('read req cookies: ',req.cookies) 
    
    res.writeHead(200, {
    'Set-Cookie': 'mycookie=test2',
    'Content-Type': 'text/plain'
      });
    res.end('Hello World\n');

})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})