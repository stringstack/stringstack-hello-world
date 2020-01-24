# StringStack Hello, World!

This application serves as an example of how to build a real production web service with StringStack (and Daemonix). 


# Organization

The parts of this code are broken up into these major sections:

- app.js : Where StringStack is initialized.
- server.js : Where we start running our code. Daemonix will instantiate and run the App class generated from app.js.
- logger.js : A way to funnel all StringStack and Daemonix logs into a single log facility.
- .editorconfig : A config file supported by most popular IDEs that will configure auto-formatting and some other things
that will help you author code more easily that will match your code style standards. Optional, but a good idea.
- .eslintrc.json : You should have uniform standards for all your code. We use ESLint here, but you can use anything you
want as long as you actually use it. Optional, but a good idea.
- .gitignore : Typical .gitignore file for Node.js projects.
- config.json : This is where we are storing our config for this example app. You can put config anywhere you want. It
is up to you to get your config data, and put it into teh NConf instance StringStack provides. See lib/setup to see one
way to do it.
- package.json/package-lock.json : Fairly standard package.json file. We just add the correct dependencies for what we 
need. We are using some StringStack provided wrapper components, such as @stringstack/express, but you could use 
ExpressJS on your own in lib/express and not use the StringStack wrapper. 
- README.md : This file. 
- lib/core : This is the core business logic for the service.
- lib/express : This is where we configure ExpressJS.
- lib/setup : This is where we populate our setup object.
- test : This is where all our test-driven development tests are defined. We used Mocha, but you can use anything you 
want. It is optional, but you SHOULD really do test-driven development.

# Typical Pattern for implementing REST endpoints 

This is how we organize routes at BlueRival. You can do it however you want, but this pattern is a nice balance between
separation of concerns and useless abstraction. The goal is to isolate transport knowledge from business logic. That way
you could add other transports transparently to your code. You could add JSON RPC, or Socket.IO, RabbitMQ, etc., and 
all your business logic stays the same.

To add another REST endpoint:

1. Build transport independent business logic for the new method in your business logic code and related unit tests. 
This code should return enough information that any transport can handle response data or error state, BUT this code
must be transport independent. In other words, don't pass the request and response objects to this code.

1. Create a route in lib/express/routes. If need be, add a new component in routes, or add the route to an existing
component in routes. This code must only be concerned with translating HTTP REST to/from the lib/core business logic.
The code here must hide all transport specific details from the business logic.
 
1. If you added a new component to lib/express/routes, make sure to add a deps.get() to lib/express/index to ensure
that new route component is loaded.

 

# To run the demo

Run all tests:

```bash
$ npm install 
$ npm test
```


Run the api and make a sample API call.

Terminal 1:
```bash
$ npm install
$ npm start
```

Termainl 2:
```bash
$ curl --location --request GET 'http://localhost:8000/'
```
