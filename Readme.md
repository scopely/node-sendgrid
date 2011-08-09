# node-sendgrid

node-sendgird is a Node.JS project that wraps the API calls for Sendgrid service
It is written using CoffeScript http://jashkenas.github.com/coffee-script,


## How to Install

    npm install node-sendgrid

## How to use

First, require `node-sendgrid`:

```js
var sendgrid = require('node-sendgrid');
```

Next, create a SendGrid client object using your SendGrid account credentials:

```js
var client = new sendgrid.SendGridClient('[SENDGRID ACCOUNT]','[SENDGRID PASSWORD]');
```

Finally, start calling the api methods using the created object:

```js
client.api.unsubscribe.get({}, function(err, result) {
  console.log(err, result)
})
```

For more thorough examples, look at the `examples/` directory.

## License

(The MIT License)

Copyright (c) 2011 Gabriel Teodoru &lt;gabriel@scopely.com&gt;

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
