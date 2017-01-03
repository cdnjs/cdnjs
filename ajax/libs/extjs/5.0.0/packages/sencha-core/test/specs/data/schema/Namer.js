describe("Ext.data.schema.Namer", function() {
    
    var Base, Company, Department, User, Group, Ticket, Comment,
        schema, associationNames, entityNames;

    beforeEach(function () {
        schema = Ext.data.Model.schema;
        associationNames = [];
        entityNames = [];
        
        schema.setNamespace('spec.data.namer');
        Base = Ext.define('spec.data.namer.Base', {
            extend: 'Ext.data.Model',

            schema: {
                namespace: 'spec.data.namer'
            }
        });

        Company = Ext.define('spec.data.namer.Company', {
            extend: 'spec.data.namer.Base',

            fields: [ 'name' ]
        });

        Department = Ext.define('spec.data.namer.Department', {
            extend: 'spec.data.namer.Base',

            fields: [
                'name',
                { name: 'companyId', reference: 'Company' },
                { name: 'managerId', reference: 'User', unique: true }
            ],

            manyToMany: [{
                type: 'User',
                relation: 'approved'
            },{
                type: 'User',
                relation: 'qualified'
            }]
        });

        User = Ext.define('spec.data.namer.User', {
            extend: 'spec.data.namer.Base',

            fields: [
                'name',
                { name: 'companyId', reference: 'Company' },
                { name: 'departmentId', reference: 'Department' }
            ],

            manyToMany: '#Group'
        });

        Group = Ext.define('spec.data.namer.Group', {
            extend: 'spec.data.namer.Base',

            fields: [ 'name' ],

            manyToMany: 'User#'
        });

        Ticket = Ext.define('spec.data.namer.Ticket', {
            extend: 'spec.data.namer.Base',

            fields: [
                'description',
                { name: 'creatorId', reference: 'User' },
                { name: 'assigneeId', reference: 'User' }
            ]
        });

        Comment = Ext.define('spec.data.namer.Comment', {
            extend: 'spec.data.namer.Base',

            fields: [
                'name',
                { name: 'ticketId', reference: { parent: 'Ticket' } },
                { name: 'userId', reference: 'User' }
            ]
        });

        schema.eachAssociation(function (name) {
            associationNames.push(name);
        });
        schema.eachEntity(function (name) {
            entityNames.push(name);
        });

        associationNames.sort();
        entityNames.sort();
        
    });
    
    afterEach(function() {
        Ext.Array.forEach(entityNames, function(key) {
            Ext.undefine('spec.data.namer.' + key);
        });
        schema.setNamespace(null);
        schema.clear();
        Base = Company = Department = User = Group = Ticket = Comment = schema = associationNames = entityNames = null;
    });

    //-------------------------------------------------------------------------

    describe("Schema", function() {
        it('should have the right number of associations', function () {
            expect(associationNames.length).toBe(11);
        });

        it('should have the right number of entities', function () {
            expect(entityNames.length).toBe(7);
        });
    });

    //-------------------------------------------------------------------------

    describe("Company", function() {
        describe("departments", function () {
            it('should have the association', function () {
                expect(Company.associations.departments.isRole).toBe(true);
            });

            it('should properly name the association', function () {
                expect(Company.associations.departments.association.name).
                        toBe('CompanyDepartments');
            });

            it('association kind should be many-to-one', function () {
                expect(Company.associations.departments.association.kind).toBe('many-to-one');
            });

            it('association has Company on the right', function () {
                expect(Company.associations.departments.association.right.type).
                        toBe('Company');
            });

            it('association should refer to target type', function () {
                expect(Company.associations.departments.cls).toBe(Department);
                expect(Company.associations.departments.type).toBe('Department');
            });

            it('should have a getter', function () {
                expect(typeof Company.prototype.departments).toBe('function');
            });

            it('should not have a setter', function () {
                expect(Company.prototype.setDepartments).toBe(undefined);
            });
        });

        describe("users", function () {
            it('should have the association', function () {
                expect(Company.associations.users.isRole).toBe(true);
            });

            it('should properly name the users association', function () {
                expect(Company.associations.users.association.name).
                        toBe('CompanyUsers');
            });

            it('users association should be many-to-one', function () {
                expect(Company.associations.users.association.kind).toBe('many-to-one');
            });

            it('users has Company on the right', function () {
                expect(Company.associations.users.association.right.type).
                        toBe('Company');
            });

            it('users association should refer to User', function () {
                expect(Company.associations.users.cls).toBe(User);
                expect(Company.associations.users.type).toBe('User');
            });

            it('should have a users getter', function () {
                expect(typeof Company.prototype.users).toBe('function');
            });

            it('should not have a departments setter', function () {
                expect(Company.prototype.setUsers).toBe(undefined);
            });
        });
    });

    //-------------------------------------------------------------------------

    describe("Department", function() {
        describe("company", function () {
            it('should have the association', function () {
                expect(Department.associations.company.isRole).toBe(true);
            });

            it('should properly name the company association', function () {
                expect(Department.associations.company.association.name).
                        toBe('CompanyDepartments');
            });

            it('company association should be many-to-one', function () {
                expect(Department.associations.company.association.kind).
                        toBe('many-to-one');
            });

            it('company has Department on the left', function () {
                expect(Department.associations.company.association.left.type).
                        toBe('Department');
            });

            it('company association should refer to User', function () {
                expect(Department.associations.company.cls).toBe(Company);
                expect(Department.associations.company.type).toBe('Company');
            });

            it('should have an company getter', function () {
                expect(typeof Department.prototype.getCompany).toBe('function');
            });

            it('should have an company setter', function () {
                expect(typeof Department.prototype.setCompany).toBe('function');
            });
        });

        describe("approvedUsers", function () {
            //----------------------------------------------------
            // manyToMany

            it('should have the association', function () {
                expect(Department.associations.approvedUsers.isRole).toBe(true);
            });

            it('should properly name the approvedUsers association', function () {
                expect(Department.associations.approvedUsers.association.name).
                        toBe('ApprovedDepartmentUsers');
            });

            it('approvedUsers association should be many-to-many', function () {
                expect(Department.associations.approvedUsers.association.kind).
                        toBe('many-to-many');
            });

            it('approvedUsers has Department on the left', function () {
                expect(Department.associations.approvedUsers.association.left.type).
                        toBe('Department');
            });

            it('approvedUsers association should refer to User', function () {
                expect(Department.associations.approvedUsers.cls).toBe(User);
                expect(Department.associations.approvedUsers.type).toBe('User');
            });

            it('should have an approvedUsers getter', function () {
                expect(typeof Department.prototype.approvedUsers).toBe('function');
            });

            it('should not have an approvedUsers setter', function () {
                expect(Department.prototype.setApprovedUsers).toBe(undefined);
            });
        });

        describe("qualifiedUsers", function () {
            //----------------------------------------------------
            // manyToMany

            it('should have the association', function () {
                expect(Department.associations.qualifiedUsers.isRole).toBe(true);
            });

            it('should properly name the qualifiedUsers association', function () {
                expect(Department.associations.qualifiedUsers.association.name).
                        toBe('QualifiedDepartmentUsers');
            });

            it('qualifiedUsers association should be many-to-many', function () {
                expect(Department.associations.qualifiedUsers.association.kind).
                        toBe('many-to-many');
            });

            it('qualifiedUsers has Department on the left', function () {
                expect(Department.associations.qualifiedUsers.association.left.type).
                        toBe('Department');
            });

            it('qualifiedUsers association should refer to User', function () {
                expect(Department.associations.qualifiedUsers.cls).toBe(User);
                expect(Department.associations.qualifiedUsers.type).toBe('User');
            });

            it('should have a qualifiedUsers getter', function () {
                expect(typeof Department.prototype.qualifiedUsers).toBe('function');
            });

            it('should not have a qualifiedUsers setter', function () {
                expect(Department.prototype.setQualifiedUsers).toBe(undefined);
            });
        });

        describe("manager", function () {
            //----------------------------------------------------
            // oneToOne

            it('should have the association', function () {
                expect(Department.associations.manager.isRole).toBe(true);
            });

            it('should properly name the manager association', function () {
                expect(Department.associations.manager.association.name).
                        toBe('UserManagerDepartment');
            });

            it('association should be one-to-one', function () {
                expect(Department.associations.manager.association.kind).
                        toBe('one-to-one');
            });

            it('manager has Department on the left', function () {
                expect(Department.associations.manager.association.left.type).
                        toBe('Department');
            });

            it('manager association should refer to User', function () {
                expect(Department.associations.manager.cls).toBe(User);
                expect(Department.associations.manager.type).toBe('User');
            });

            it('should have a manager getter', function () {
                expect(typeof Department.prototype.getManager).toBe('function');
            });

            it('should have a manager setter', function () {
                expect(typeof Department.prototype.setManager).toBe('function');
            });
        });

        describe("users", function () {
            //----------------------------------------------------
            // manyToOne

            it('should have the association', function () {
                expect(Department.associations.users.isRole).toBe(true);
            });

            it('should properly name the users association', function () {
                expect(Department.associations.users.association.name).
                        toBe('DepartmentUsers');
            });

            it('association should be many-to-one', function () {
                expect(Department.associations.users.association.kind).
                        toBe('many-to-one');
            });

            it('users has Department on the right', function () {
                expect(Department.associations.users.association.right.type).
                        toBe('Department');
            });

            it('users association should refer to User', function () {
                expect(Department.associations.users.cls).toBe(User);
                expect(Department.associations.users.type).toBe('User');
            });

            it('should have a users getter', function () {
                expect(typeof Department.prototype.users).toBe('function');
            });

            it('should not have a users setter', function () {
                expect(Department.prototype.setUsers).toBe(undefined);
            });
        });
    });

    //-------------------------------------------------------------------------

    describe("User", function() {
        describe("company", function() {
            it('should have the association', function () {
                expect(User.associations.company.isRole).toBe(true);
            });

            it('should properly name the association', function () {
                expect(User.associations.company.association.name).
                        toBe('CompanyUsers');
            });

            it('association should be many-to-one', function () {
                expect(User.associations.company.association.kind).
                        toBe('many-to-one');
            });

            it('should have User on the left', function () {
                expect(User.associations.company.association.left.type).
                        toBe('User');
            });

            it('association should refer to proper entity', function () {
                expect(User.associations.company.cls).toBe(Company);
                expect(User.associations.company.type).toBe('Company');
            });

            it('should have a getter', function () {
                expect(typeof User.prototype.getCompany).toBe('function');
            });

            it('should have a setter', function () {
                expect(typeof User.prototype.setCompany).toBe('function');
            });
        });

        describe("assigneeTickets", function() {
            it('should have the association', function () {
                expect(User.associations.assigneeTickets.isRole).toBe(true);
            });

            it('should properly name the association', function () {
                expect(User.associations.assigneeTickets.association.name).
                        toBe('UserAssigneeTickets');
            });

            it('association should be many-to-one', function () {
                expect(User.associations.assigneeTickets.association.kind).
                        toBe('many-to-one');
            });

            it('should have User on the right', function () {
                expect(User.associations.assigneeTickets.association.right.type).
                        toBe('User');
            });

            it('association should refer to proper entity', function () {
                expect(User.associations.assigneeTickets.cls).toBe(Ticket);
                expect(User.associations.assigneeTickets.type).toBe('Ticket');
            });

            it('should have a getter', function () {
                expect(typeof User.prototype.assigneeTickets).toBe('function');
            });

            it('should not have a setter', function () {
                expect(typeof User.prototype.setAssigneeTickets).toBe('undefined');
            });
        });

        describe("creatorTickets", function() {
            it('should have the association', function () {
                expect(User.associations.creatorTickets.isRole).toBe(true);
            });

            it('should properly name the association', function () {
                expect(User.associations.creatorTickets.association.name).
                        toBe('UserCreatorTickets');
            });

            it('association should be many-to-one', function () {
                expect(User.associations.creatorTickets.association.kind).
                        toBe('many-to-one');
            });

            it('should have User on the right', function () {
                expect(User.associations.creatorTickets.association.right.type).
                        toBe('User');
            });

            it('association should refer to proper entity', function () {
                expect(User.associations.creatorTickets.cls).toBe(Ticket);
                expect(User.associations.creatorTickets.type).toBe('Ticket');
            });

            it('should have a getter', function () {
                expect(typeof User.prototype.creatorTickets).toBe('function');
            });

            it('should not have a setter', function () {
                expect(typeof User.prototype.setCreatorTickets).toBe('undefined');
            });
        });

        describe("department", function() {
            it('should have the association', function () {
                expect(User.associations.department.isRole).toBe(true);
            });

            it('should properly name the association', function () {
                expect(User.associations.department.association.name).
                        toBe('DepartmentUsers');
            });

            it('association should be many-to-one', function () {
                expect(User.associations.department.association.kind).
                        toBe('many-to-one');
            });

            it('should have User on the left', function () {
                expect(User.associations.department.association.left.type).
                        toBe('User');
            });

            it('association should refer to proper entity', function () {
                expect(User.associations.department.cls).toBe(Department);
                expect(User.associations.department.type).toBe('Department');
            });

            it('should have a getter', function () {
                expect(typeof User.prototype.getDepartment).toBe('function');
            });

            it('should have a setter', function () {
                expect(typeof User.prototype.setDepartment).toBe('function');
            });
        });

        describe("groups", function() {
            it('should have the association', function () {
                expect(User.associations.groups.isRole).toBe(true);
            });

            it('should properly name the association', function () {
                expect(User.associations.groups.association.name).
                        toBe('UserGroups');
            });

            it('association should be many-to-many', function () {
                expect(User.associations.groups.association.kind).
                        toBe('many-to-many');
            });

            it('should have User on the left', function () {
                expect(User.associations.groups.association.left.type).
                        toBe('User');
            });

            it('association should refer to proper entity', function () {
                expect(User.associations.groups.cls).toBe(Group);
                expect(User.associations.groups.type).toBe('Group');
            });

            it('should have a getter', function () {
                expect(typeof User.prototype.groups).toBe('function');
            });

            it('should not have a setter', function () {
                expect(typeof User.prototype.setGroups).toBe('undefined');
            });
        });

        describe("approvedDepartments", function() {
            it('should have the association', function () {
                expect(User.associations.approvedDepartments.isRole).toBe(true);
            });

            it('should properly name the association', function () {
                expect(User.associations.approvedDepartments.association.name).
                        toBe('ApprovedDepartmentUsers');
            });

            it('association should be many-to-many', function () {
                expect(User.associations.approvedDepartments.association.kind).
                        toBe('many-to-many');
            });

            it('should have User on the right', function () {
                expect(User.associations.approvedDepartments.association.right.type).
                        toBe('User');
            });

            it('association should refer to proper entity', function () {
                expect(User.associations.approvedDepartments.cls).toBe(Department);
                expect(User.associations.approvedDepartments.type).toBe('Department');
            });

            it('should have a getter', function () {
                expect(typeof User.prototype.approvedDepartments).toBe('function');
            });

            it('should not have a setter', function () {
                expect(typeof User.prototype.setApprovedDepartments).toBe('undefined');
            });
        });

        describe("qualifiedDepartments", function() {
            it('should have the association', function () {
                expect(User.associations.qualifiedDepartments.isRole).toBe(true);
            });

            it('should properly name the association', function () {
                expect(User.associations.approvedDepartments.association.name).
                        toBe('ApprovedDepartmentUsers');
            });

            it('association should be many-to-many', function () {
                expect(User.associations.qualifiedDepartments.association.kind).
                        toBe('many-to-many');
            });

            it('should have User on the right', function () {
                expect(User.associations.qualifiedDepartments.association.right.type).
                        toBe('User');
            });

            it('association should refer to proper entity', function () {
                expect(User.associations.qualifiedDepartments.cls).toBe(Department);
                expect(User.associations.qualifiedDepartments.type).toBe('Department');
            });

            it('should have a getter', function () {
                expect(typeof User.prototype.qualifiedDepartments).toBe('function');
            });

            it('should not have a setter', function () {
                expect(typeof User.prototype.setQualifiedDepartments).toBe('undefined');
            });
        });

        describe("managerDepartment", function() {
            it('should have the association', function () {
                expect(User.associations.managerDepartment.isRole).toBe(true);
            });

            it('should properly name the association', function () {
                expect(User.associations.managerDepartment.association.name).
                        toBe('UserManagerDepartment');
            });

            it('association should be one-to-one', function () {
                expect(User.associations.managerDepartment.association.kind).
                        toBe('one-to-one');
            });

            it('should have User on the right', function () {
                expect(User.associations.managerDepartment.association.right.type).
                        toBe('User');
            });

            it('association should refer to proper entity', function () {
                expect(User.associations.managerDepartment.cls).toBe(Department);
                expect(User.associations.managerDepartment.type).toBe('Department');
            });

            it('should have a getter', function () {
                expect(typeof User.prototype.getManagerDepartment).toBe('function');
            });

            it('should have a setter', function () {
                expect(typeof User.prototype.setManagerDepartment).toBe('function');
            });
        });

        describe("comments", function() {
            it('should have the association', function () {
                expect(User.associations.comments.isRole).toBe(true);
            });

            it('should properly name the association', function () {
                expect(User.associations.comments.association.name).
                        toBe('UserComments');
            });

            it('association should be many-to-one', function () {
                expect(User.associations.comments.association.kind).
                        toBe('many-to-one');
            });

            it('should have User on the right', function () {
                expect(User.associations.comments.association.right.type).
                        toBe('User');
            });

            it('association should refer to proper entity', function () {
                expect(User.associations.comments.cls).toBe(Comment);
                expect(User.associations.comments.type).toBe('Comment');
            });

            it('should have a getter', function () {
                expect(typeof User.prototype.comments).toBe('function');
            });

            it('should not have a setter', function () {
                expect(typeof User.prototype.setComments).toBe('undefined');
            });
        });
    });

    //-------------------------------------------------------------------------

    describe("Group", function() {
        describe("users", function() {
            it('should have the association', function () {
                expect(Group.associations.users.isRole).toBe(true);
            });

            it('should properly name the association', function () {
                expect(Group.associations.users.association.name).
                        toBe('UserGroups');
            });

            it('association should be many-to-many', function () {
                expect(Group.associations.users.association.kind).
                        toBe('many-to-many');
            });

            it('should have Group on the right', function () {
                expect(Group.associations.users.association.right.type).
                        toBe('Group');
            });

            it('association should refer to proper entity', function () {
                expect(Group.associations.users.cls).toBe(User);
                expect(Group.associations.users.type).toBe('User');
            });

            it('should have a getter', function () {
                expect(typeof Group.prototype.users).toBe('function');
            });

            it('should not have a setter', function () {
                expect(typeof Group.prototype.setUsers).toBe('undefined');
            });
        });
    });

    //-------------------------------------------------------------------------

    describe("Ticket", function() {
        describe("comments", function() {
            it('should have the association', function () {
                expect(Ticket.associations.comments.isRole).toBe(true);
            });

            it('should properly name the association', function () {
                expect(Ticket.associations.comments.association.name).
                        toBe('TicketComments');
            });

            it('association should be many-to-one', function () {
                expect(Ticket.associations.comments.association.kind).
                        toBe('many-to-one');
            });

            it('should have the proper side', function () {
                expect(Ticket.associations.comments.association.right.type).
                        toBe('Ticket');
            });

            it('association should refer to proper entity', function () {
                expect(Ticket.associations.comments.cls).toBe(Comment);
                expect(Ticket.associations.comments.type).toBe('Comment');
            });

            it('should have a getter', function () {
                expect(typeof Ticket.prototype.comments).toBe('function');
            });

            it('should not have a setter', function () {
                expect(typeof Ticket.prototype.setComments).toBe('undefined');
            });
        });

        describe("assignee", function() {
            it('should have the association', function () {
                expect(Ticket.associations.assignee.isRole).toBe(true);
            });

            it('should properly name the association', function () {
                expect(Ticket.associations.assignee.association.name).
                        toBe('UserAssigneeTickets');
            });

            it('association should be many-to-one', function () {
                expect(Ticket.associations.assignee.association.kind).
                        toBe('many-to-one');
            });

            it('should have the proper side', function () {
                expect(Ticket.associations.assignee.association.left.type).
                        toBe('Ticket');
            });

            it('association should refer to proper entity', function () {
                expect(Ticket.associations.assignee.cls).toBe(User);
                expect(Ticket.associations.assignee.type).toBe('User');
            });

            it('should have a getter', function () {
                expect(typeof Ticket.prototype.getAssignee).toBe('function');
            });

            it('should have a setter', function () {
                expect(typeof Ticket.prototype.setAssignee).toBe('function');
            });
        });

        describe("creator", function() {
            it('should have the association', function () {
                expect(Ticket.associations.creator.isRole).toBe(true);
            });

            it('should properly name the association', function () {
                expect(Ticket.associations.creator.association.name).
                        toBe('UserCreatorTickets');
            });

            it('association should be many-to-one', function () {
                expect(Ticket.associations.creator.association.kind).
                        toBe('many-to-one');
            });

            it('should have the proper side', function () {
                expect(Ticket.associations.creator.association.left.type).
                        toBe('Ticket');
            });

            it('association should refer to proper entity', function () {
                expect(Ticket.associations.creator.cls).toBe(User);
                expect(Ticket.associations.creator.type).toBe('User');
            });

            it('should have a getter', function () {
                expect(typeof Ticket.prototype.getCreator).toBe('function');
            });

            it('should have a setter', function () {
                expect(typeof Ticket.prototype.setCreator).toBe('function');
            });
        });
    });

    //-------------------------------------------------------------------------

    describe("Comment", function() {
        describe("ticket", function() {
            it('should have the association', function () {
                expect(Comment.associations.ticket.isRole).toBe(true);
            });

            it('should properly name the association', function () {
                expect(Comment.associations.ticket.association.name).
                        toBe('TicketComments');
            });

            it('association should be many-to-one', function () {
                expect(Comment.associations.ticket.association.kind).
                        toBe('many-to-one');
            });

            it('should have Comment on the left', function () {
                expect(Comment.associations.ticket.association.left.type).
                        toBe('Comment');
            });

            it('association should refer to proper entity', function () {
                expect(Comment.associations.ticket.cls).toBe(Ticket);
                expect(Comment.associations.ticket.type).toBe('Ticket');
            });

            it('should have a getter', function () {
                expect(typeof Comment.prototype.getTicket).toBe('function');
            });

            it('should have a setter', function () {
                expect(typeof Comment.prototype.setTicket).toBe('function');
            });
        });

        describe("user", function() {
            it('should have the association', function () {
                expect(Comment.associations.user.isRole).toBe(true);
            });

            it('should properly name the association', function () {
                expect(Comment.associations.user.association.name).
                        toBe('UserComments');
            });

            it('association should be many-to-one', function () {
                expect(Comment.associations.user.association.kind).
                        toBe('many-to-one');
            });

            it('should have Comment on the left', function () {
                expect(Comment.associations.user.association.left.type).
                        toBe('Comment');
            });

            it('association should refer to proper entity', function () {
                expect(Comment.associations.user.cls).toBe(User);
                expect(Comment.associations.user.type).toBe('User');
            });

            it('should have a getter', function () {
                expect(typeof Comment.prototype.getUser).toBe('function');
            });

            it('should have a setter', function () {
                expect(typeof Comment.prototype.setUser).toBe('function');
            });
        });
    });
});
