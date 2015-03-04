tcomb-kefir
-----------

`tcomb-kefir` provides [Tcomb](https://github.com/gcanti/tcomb) type combinators for
[Kefir](https://pozadi.github.io/kefir/) streams and properties.

This allows you to create streams and properties that have typesafe values.

## Example

Here we create a typesafe function `greet`. It takes a string `Tcomb.Str` and returns a stream of
strings `TcombKefir.stream(Tcomb.Str)`.

```javascript
var Tcomb = require('tcomb'),
    Kefir = require('kefir'),
    TcombKefir = require('./src/tcomb-kefir'),
    readline = require('readline'),
    rlInterface = readline.createInterface({ input: process.stdin, output: process.stdout }),
    greet = Tcomb.func(Tcomb.Str, TcombKefir.stream(Tcomb.Str))
        .of(function(greeting) {
            var question = "What would you like to be called? ",
                ask = function(callback) { rlInterface.question(question, callback) },
                answer = Kefir.fromCallback(ask),
                append = function(name) { return greeting + " " + name + "!"; };

            return answer.map(append).onValue(rlInterface.close.bind(rlInterface));
        });

greet("Hi there").onValue(console.log.bind(console));
```
