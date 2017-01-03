Ext.define('KitchenSink.data.CountryState', {
    requires: [
        'KitchenSink.data.Init'
    ]
}, function() {
    Ext.ux.ajax.SimManager.register({
        '/KitchenSink/CountryState': {
            type: 'json',
            data: [
                { abbr: 'AL', country: 'USA', state: 'Alabama', 		description: 'The Heart of Dixie' },
                { abbr: 'AK', country: 'USA', state: 'Alaska', 			description: 'The Land of the Midnight Sun' },
                { abbr: 'AZ', country: 'USA', state: 'Arizona', 		description: 'The Grand Canyon State' },
                { abbr: 'AR', country: 'USA', state: 'Arkansas', 		description: 'The Natural State' },
                { abbr: 'CA', country: 'USA', state: 'California', 		description: 'The Golden State' },
                { abbr: 'CO', country: 'USA', state: 'Colorado', 		description: 'The Mountain State' },
                { abbr: 'CT', country: 'USA', state: 'Connecticut', 	description: 'The Constitution State' },
                { abbr: 'DE', country: 'USA', state: 'Delaware', 		description: 'The First State' },
                { abbr: 'DC', country: 'USA', state: 'District of Columbia', description: "The Nation's Capital" },
                { abbr: 'FL', country: 'USA', state: 'Florida', 		description: 'The Sunshine State' },
                { abbr: 'GA', country: 'USA', state: 'Georgia', 		description: 'The Peach State' },
                { abbr: 'HI', country: 'USA', state: 'Hawaii', 			description: 'The Aloha State' },
                { abbr: 'ID', country: 'USA', state: 'Idaho', 			description: 'Famous Potatoes' },
                { abbr: 'IL', country: 'USA', state: 'Illinois', 		description: 'The Prairie State' },
                { abbr: 'IN', country: 'USA', state: 'Indiana', 		description: 'The Hospitality State' },
                { abbr: 'IA', country: 'USA', state: 'Iowa', 			description: 'The Corn State' },
                { abbr: 'KS', country: 'USA', state: 'Kansas', 			description: 'The Sunflower State' },
                { abbr: 'KY', country: 'USA', state: 'Kentucky', 		description: 'The Bluegrass State' },
                { abbr: 'LA', country: 'USA', state: 'Louisiana', 		description: 'The Bayou State' },
                { abbr: 'ME', country: 'USA', state: 'Maine', 			description: 'The Pine Tree State' },
                { abbr: 'MD', country: 'USA', state: 'Maryland', 		description: 'Chesapeake State' },
                { abbr: 'MA', country: 'USA', state: 'Massachusetts', 	description: 'The Spirit of America' },
                { abbr: 'MI', country: 'USA', state: 'Michigan', 		description: 'Great Lakes State' },
                { abbr: 'MN', country: 'USA', state: 'Minnesota', 		description: 'North Star State' },
                { abbr: 'MS', country: 'USA', state: 'Mississippi', 	description: 'Magnolia State' },
                { abbr: 'MO', country: 'USA', state: 'Missouri', 		description: 'Show Me State' },
                { abbr: 'MT', country: 'USA', state: 'Montana', 		description: 'Big Sky Country' },
                { abbr: 'NE', country: 'USA', state: 'Nebraska', 		description: 'Beef State' },
                { abbr: 'NV', country: 'USA', state: 'Nevada', 			description: 'Silver State' },
                { abbr: 'NH', country: 'USA', state: 'New Hampshire', 	description: 'Granite State' },
                { abbr: 'NJ', country: 'USA', state: 'New Jersey', 		description: 'Garden State' },
                { abbr: 'NM', country: 'USA', state: 'New Mexico', 		description: 'Land of Enchantment' },
                { abbr: 'NY', country: 'USA', state: 'New York', 		description: 'Empire State' },
                { abbr: 'NC', country: 'USA', state: 'North Carolina', 	description: 'First in Freedom' },
                { abbr: 'ND', country: 'USA', state: 'North Dakota', 	description: 'Peace Garden State' },
                { abbr: 'OH', country: 'USA', state: 'Ohio', 			description: 'The Heart of it All' },
                { abbr: 'OK', country: 'USA', state: 'Oklahoma', 		description: 'Oklahoma is OK' },
                { abbr: 'OR', country: 'USA', state: 'Oregon', 			description: 'Pacific Wonderland' },
                { abbr: 'PA', country: 'USA', state: 'Pennsylvania', 	description: 'Keystone State' },
                { abbr: 'RI', country: 'USA', state: 'Rhode Island', 	description: 'Ocean State' },
                { abbr: 'SC', country: 'USA', state: 'South Carolina', 	description: 'Nothing Could be Finer' },
                { abbr: 'SD', country: 'USA', state: 'South Dakota', 	description: 'Great Faces, Great Places' },
                { abbr: 'TN', country: 'USA', state: 'Tennessee', 		description: 'Volunteer State' },
                { abbr: 'TX', country: 'USA', state: 'Texas', 			description: 'Lone Star State' },
                { abbr: 'UT', country: 'USA', state: 'Utah', 			description: 'Salt Lake State' },
                { abbr: 'VT', country: 'USA', state: 'Vermont', 		description: 'Green Mountain State' },
                { abbr: 'VA', country: 'USA', state: 'Virginia', 		description: 'Mother of States' },
                { abbr: 'WA', country: 'USA', state: 'Washington', 		description: 'Green Tree State' },
                { abbr: 'WV', country: 'USA', state: 'West Virginia', 	description: 'Mountain State' },
                { abbr: 'WI', country: 'USA', state: 'Wisconsin', 		description: "America's Dairyland" },
                { abbr: 'WY', country: 'USA', state: 'Wyoming', 		description: 'Like No Place on Earth' },

                { abbr: 'ON', country: 'Canada', state: 'Ontario' },
                { abbr: 'QC', country: 'Canada', state: 'Quebec' },
                { abbr: 'NS', country: 'Canada', state: 'Nova Scotia' },
                { abbr: 'NB', country: 'Canada', state: 'New Brunswick' },
                { abbr: 'MB', country: 'Canada', state: 'Manitoba' },
                { abbr: 'BC', country: 'Canada', state: 'British Columbia' },
                { abbr: 'PE', country: 'Canada', state: 'Prince Edward Island' },
                { abbr: 'SK', country: 'Canada', state: 'Saskatchewan' },
                { abbr: 'AB', country: 'Canada', state: 'Alberta' },
                { abbr: 'NL', country: 'Canada', state: 'Newfoundland and Labrador' }
            ]
        },
        '/KitchenSink/Country': {
            type: 'json',
            data: [
                { name: 'USA' },
                { name: 'Canada' }
            ]
        }
    });
});
