ps.js
=====

A lightweight pubsub implementation

=====

ps.subscribe('evt', 'fnName', fn);

ps.subscribe('evt1, evt2', 'fnName', fn);

ps.subscribe('evt1, evt2', {
    fn1: fn1,
    fn2: fn2
});

ps.subscribe('evt1', {
    fn1: fn1,
    fn2: fn2
});



ps.publish('evt', 'arg1');

ps.publish('evt1, evt2', 'arg1, arg2');

ps.publish('evt1', [arg1, arg2]);

ps.publish('evt1', {
    key1: val1,
    key2: val2
});



ps.unsubscribe('evt');

ps.unsubscribe('evt1, evt2');

ps.unsubscribe('evt1', 'fnName');

ps.unsubscribe('evt1', 'fnName1, fnName2');