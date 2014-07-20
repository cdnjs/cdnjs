Ext.define('KitchenSink.view.binding.TwoWayFormulasModel', {
    extend: 'Ext.app.ViewModel',

    alias: 'viewmodel.binding-two-way-formulas',

    formulas: {
        age: {
            get: function (get) {
                return this.getAge(get('birthDate'));
            },

            set: function (age) {
                var date = this.getData().birthDate,
                    now = new Date();

                if (!date) {
                    date = Ext.Date.add(now, Ext.Date.YEAR, -age);
                } else {
                    date = new Date(now.getFullYear() - age, date.getMonth(), date.getDate());
                    if (this.getAge(date) !== age) {
                        date = new Date(now.getFullYear() - age - 1, date.getMonth(), date.getDate());
                    }
                }

                this.set('birthDate', date);
            }
        },

        fullName: {
            get: function (get) {
                var ret = get('firstName') || '',
                    last = get('lastName');

                if (last) {
                    ret += ' ' +  last;
                }

                return ret;
            },

            // By providing the set method "fullName" is two-way bindable.
            set: function (value) {
                var space = value.indexOf(' '),
                    split = (space < 0) ? value.length : space;

                this.set({
                    firstName: value.substring(0, split),
                    lastName: value.substring(split + 1)
                });
            }
        }
    },

    getAge: function (date) {
        var now = new Date(),
            age, birth;

        if (date) {
            age = now.getFullYear() - date.getFullYear();
            now = now.getMonth() * 100 + now.getDate();
            birth = date.getMonth() * 100 + date.getDate();
            if (now < birth) {
                --age;
            }
        }
        return age || 0;
    }
});
