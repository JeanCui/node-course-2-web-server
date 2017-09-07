const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

app.use((req,res,next)=>{
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`
  console.log(log);
  fs.appendFile('server.log',log+'\n',(err)=>{
    console.log('unable to append to server.log');
  });
  next();
});

// app.use((req,res,next)=>{
//   res.render('maintanese.hbs');
// });

app.use(express.static(__dirname+'/public'));


hbs.registerHelper('getCurrentYear', ()=>{
  return new Date().getFullYear();
});
hbs.registerHelper('screamIt',(text)=>{
  return text.toUpperCase();
});
 app.get('/', (req, res)=>{
  //  res.send('<h1>Hello Express!</h1>');
  res.render('home.hbs',{
    pageTitle: 'Home Page',
    welcomeMsg: 'Welcome to my dummy dummy website'
  });
 });

app.get('/about', (req,res)=>{
  // res.send('About Page');
  res.render('about.hbs', {
    pageTitle: 'About Page'
  });
});

app.get('/bad',(req,res)=>{
  res.send({
    error:'bad page'
  });
})
app.listen(3000,()=>{
  console.log('Server is up on 3000');
});
