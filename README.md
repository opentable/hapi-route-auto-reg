#Hapi route auto-registration
[![Build Status](https://travis-ci.org/opentable/hapi-route-auto-reg.png?branch=master)](https://travis-ci.org/opentable/hapi-route-auto-reg) [![NPM version](https://badge.fury.io/js/hapi-route-auto-reg.png)](http://badge.fury.io/js/hapi-route-auto-reg) ![Dependencies](https://david-dm.org/opentable/hapi-route-auto-reg.png)

Automatically scans the directory and registers the routes it finds within

installation:

```npm install hapi-route-auto-reg```

usage:

```
var hapi = require("hapi");

var server = Hapi.createServer('127.0.0.1', 3000, {});

// hapi <= 7.x
server.pack.register([
...
// hapi v8.x
server.register([
  {
    register: require("hapi-route-auto-reg"),
    options: {
      directory: './path/to/routes'
    }
  }], function(err){
    if(err) {
      throw err;
    }
    
    server.start(function(){
      server.log('server started...');
    });
});

```

Scans the given directory for .js files which export a method ```.routes(plugin)``` and invokes them.

The routes files should look like this:

```
module.exports.routes = function(server){
    server.route([
        {
            method: 'GET',
            path: '/my/test/route',
            config: {
                handler: function(request, reply) {
                    ...
                }
            }
        }
    ]);
}
```
