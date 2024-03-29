var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var emailRouter = require('./routes/email');
var meetingRouter = require('./routes/meeting');
var path = require('path');

const router = {
    configure: (app) => {

        //app.use('/', indexRouter);
        app.use('/api/v1/users', usersRouter);
        app.use('/api/v1/email', emailRouter);
        app.use('/api/v1/meeting', meetingRouter);

        /* GET React App */
        app.use(function (req, res, next) {
            res.sendFile(path.join(__dirname, 'public', 'app.html'));
        });

        // // catch 404 and forward to error handler
        // app.use(function(req, res, next) {
        //   next(createError(404));
        // });

        // error handler
        app.use(function (err, req, res, next) {
            // set locals, only providing error in development
            res.locals.message = err.message;
            res.locals.error = req.app.get('env') === 'development' ? err : {};

            // render the error page
            res.status(err.status || 500);
            res.render('error');
        });
    }
}

module.exports = router;