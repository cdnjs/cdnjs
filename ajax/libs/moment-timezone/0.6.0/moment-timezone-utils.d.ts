import moment = require('./index');

declare module 'moment' {

    /** Bundle of packed zone data and links for multiple timezones */
    interface PackedZoneBundle {
        version: string;
        zones: string[];
        links: string[];
    }

    /** Bundle of raw zone data and links for multiple timezones */
    interface UnpackedZoneBundle {
        version: string;
        zones: UnpackedZone[];
        links: string[];
    }

    /** Bundle of timezones for a single country */
    interface UnpackedCountryData {
        name: string;
        zones: string[];
    }

    /** extends MomentTimezone declared in index */
    interface MomentTimezone {
        /** Converts zone data in the unpacked format to the packed format. */
        pack(unpackedObject: UnpackedZone): string;

        /** Convert a base 10 number to a base 60 string. */
        packBase60(input: number, precision?: number): string;

        /** Converts country data in the unpacked format to a packed format. */
        packCountry(unpacked: UnpackedCountryData): string;

        /**
         * Create links out of two or more zones that share data.
         * @returns A new ZoneBundle with duplicate zone data replaced by links
         */
        createLinks(unlinked: UnpackedZoneBundle): PackedZoneBundle;

        /**
         * Filter out data for years outside a certain range.
         * @return a new, filtered UnPackedZone object
         */
        filterYears(unpackedZone: UnpackedZone, startYear: number, endYear: number): UnpackedZone;
        /**
         * Filter out data for years outside a certain range.
         * @return a new, filtered UnPackedZone object
         */
        filterYears(unpackedZone: UnpackedZone, startAndEndYear: number): UnpackedZone;

        /**
         * Combines packing, link creation, and subsetting of years into one simple interface.
         * Pass in an unpacked bundle, start year, and end year and get a filtered, linked, packed bundle back.
         */
        filterLinkPack(unpackedBundle: UnpackedZoneBundle, startYear: number, endYear: number): PackedZoneBundle;
        /**
         * Combines packing, link creation, and subsetting of years into one simple interface.
         * Pass in an unpacked bundle, start year, and end year and get a filtered, linked, packed bundle back.
         */
        filterLinkPack(unpackedBundle: UnpackedZoneBundle, startAndEndYear: number): PackedZoneBundle;
    }
}

// require("moment-timezone") === require("moment")
export = moment;
