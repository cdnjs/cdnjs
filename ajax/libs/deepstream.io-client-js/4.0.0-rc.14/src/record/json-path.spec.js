"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var jsonPath = require("./json-path");
var chai_1 = require("chai");
describe('objects are created from paths and their value is set correctly', function () {
    it('sets simple values', function () {
        var record = {};
        var result = jsonPath.setValue(record, 'firstname', 'Wolfram');
        chai_1.expect(result).to.deep.equal({ firstname: 'Wolfram' });
    });
    it('sets values for nested objects', function () {
        var record = {};
        var result = jsonPath.setValue(record, 'address.street', 'someStreet');
        chai_1.expect(result).to.deep.equal({
            address: {
                street: 'someStreet'
            }
        });
    });
    it('sets values for nested objects with numeric field names', function () {
        var record = {};
        var result = jsonPath.setValue(record, 'address.street.1', 'someStreet');
        chai_1.expect(result).to.deep.equal({
            address: {
                street: {
                    1: 'someStreet'
                }
            }
        });
    });
    it('sets values for nested objects with multiple numeric field names', function () {
        var record = {};
        var result = jsonPath.setValue(record, 'address.99.street.1', 'someStreet');
        chai_1.expect(result).to.deep.equal({
            address: {
                99: {
                    street: {
                        1: 'someStreet'
                    }
                }
            }
        });
    });
    it('sets values for nested objects with multiple mixed array and numeric field names', function () {
        var record = {};
        var result = jsonPath.setValue(record, 'address[2].99.street[2].1', 'someStreet');
        chai_1.expect(result).to.deep.equal({
            address: [
                null,
                null,
                {
                    99: {
                        street: [
                            null,
                            null,
                            {
                                1: 'someStreet'
                            }
                        ]
                    }
                }
            ]
        });
    });
    it('sets first value of array', function () {
        var record = {};
        var result = jsonPath.setValue(record, 'items[0]', 51);
        chai_1.expect(result).to.deep.equal({
            items: [
                51
            ]
        });
    });
    it('sets numeric obj member name of 0 (zero)', function () {
        var record = {};
        var result = jsonPath.setValue(record, 'items.0', 51);
        chai_1.expect(result).to.deep.equal({
            items: {
                0: 51
            }
        });
    });
    it('sets values for arrays', function () {
        var record = {};
        var result = jsonPath.setValue(record, 'pastAddresses[1].street', 'someStreet');
        chai_1.expect(result).to.deep.equal({
            pastAddresses: [
                null,
                {
                    street: 'someStreet'
                }
            ]
        });
    });
    it('sets value AS arrays of arrays', function () {
        var record = {};
        var arrOfArr = [
            undefined,
            [
                'new-Street1', 'road1', 'blvd1'
            ],
            [
                'street2', 'road2', 'blvd2'
            ]
        ];
        var result = jsonPath.setValue(record, 'addresses', arrOfArr);
        chai_1.expect(result).to.deep.equal({
            addresses: [
                null,
                [
                    'new-Street1', 'road1', 'blvd1'
                ],
                [
                    'street2', 'road2', 'blvd2'
                ]
            ]
        });
    });
    it('sets value IN arrays of arrays', function () {
        var record = {
            addresses: [
                null,
                [
                    'street1', 'road1', 'blvd1'
                ],
                [
                    'street2', 'road2', 'blvd2'
                ]
            ]
        };
        var result = jsonPath.setValue(record, 'addresses[1][0]', 'new-Street1');
        chai_1.expect(result).to.deep.equal({
            addresses: [
                null,
                [
                    'new-Street1', 'road1', 'blvd1'
                ],
                [
                    'street2', 'road2', 'blvd2'
                ]
            ]
        });
    });
    it('sets value IN deeper nested multi-dimensional arrays of arrays', function () {
        var record = {
            obj: {
                101: {
                    addresses: [
                        [
                            undefined,
                            [
                                undefined,
                                ['street1', 'road1', 'blvd1'],
                                ['street2', 'road2', 'blvd2']
                            ],
                            [
                                undefined,
                                { a: 'street1', b: 'road1', c: 'blvd1' },
                                { 1: 'street2', 2: 'road2', 3: 'blvd2' }
                            ]
                        ],
                        undefined,
                        [[0, 1, 2, 3], [9, 8, 7, 6], [2, 4, 6, 8]]
                    ]
                }
            }
        };
        var result = jsonPath.setValue(record, 'obj.101.addresses[0][1][1][0]', 'new-Street1');
        chai_1.expect(result).to.deep.equal({
            obj: {
                101: {
                    addresses: [
                        [
                            null,
                            [
                                null,
                                ['new-Street1', 'road1', 'blvd1'],
                                ['street2', 'road2', 'blvd2']
                            ],
                            [
                                null,
                                { a: 'street1', b: 'road1', c: 'blvd1' },
                                { 1: 'street2', 2: 'road2', 3: 'blvd2' }
                            ]
                        ],
                        null,
                        [[0, 1, 2, 3], [9, 8, 7, 6], [2, 4, 6, 8]]
                    ]
                }
            }
        });
    });
    it('extends existing objects', function () {
        var record = { firstname: 'Wolfram' };
        var result = jsonPath.setValue(record, 'lastname', 'Hempel');
        chai_1.expect(result).to.deep.equal({
            firstname: 'Wolfram',
            lastname: 'Hempel'
        });
    });
    it('extends existing arrays', function () {
        var record = {
            firstname: 'Wolfram',
            animals: ['Bear', 'Cow', 'Ostrich']
        };
        var result = jsonPath.setValue(record, 'animals[ 1 ]', 'Emu');
        chai_1.expect(result).to.deep.equal({
            firstname: 'Wolfram',
            animals: ['Bear', 'Emu', 'Ostrich']
        });
    });
    it('extends existing arrays with empty slot assigned a primitive', function () {
        var record = {
            firstname: 'Wolfram',
            animals: [undefined, 'Cow', 'Ostrich']
        };
        var result = jsonPath.setValue(record, 'animals[0]', 'Emu');
        chai_1.expect(result).to.deep.equal({
            firstname: 'Wolfram',
            animals: ['Emu', 'Cow', 'Ostrich']
        });
    });
    it('extends existing arrays with objects', function () {
        var record = {
            firstname: 'Wolfram',
            animals: [undefined, 'Cow', 'Ostrich']
        };
        var result = jsonPath.setValue(record, 'animals[0].xxx', 'Emu');
        chai_1.expect(result).to.deep.equal({
            firstname: 'Wolfram',
            animals: [{ xxx: 'Emu' }, 'Cow', 'Ostrich']
        });
    });
    it('treats numbers with the path such as .0. as a key value', function () {
        var record = {};
        var result = jsonPath.setValue(record, 'animals.0.name', 'Emu');
        chai_1.expect(result).to.deep.equal({
            animals: {
                0: {
                    name: 'Emu'
                }
            }
        });
    });
    it('treats numbers with the path such as [0] as an index value', function () {
        var record = {};
        var result = jsonPath.setValue(record, 'animals[0].name', 'Emu');
        chai_1.expect(result).to.deep.equal({
            animals: [{
                    name: 'Emu'
                }]
        });
    });
    it('handles .xyz paths into non-objects', function () {
        var record = { animals: 3 };
        var result = jsonPath.setValue(record, 'animals.name', 'Emu');
        chai_1.expect(result).to.deep.equal({
            animals: {
                name: 'Emu'
            }
        });
    });
    it('handles .xyz paths through non-objects', function () {
        var record = { animals: 3 };
        var result = jsonPath.setValue(record, 'animals.name.length', 7);
        chai_1.expect(result).to.deep.equal({
            animals: {
                name: {
                    length: 7
                }
            }
        });
    });
    it('handles [0] paths into non-objects', function () {
        var record = { animals: 3 };
        var result = jsonPath.setValue(record, 'animals[0]', 7);
        chai_1.expect(result).to.deep.equal({
            animals: [7]
        });
    });
});
