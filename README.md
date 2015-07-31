# hoist-node-sdk
Node.js SDK for Hoist

## Installation

```bash
$ npm install @hoist/node-sdk
```

## Quick Start
```js
var Hoist = require('@hoist/node-sdk');

//Use your API key from the Dashboard of your application
Hoist.setApiKey("xxx-xxx");
```

## Creating Connector Authorization
```js
Hoist.getBounceURL({
  connector: 'xxx',    
  bucketKey: 'xxx', //optional 
  returnUrl: 'xxx'  //optional
}).then(function(url) {
  reply.redirect(url);
});
```
or
```js
Hoist.getBounceURL({
  connector: 'xxx',    
  bucketKey: 'xxx', //optional 
  returnUrl: 'xxx'  //optional
}, function(err, url) {
  reply.redirect(url);
});
```
Use the connector key you set up in the portal. 

### If both the return URL and bucket key *are* set
The user will be authenticated, the token is stored against them, and the user is redirected to the return URL. 

### If the return URL *isn't* set and the bucket key *is* set
The user will see a success screen showing the logo of the service they're connecting to and a success message.

### If the return URL *is* set and the bucket key *isn't* set
The token will be appended to the URL in the querystring of the return URL on redirect.

### If *neither* the return URL or bucket key are set
The user will see a success screen with the logo of the service they're connecting to, and the token that needs to be stored.  

## Listening to events
```js
Hoist.on("EVENTNAME", function(event) {
  //event.payload contains the payload associated with the event
});
```

## Removing event listeners
```js 
Hoist.off("EVENTNAME", function() { });
Hoist.off("EVENTNAME");
```
If you specify the method to remove, any other listener under that event will be retained. If you only specify the eventname, al events with that name will be removed.

## Raising events
```js
Hoist.raise("EVENTNAME", {});
```
