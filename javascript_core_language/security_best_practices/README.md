# Wired Brain Coffee

This project is a part of a fictional e-commerce application for coffee lovers. It allows users to log in, edit their shipping address, and log out.

It is deliberate vulnerable to demonstrate the following JavaScript security issues:

  - Sensitive data leak caused by a loose comparison bug
  - Code injection vulnerability caused by use of unsafe `eval` function
  - Prototype pollution in the `merge` utility function

# Running the Application

This application requires the Node.js runtime and the npm package manager to run. First, install the required dependencies:

```bash
$ npm install
```

Then, you can start the application by running:

```bash
$ npm start
```

The application listens on `http://localhost:3000`.

# User Credentials

You can use the following user credentials to log in to the application:

| Email                        | Password |
| ---------------------------- | -------- |
| janet@wiredbraincoffee.com   | coldbrew |
| joe@wiredbraincoffee.com     | coldbrew |
| michael@wiredbraincoffee.com | coldbrew |
