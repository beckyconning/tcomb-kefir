var Tcomb = require('tcomb'),
    Kefir = require('kefir'),
    TcombKefir = require('./src/tcomb-kefir'),
    readline = require('readline'),
    greet = Tcomb.func(Tcomb.Str, TcombKefir.stream(Tcomb.Str))
        .of(function(greeting) {
            var rlInterface = readline.createInterface({ input: process.stdin, output: process.stdout }),
                question = "What would you like to be called? ",
                ask = function(callback) { rlInterface.question(question, callback) },
                answer = Kefir.fromCallback(ask),
                append = function(name) { return greeting + " " + name + "!"; };

            return answer.map(append).onValue(rlInterface.close.bind(rlInterface));
        });

greet("Hi there").onValue(console.log.bind(console));
