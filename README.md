# passport-google-oidc

[Passport](https://www.passportjs.org/) strategy for authenticating with
[Google](https://www.google.com/) using OpenID Connect.

This module lets you authenticate using Google in your Node.js applications.
By plugging into Passport, Google authentication can be easily and
unobtrusively integrated into any application or framework that supports
[Connect](https://github.com/senchalabs/connect#readme)-style middleware,
including [Express](https://expressjs.com/).

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
issued which are used by Google to identify your app.  To register, complete the
following steps:

1. Go to the [Google Cloud Platform console](https://console.cloud.google.com/).

2. From the projects list, select a project or create a new one.

3. Navigate to the [APIs & Services](https://console.cloud.google.com/apis) page
and select [Credentials](https://console.cloud.google.com/apis/credentials).

4. If you have an existing application, it will be listed under **OAuth 2.0
Client IDs**.  Click **Edit OAuth client** to obtain the client ID and secret,
and proceed to [configure the strategy](#configure-strategy).  Otherwise,
continue.

5. If you have not already done so, [configure](https://support.google.com/cloud/answer/10311615)
the [OAuth consent screen](https://console.cloud.google.com/apis/credentials/consent).
Select **External** to make your application available to any user with a Google
account.  Complete the app registration process by entering the app name,
support email, and developer contact information.

6. Click **Create Credentials**, then select **OAuth client ID**.

7. Select **Web application** as **Application type**.

8. Click **Add URI** under **Authorized Redirect URIs**.  Enter the URL of your
application's OAuth 2.0 redirect endpoint.  If you are using the example app,
enter `http://localhost:3000/oauth2/redirect`.

9. Click **Create** to create the OAuth client.  The following screen will
display your client ID and secret.  Proceed to [configure the strategy](#configure-strategy).

#### Configure Strategy

#### Define Routes



Refer to [Using OAuth 2.0 to Access Google APIs](https://developers.google.com/identity/protocols/oauth2/)
for more information on integrating your application with Google APIs using
OAuth 2.0 and OpenID Connect.

## License

[The MIT License](http://opensource.org/licenses/MIT)

Copyright (c) 2021 Jared Hanson <[https://www.jaredhanson.me/](https://www.jaredhanson.me/)>
