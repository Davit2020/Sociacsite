const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose=require("mongoose");
const http = require('http');
require("dotenv").config()



 // mongoconnect
mongoose.connect(process.env.mongoLink, { 
  useNewUrlParser:true,
  useUnifiedTopology:true
})
const db=mongoose.connection
db.on('error', console.error.bind(console,"MongoDB connection error"))
db.on('connected',()=>{
  console.log('connected')
})


const indexRouter = require('./routes/IndexRouter');
const authRouter = require('./routes/AuthRouter');

const app = express();
const server = http.createServer(app);

const io = require('socket.io')(server)
io.on('connection',(socket)=>{
  console.log('new user connectid')
  console.log(socket.id)

  socket.on('New user',(data)=>{
    console.log('New user',data)
  })
  socket.on('Logout',(data)=>{
    console.log('Logout',data)
  })
})

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/auth', authRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = {app,server};
