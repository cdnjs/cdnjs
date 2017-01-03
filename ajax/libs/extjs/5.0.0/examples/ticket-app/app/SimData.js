Ext.define('Ticket.EntitySimlet', {
    extend: 'Ext.ux.ajax.JsonSimlet',
    alias: 'simlet.entity',
    
    doPost: function(ctx) {
        var result = this.callParent(arguments),
            o = this.processData(Ext.decode(ctx.xhr.body)),
            item = this.getById(this.data, o.id, true),
            key;
        
        for (key in o) {
            item[key] = o[key];
        }
        
        result.responseText = Ext.encode(item);
        return result;
    },
    
    processData: Ext.identityFn,

    getData: function (ctx) {
        var params = ctx.params;

        if ('id' in params) {
            return this.getById(this.data, params.id);
        }

        delete this.currentOrder;
        return this.callParent(arguments);
    },
    
    getById: function(data, id) {
        var len = data.length,
            i, item;
        
        for (i = 0; i < len; ++i) {
            item = data[i];
            if (item.id === id) {
                return item;
            }
        }
        return null;
    }
});

Ext.define('Ticket.SimData', {
    requires: [
        'Ext.ux.ajax.*'
    ],

    singleton: true,

    dateFormat: 'Y-m-d\\TH:i:s\\Z',

    words: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi. Nam liber tempor cum soluta nobis eleifend option congue nihil imperdiet doming id quod mazim placerat facer possim assum. Typi non habent claritatem insitam; est usus legentis in iis qui facit eorum claritatem. Investigationes demonstraverunt lectores legere me lius quod ii legunt saepius. Claritas est etiam processus dynamicus, qui sequitur mutationem consuetudium lectorum. Mirum est notare quam littera gothica, quam nunc putamus parum claram, anteposuerit litterarum formas humanitatis per seacula quarta decima et quinta decima. Eodem modo typi, qui nunc nobis videntur parum clari, fiant sollemnes in futurum.'.replace(/[,\.]/g, '').split(' '),

    /**
     * We have our own "random" method because we need consistency (for testing).
     */
    random: (function () {
        var modulus = 0x80000000, // 2^31
            multiplier = 1664525,
            increment = 1013904223,
            seed = 1103515245;
        // simple LCG

        return function (min, max) {
            seed = (multiplier * seed + increment) % modulus;
            var x = seed / (modulus - 1);  // [0, 1]

            return Math.floor(x * (max - min + 1) + min);
        };
    }()),

    sentence: function (min, max) {
        var length = this.random(Ext.isDefined(min) ? min : 10, max || 30),
            words = this.words,
            description = Ext.String.capitalize(words[this.random(0, words.length - 1)]);

        while (length--) {
            description += ' ';
            description += words[this.random(0, words.length - 1)];
        }

        description += '.';
        return description;
    },

    paragraph: function (count) {
        var length = count || this.random(2, 5),
            ret = '';

        while (length--) {
            if (ret) {
                ret += ' ';
            }
            ret += this.sentence();
        }

        return ret;
    },

    essay: function (count) {
        var length = count || this.random(1, 4),
            ret = '';

        while (length--) {
            if (ret) {
                ret += '\n\n';
            }
            ret += this.paragraph();
        }

        return ret;
    },

    minDate: +Ext.Date.subtract(new Date(), Ext.Date.MONTH, 6),
    maxDate: (+new Date()),

    MILLIDAY: 60 * 60 * 24 * 1000,

    randomDate: function (maxDays) {
        maxDays = maxDays || 180;
        var time =  1000 * this.random(1, maxDays * this.MILLIDAY / 1000);
        return new Date(this.minDate + time);
    },

    nextDate: function (date, scale) {
        scale = scale || (2 / 3);
        var time = date.getTime(),
            remaining = this.maxDate - time;

        return new Date(time + 1000 * this.random(1, remaining * scale / 1000));
    },

    init: function () {
        var me = this,
            dateFormat = me.dateFormat,
            comments = [],
            organizations = [],
            projects = [],
            tickets = [],
            users = [],
            groups = [],
            groupNames = ['Admins', 'Development', 'QA', 'Support', 'Sales'],
            groupsByUserId = {},
            usersByGroupId = {},
            usersByKey = {},
            data = {
                Sencha: {
                    SDK: 'Don,Alex,Ben,Evan,Kevin,Nige,Phil,Pierre,Ross,Tommy',
                    IT: 'Len,Ian,Mike,Ryan'
                }
            };

        Ext.Object.each(data, function (organizationName, projectsUsers) {
            var organizationId = organizations.length + 1;
            organizations.push({
                id: organizationId,
                name: organizationName
            });

            Ext.each(groupNames, function (name) {
                groups.push({
                    id: groups.length + 1,
                    name: name,
                    organizationId: organizationId
                })
            });

            Ext.Object.each(projectsUsers, function (projectName, projectUsers) {
                var projectId = projects.length + 1,
                    firstUserId = users.length + 1,
                    project = {
                        id: projectId,
                        name: projectName,
                        organizationId: 1,
                        leadId: firstUserId
                    },
                    projectDate = me.randomDate(20);

                projects.push(project);

                Ext.Array.forEach(projectUsers.split(','), function (userName) {
                    var id = users.length + 1,
                        user = {
                            id: id,
                            name: userName,
                            projectId: projectId,
                            organizationId: organizationId
                        };
                        
                    users.push(user);
                    usersByKey[id] = user;
                });

                for (var count = me.random(100, 200); count-- > 0; ) {
                    projectDate = me.nextDate(projectDate, 0.03);

                    var ticketId = tickets.length + 1,
                        date = projectDate,
                        modified =  Ext.Date.add(date, Ext.Date.MINUTE, me.random(30, 7200)), // 5 days
                        creatorId = me.random(firstUserId, users.length),
                        assigneeId = me.random(firstUserId, users.length);

                        
                    tickets.push({
                        id: ticketId,
                        title: me.sentence(5, 15),
                        description: me.essay(),
                        projectId: project.id,
                        creatorId: creatorId,
                        creator: Ext.apply({}, usersByKey[creatorId]),
                        assigneeId: assigneeId,
                        assignee: Ext.apply({}, usersByKey[assigneeId]),
                        created: Ext.Date.format(date, dateFormat),
                        modified: Ext.Date.format(modified, dateFormat),
                        status: me.random(1, 3)
                    });

                    for (var n = me.random(0, 3); n-- > 0; ) {
                        date = me.nextDate(date);
                        
                        var userId = me.random(firstUserId, users.length);

                        comments.push({
                            id: comments.length + 1,
                            text: me.paragraph(),
                            ticketId: ticketId,
                            userId: userId,
                            user: Ext.apply({}, usersByKey[userId]),
                            created: Ext.Date.format(date, dateFormat)
                        });
                    }
                }
            });
            
            Ext.Array.forEach(users, function(user) {
                var all = groupsByUserId[user.id] = [],
                    totalGroups = groups.length,
                    numGroups = me.random(1, 3),
                    group;
                    
                while (all.length < numGroups) {
                    group = groups[me.random(0, totalGroups - 1)];
                    if (Ext.Array.indexOf(all, group) === -1) {
                        all.push(group);
                        (usersByGroupId[group.id] || (usersByGroupId[group.id] = [])).push(user);
                    }
                }
            });
        });
        function makeSim (data) {
            return {
                type: 'entity',
                data: data
            };
        }
        function makeMatrixFilter (members) {
            var map = Ext.Array.toMap(members, 'id');
            return function (r) {
                return r.id in map;
            }
        }

        Ext.ux.ajax.SimManager.init().
            register({
                '/organization': makeSim(organizations),

                '/group': Ext.apply({
                    processFilters: function(filters) {
                        // User/Groups is a Many-to-many so Group does not have a field
                        // to get groups by userId so we have to look in our internal
                        // structure to provide this.
                        Ext.each(filters, function (filter, index) {
                            if (filter.property === 'userId') {
                                filters[index] = makeMatrixFilter(groupsByUserId[filter.value]);
                            }
                        });

                        return this.self.prototype.processFilters.call(this, filters);
                    }
                }, makeSim(groups)),

                '/project': makeSim(projects),

                '/comment': makeSim(comments),

                '/ticket': Ext.apply({
                    processData: function(data) {
                        data.modified = Ext.Date.format(new Date(), dateFormat);
                        return data;
                    },
                    
                    processFilters: function(filters) {
                        var status = Ext.Array.findBy(filters, function(filter) {
                            return filter.property === 'status';
                        });
                        
                        var assignee = Ext.Array.findBy(filters, function(filter) {
                            return filter.property === 'assigneeId';
                        });
                        
                        if (status && status.value === -1) {
                            Ext.Array.remove(filters, status);
                        }
                        
                        if (assignee) {
                            assignee.exactMatch = true;
                        }
                        
                        return filters;
                    }
                }, makeSim(tickets)),

                '/ticketStatusSummary': {
                    type: 'json',
                    data: function(ctx) {
                        var project = Ext.decode(ctx.params.filter)[0].value,
                            data = [],
                            totals = {};
                        
                        Ext.Array.forEach(tickets, function(ticket) {
                            var status;
                            if (ticket.projectId === project) {
                                status = ticket.status;
                                if (!totals.hasOwnProperty(status)) {
                                    totals[status] = 0;
                                }
                                totals[status] += 1;
                            }
                        });
                        Ext.Object.each(totals, function(key, value) {
                            data.push({
                                status: key,
                                total: value
                            });
                        });
                        return data;
                    }
                },

                '/ticketOpenSummary': {
                    type: 'json',
                    data: function(ctx) {
                        var project = Ext.decode(ctx.params.filter)[0].value,
                            eDate = Ext.Date,
                            now = eDate.clearTime(new Date(), true),
                            min = eDate.subtract(now, eDate.MONTH, 1),
                            data = [],
                            totals = {};
                        
                        Ext.Array.forEach(tickets, function(ticket) {
                            var created, key;
                           
                            if (ticket.projectId === project) {
                                created = Ext.Date.parse(ticket.created, 'c');
                                if (created >= min) {
                                    key = Ext.Date.format(created, 'Y-m-d');
                                    if (!totals.hasOwnProperty(key)) {
                                        totals[key] = 0;
                                    }
                                    totals[key] += 1;
                                }
                            }
                        });
                        Ext.Object.each(totals, function(key, value) {
                            data.push({
                                id: project + key,
                                date: key,
                                total: value
                            });
                        });
                        return data;
                    }
                },

                '/user': Ext.apply({
                    processFilters: function(filters) {
                        // User/Groups is a Many-to-many so User does not have a field
                        // to get users by groupId so we have to look in our internal
                        // structure to provide this.
                        Ext.each(filters, function (filter, index) {
                            if (filter.property === 'groupId') {
                                filters[index] = makeMatrixFilter(usersByGroupId[filter.value]);
                            }
                        });

                        return this.self.prototype.processFilters.call(this, filters);
                    }
                }, makeSim(users)),

                '/authenticate': {
                    type: 'json',
                    data: function(ctx) {
                        var userName = ctx.params.username,
                            user = Ext.Array.findBy(users, function(item) {
                                return item.name === userName;
                            }) || users[0];
                            
                        return Ext.apply({}, user);
                    }
                }
            });
    }
});
