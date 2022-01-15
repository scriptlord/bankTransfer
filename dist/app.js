"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_errors_1 = __importDefault(require("http-errors"));
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const morgan_1 = __importDefault(require("morgan"));
const mongoConnect_1 = require("./connection/mongoConnect");
const index_1 = __importDefault(require("./routes/index"));
const users_1 = __importDefault(require("./routes/users"));
const balance_1 = __importDefault(require("./routes/balance"));
const transaction_1 = __importDefault(require("./routes/transaction"));
var app = (0, express_1.default)();
// connect();
console.log('env', process.env.NODE_ENV);
if (process.env.NODE_ENV === 'test') {
    (0, mongoConnect_1.memoryTestDB)();
}
else {
    (0, mongoConnect_1.connect)();
}
app.use((0, morgan_1.default)('dev'));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.static(path_1.default.join(__dirname, 'public')));
//Routes
app.use('/', index_1.default);
app.use('/users', users_1.default);
app.use('/balance', balance_1.default);
app.use('/transfer', transaction_1.default);
// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next((0, http_errors_1.default)(404));
});
// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    // render the error page
    res.status(err.status || 500);
    res.render('error');
});
exports.default = app;
//# sourceMappingURL=app.js.map