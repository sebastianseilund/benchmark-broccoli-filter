var Promise = require('rsvp').Promise;
var broccoli = require('broccoli');

measure('First build', firstBuild)
    .then(measure.bind(null, 'Rebuilds', rebuilds))
    .catch(function(e) {
        console.error(e);
    });


function measure(name, initializer) {
    console.log(name);

    var opts = initializer();
    var promise = opts.initial ? opts.initial() : Promise.resolve();
    var times = []

    for (var i = 0; i < 100; i++) {
        promise = promise.then(function() {
            var s = Date.now();
            return opts.iterator()
                .then(function() {
                    var t = Date.now() - s;
                    console.log(t)
                    times.push(t);
                    return new Promise(function(resolve) {
                        setTimeout(resolve, 100);
                    })
                })
        })
    }

    return promise.then(function() {
        var average = Math.round(times.reduce(function(sum, t) {
            return sum + t;
        }, 0) / times.length);
        console.log('Average: '+average);
        console.log('-------------------------');
    })
}


function firstBuild() {
    return {
        iterator: function() {
            var builder = getBuilder()
            return builder.build()
        }
    };
}

function rebuilds() {
    var builder = getBuilder()
    return {
        initial: function() {
            return builder.build();
        },
        iterator: function() {
            return builder.build()
        }
    }
}

function getBuilder() {
    delete require.cache[require.resolve('./Brocfile')];
    var tree = require('./Brocfile');
    return new broccoli.Builder(tree)
}
