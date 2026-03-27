const express = require('express');
const passport = require('passport');
const BasicStrategy = require('passport-http').BasicStrategy;
const Users = require('./users.json');
const session = require('express-session');

const getCredential = (user) => {
    let u = Users.find((e) => {
        return e.user.toUpperCase() == user.toUpperCase();
    });
    return u;
};

const verPassword = (pass1, pass2) => {
    return pass1 == pass2;
};

const app = express();


app.use(session({
    resave: false,
    saveUninitialized: false,
    secret: '1111',
    cookie: { secure: false }
}));

app.use(passport.initialize());

passport.use(new BasicStrategy((user, password, done) => {
    console.log('passport.use', user, password);
    let cr = getCredential(user);
    if (!cr) {
        return done(null, false, { message: 'Incorrect username' });
    } else if (!verPassword(cr.password, password)) {
        return done(null, false, { message: 'Incorrect password' });
    } else {
        return done(null, user);
    }
}));

app.get('/login',
    (req, res, next) => {
        console.log('preAuth');
        if (req.session && req.session.logout) {
            req.session.logout = false;
            delete req.headers['authorization'];
        }
        next();
    }, 
    passport.authenticate('basic', { session: false }),
    (req, res) => {
        // Убираем next(), так как он не нужен после res.redirect
        res.redirect('/resource');
    }
);

app.get('/logout', (req, res) => {
    console.log('Logout');
    if (req.session) {
        req.session.logout = true;
        // Очищаем заголовок авторизации
        delete req.headers['authorization'];
    }
    res.redirect('/login');
});

app.get('/resource', 
    passport.authenticate('basic', { session: false }),
    (req, res) => {
        res.send('hello');
    }
);

app.use((req, res) => {
    if (!res.headersSent) {
        console.log('Error 404 for:', req.url);
        res.status(404).send('Ошибка 404');
    }
});

app.use((err, req, res, next) => {
    console.error('Error:', err);
    if (!res.headersSent) {
        if (err.status === 401) {
            res.status(401).send('Authentication required');
        } else {
            res.status(500).send('Internal server error');
        }
    }
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Сервер слушает порт ${PORT}`);
    console.log(`Тестируйте: http://localhost:${PORT}/resource`);
});