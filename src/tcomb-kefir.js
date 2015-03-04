'use strict';

var T        = require('tcomb'),
    Kefir    = require('kefir'),
    Property = T.irreducible('Property', function (o) { return o instanceof Kefir.Property; }),
    Stream   = T.irreducible('Stream', function (o) { return o instanceof Kefir.Stream; }),

    // `stream` combinator, makes stream values typesafe
    stream = function (type) {
        var ThisStream = function (x) { return Stream(x).map(type); };

        if (!T.Type.is(type)) {
            throw new TypeError('Incorrect `type` argument supplied to `stream` combinator');
        }

        ThisStream.meta = { kind: 'stream', type: type };

        ThisStream.is = function (x) {
          return Stream.is(x) && x.type === type;
        };

        return ThisStream;
    },

    // `property` combinator, makes property values typesafe
    property = function (type) {
        var ThisProperty = function (x) { return Property(x).map(type); };

        if (!T.Type.is(type)) {
            throw new TypeError('Incorrect `type` argument supplied to `property` combinator');
        }

        ThisProperty.meta = { kind: 'property', type: type };

        ThisProperty.is = function (x) {
          return Property.is(x) && x.type === type;
        };

        return ThisProperty;
    };

module.exports = { stream: stream, property: property };
