# passport-google-oidc

[Passport](https://www.passportjs.org/) strategy for authenticating with
[Google](https://www.google.com/) using [OpenID Connect](https://www.passportjs.org/features/openid-connect/).

This module lets you authenticate using Google in your Node.js applications.
By plugging into Passport, Sign In with Google can be easily and unobtrusively
integrated into any application or framework that supports
[Connect](https://github.com/senchalabs/connect#readme)-style middleware,
including [Express](https://expressjs.com/).

<div align="center">

:seedling: [Tutorial](https://www.passportjs.org/tutorials/google/?utm_source=github&utm_medium=referral&utm_campaign=passport-google-oidc&utm_content=nav-tutorial) •
:heart: [Sponsors](https://www.passportjs.org/sponsors/?utm_source=github&utm_medium=referral&utm_campaign=passport-google-oidc&utm_content=nav-sponsors)

</div>

<div align="right">
  <sup>Developed by <a href="#authors">Jared Hanson</a>.</sub>
</div>

## Install

```sh
$ npm install passport-google-oidc
```

## Usage

#### Register Application

The Google strategy authenticates users using their Google account.  Before your
application can make use of Google's authentication system, you must first
[register](https://support.google.com/cloud/answer/6158849) your app to use
OAuth 2.0 with Google APIs.  Once registered, a client ID and secret will be
issued which are used by Google to identify your app.

#### Configure Strategy

Once you've [registered your application](#register-application), the strategy
needs to be configured with your application's client ID and secret, along with
its OAuth 2.0 redirect endpoint.

The strategy takes a `verify` function as an argument, which accepts `issuer`
and `profile` as arguments.  `issuer` is set to `https://accounts.google.com`,
indicating that the user used Google to log in.  `profile` contains the user's
[profile information](https://www.passportjs.org/reference/normalized-profile/)
stored in their Google account.  When authenticating a user, this strategy uses
the OpenID Connect protocol to obtain this information via a sequence of
redirects and API requests to Google.

The `verify` function is responsible for determining the user to which the
Google account belongs.  In cases where the account is logging in for the
first time, a new user record is typically created automatically.  On subsequent
logins, the existing user record will be found via its relation to the Google
account.

Because the `verify` function is supplied by the application, the app is free to
use any database of its choosing.  The example below illustrates usage of a SQL
database.

```js
var GoogleStrategy = require('passport-google-oidc');

passport.use(new GoogleStrategy({
    clientID: process.env['GOOGLE_CLIENT_ID'],
    clientSecret: process.env['GOOGLE_CLIENT_SECRET'],
    callbackURL: 'https://www.example.com/oauth2/redirect/google'
  },
  function verify(issuer, profile, cb) {
    db.get('SELECT * FROM federated_credentials WHERE provider = ? AND subject = ?', [
      issuer,
      profile.id
    ], function(err, cred) {
      if (err) { return cb(err); }
      
      if (!cred) {
        // The account at Google has not logged in to this app before.  Create a
        // new user record and associate it with the Google account.
        db.run('INSERT INTO users (name) VALUES (?)', [
          profile.displayName
        ], function(err) {
          if (err) { return cb(err); }
          
          var id = this.lastID;
          db.run('INSERT INTO federated_credentials (user_id, provider, subject) VALUES (?, ?, ?)', [
            id,
            issuer,
            profile.id
          ], function(err) {
            if (err) { return cb(err); }
            
            var user = {
              id: id,
              name: profile.displayName
            };
            return cb(null, user);
          });
        });
      } else {
        // The account at Google has previously logged in to the app.  Get the
        // user record associated with the Google account and log the user in.
        db.get('SELECT * FROM users WHERE id = ?', [ cred.user_id ], function(err, user) {
          if (err) { return cb(err); }
          if (!user) { return cb(null, false); }
          return cb(null, user);
        });
      }
    });
  }
));
```

#### Define Routes

Two routes are needed in order to allow users to log in with their Google
account.  The first route redirects the user to the Google, where they will
authenticate:

```js
app.get('/login/google', passport.authenticate('google'));
```

The second route processes the authentication response and logs the user in,
after Google redirects the user back to the app:

```js
app.get('/oauth2/redirect/google',
  passport.authenticate('google', { failureRedirect: '/login', failureMessage: true }),
  function(req, res) {
    res.redirect('/');
  });
```

## Documentation

* [Using OAuth 2.0 to Access Google APIs](https://developers.google.com/identity/protocols/oauth2/)

  Official Google documentation on how to use OAuth 2.0 to access Google APIs.

## Examples

* [todos-express-google](https://github.com/passport/todos-express-google)

  Illustrates how to use the Google strategy within an Express application.  For
  developers new to Passport and getting started, a [tutorial](https://www.passportjs.org/tutorials/google/)
  is available.

## Related Packages

* [passport-google-oauth20](https://www.passportjs.org/packages/passport-google-oauth20/)

  Passport strategy for authenticating with Google using OAuth 2.0.

## Authors

- [Jared Hanson](https://www.jaredhanson.me/) { [![WWW](https://raw.githubusercontent.com/jaredhanson/jaredhanson/master/images/globe-12x12.svg)](https://www.jaredhanson.me/) [![Facebook](https://raw.githubusercontent.com/jaredhanson/jaredhanson/master/images/facebook-12x12.svg)](https://www.facebook.com/jaredhanson) [![LinkedIn](https://raw.githubusercontent.com/jaredhanson/jaredhanson/master/images/linkedin-12x12.svg)](https://www.linkedin.com/in/jaredhanson) [![Twitter](https://raw.githubusercontent.com/jaredhanson/jaredhanson/master/images/twitter-12x12.svg)](https://twitter.com/jaredhanson) [![GitHub](https://raw.githubusercontent.com/jaredhanson/jaredhanson/master/images/github-12x12.svg)](https://github.com/jaredhanson) }

## License

[The MIT License](http://opensource.org/licenses/MIT)

Copyright (c) 2021-2023 Jared Hanson
