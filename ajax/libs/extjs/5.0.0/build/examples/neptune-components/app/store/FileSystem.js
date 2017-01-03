Ext.define('Neptune.store.FileSystem', {
    extend: 'Ext.data.TreeStore',
    fields: ['text', 'modified', 'size', 'permissions'],
    root: {
        text: 'File System',
        expanded: true,
        children: [
            {
                text: 'Applications',
                expanded: true,
                modified: '1/15/2012',
                size: 0,
                permissions: 'drwxrwxr-x+',
                children: [
                    { text: 'Adobe Fireworks CS6', modified: '7/25/2011', size: 34052, permissions: 'drwxrwxr-x@', leaf: true },
                    { text: 'Ext Js', modified: '12/13/2012', size: 3592, permissions: 'drwxr-xr-x', leaf: true },
                    { text: 'Mail.app', modified: '9/27/2012', size: 1024, permissions: 'drwxr-xr-x', leaf: true }
                ]
            },
            {
                text: 'usr',
                expanded: true,
                modified: '9/21/2012',
                size: 0,
                permissions: 'drwxrwxr-x+',
                children: [
                    {
                        text: 'bin',
                        modified: '9/27/2012',
                        size: 0,
                        permissions: 'drwxr-xr-x@',
                        children: [
                            { text: 'java', modified: '10/23/2012', size: 8, permissions: 'lrwxr-xr-x', leaf: true },
                            { text: 'python', modified: '1/8/2012', size: 32, permissions: '-rwxr-xr-x', leaf: true },
                            { text: 'unzip', modified: '1/8/2012', size: 232, permissions: '-rwxr-xr-x', leaf: true }
                        ]
                    },
                    {
                        text: 'etc',
                        expanded: true,
                        modified: '1/8/2012',
                        size: 8,
                        permissions: 'lrwxr-xr-x@',
                        children: [
                            { text: 'apache2', modified: '1/8/2012', size: 32, permissions: 'drwxr-xr-x', leaf: true },
                            { text: 'bashrc', modified: '11/18/2012', size: 0, permissions: '-r--r--r--', leaf: true },
                            { text: 'hosts', modified: '3/23/2012', size: 8, permissions: '-rw-r--r--', leaf: true }
                        ]
                    }
                ]
            },
            {
                text: 'var',
                modified: '12/17/2012',
                size: 0,
                permissions: 'drwxr-xr-x',
                children: [
                    {
                        text: 'www',
                        modified: '8/3/2012',
                        size: 420,
                        permissions: '-rw-r--r--',
                        children: [
                            { text: 'index.html', modified: '3/14/2012', size: 8, permissions: '-rw-r--r--', leaf: true },
                            { text: 'extjs', modified: '5/9/2012', size: 2352, permissions: '-rw-r--r--', leaf: true },
                            { text: 'sencha touch', modified: '6/29/2012', size: 1523, permissions: '-rw-r--r--', leaf: true }
                        ]
                    }
                ]
            }
        ]
    }
});