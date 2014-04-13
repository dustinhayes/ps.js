var ps = (function() {

    var ps = {},
        events = {},

        _splitStr = function(str) {
            return str.split(', ');
        };

    ps.publish = function (eventNames, data, context) {
        var publish = function (event) {
                var fn;

                event = events[event];

                if (! event)
                    return;

                for (fn in event)
                    if ((data) instanceof Array)
                        event[fn].apply(context, data);
                    else
                        event[fn].call(context, data);
            };

        if (typeof data === 'string')
            data = _splitStr(data);

        eventNames = _splitStr(eventNames);
        eventNames.forEach(publish);
    };

    ps.subscribe = function (eventNames, fnName, fn) {
        var addEvent = function (event) {
                if (events[event])
                    return;

                events[event] = {};
            },
            bindFns = function(event) {
                var newFn;

                event = events[event];

                if (typeof fnName === 'object')
                    for ( newFn in fnName )
                        event[newFn] = fnName[newFn];
                else
                    event[fnName] = fn;
            };

        if (! fnName || typeof fnName === 'function')
            throw new Error('Expected a string as the ' +
                'second parameter: Recieved ' + typeof fnName);

        eventNames = _splitStr(eventNames);
        eventNames.forEach(addEvent);
        eventNames.forEach(bindFns);
    };

    ps.unsubscribe = function (eventNames, fnNames) {
        var unbindFns = function(event) {
                var deleteEach = function(fnName) {
                        delete events[event][fnName];
                    },
                    fns;

                if (! events[event])
                    return;

                if (fnNames) {
                    fns = _splitStr(fnNames);
                    fns.forEach(deleteEach);
                }
                else
                    delete events[event];
            };

        eventNames = _splitStr(eventNames);
        eventNames.forEach(unbindFns);
    };

    return ps;
}());