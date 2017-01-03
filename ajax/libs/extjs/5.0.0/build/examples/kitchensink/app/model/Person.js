Ext.define('KitchenSink.model.Person', {
    extend: 'KitchenSink.model.Base',
    fields: ['firstName', 'lastName', 'age', 'favoriteColor'],
    statics: {
        generateData: (function() {
            var lasts = ['Jones', 'Smith', 'Lee', 'Wilson', 'Black', 'Williams', 'Lewis', 'Johnson', 'Foot', 'Little', 'Vee', 'Train', 'Hot', 'Mutt'],
                firsts = ['Fred', 'Julie', 'Bill', 'Ted', 'Jack', 'John', 'Mark', 'Mike', 'Chris', 'Bob', 'Travis', 'Kelly', 'Sara'],
                colors = ['Red', 'Green', 'Blue'];

            function getRandom(array) {
                var index = Ext.Number.randomInt(0, array.length - 1);
                return array[index];
            }

            function getName(seen) {
                var name = {
                    first: getRandom(firsts),
                    last: getRandom(lasts)
                };

                if (seen[name.first + name.last]) {
                    return getName(seen);
                } else {
                    return name;
                }
            }

            return function(total, adults, children) {
                var out = [],
                    seenNames = {},
                    adultsUndef = adults === undefined,
                    childrenUndef = children === undefined,
                    name;

                if (!adultsUndef && !childrenUndef) {
                    total = adults + children;
                } else {
                    // We rely on total now
                    total = total || 15;
                    if (adultsUndef && childrenUndef) {
                        adults = Ext.Number.randomInt(Math.floor(total * 0.25), Math.floor(total * 0.75));
                        children = total - adults;
                    } else if (adultsUndef) {
                        adults = total - children;
                    } else {
                        children = total - adults;
                    }
                }

                for (i = 0; i < total; ++i) {
                    name = getName(seenNames);
                    out.push({
                        firstName: name.first,
                        lastName: name.last,
                        age: i >= adults ? Ext.Number.randomInt(0, 17) : Ext.Number.randomInt(18, 100),
                        favoriteColor: getRandom(colors)
                    });
                }

                return out;
            };
            })()
    }
});