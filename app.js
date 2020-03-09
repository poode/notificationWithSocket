const logger = require('morgan');

const { app, io, server, express, port } = require('./bin/www');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const eventRouter = require('./routes/topics');
const signalRouter = require('./routes/signals');
const subscripeRouter = require('./routes/subscribtion');

app.use(logger('dev'));
app.use(express.json());

app.use((req, res, next) => {
  res.locals.io = io;
  next();
});

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/topics', eventRouter);
app.use('/signals', signalRouter);
app.use('/subscribe', subscripeRouter);

app.use('*', (req, res, next) => {
  next({ message: 'NOT_FOUND', status: 404 });
});

app.use((err, req, res, next) => {
  if(!err.status) {
    process.exit(0);
  }
  res.status(err.status).json({ message: err.message, status: err.status });
});

server.listen(port, () => console.log(`server is up an runing on http://localhost:${port}`));
