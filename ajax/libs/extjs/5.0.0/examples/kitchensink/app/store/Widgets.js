Ext.define('KitchenSink.store.Widgets', {
    extend: 'Ext.data.ArrayStore',
    model: 'KitchenSink.model.Widget',
    data: (function() {
        var result = [],
            i,
            generateSequence = function(count, min, max) {
                var j,
                    sequence = [];

                if (count == null) {
                    count = 20;
                }
                if (min == null) {
                    min = -10;
                }
                if (max == null) {
                    max = 10;
                }
                for (j = 0; j < count; j++) {
                    sequence.push(Ext.Number.randomInt(min, max));
                }
                return sequence;
            };

        for (i = 0; i < 8; i++) {
            result.push([i + 1, 'Record ' + (i + 1), Ext.Number.randomInt(0, 100) / 100, generateSequence(), generateSequence(), generateSequence(), generateSequence(20, 1, 10), generateSequence(4, 10, 20), generateSequence(), generateSequence(20, -1, 1)]);
        }
        return result;
    })()
});