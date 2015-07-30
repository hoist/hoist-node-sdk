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
  organisation: 'xxx', 
  application: 'xxx',  
  connector: 'xxx',    
  bucketKey: 'xxx',    
  returnUrl: 'xxx'     
}).then(function(url) {
  reply.redirect(url);
});
```

## Listening to events
```js
Hoist.on("EVENTNAME", function(event) {
  //event.payload has the data
});
```

## Raising events
```js
Hoist.raise("EVENTNAME", {});
```
