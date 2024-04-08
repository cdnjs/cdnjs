export declare const email: string;
export declare const url: string;
export declare const file = "(file:\\/\\/\\/)(?:[a-z]+:(?:\\/|\\\\)+)?([\\w.]+(?:[\\/\\\\]?)+)+";
export declare const final1: string;
export declare const final2: string;
export declare let finalRegex: RegExp;
export declare const ipRegex: RegExp;
export declare const emailRegex: RegExp;
export declare const fileRegex: RegExp;
export declare const urlRegex: RegExp;
declare const iidxes: {
    isFile: number;
    file: {
        fileName: number;
        protocol: number;
    };
    isEmail: number;
    email: {
        protocol: number;
        local: number;
        host: number;
    };
    isURL: number;
    url: {
        TLD: number[];
        protocol: number[];
        host: number[];
        ipv4: number;
        byProtocol: number;
        port: number;
        protocolWithDomain: number;
        path: number;
    };
};
/***
 * When Editing the regular expressions above the code below must be run
 * Before deployment and release the iidexes in console log must be copied to the object above
 *  --------------------------------


const testers = [
    `file:///some/file/path/filename.pdf`,
    `mailto:e+_mail.me@sub.domain.com`,
    `http://sub.domain.co.uk:3000/p/a/t/h_(asd)/h?q=abc123#dfdf`,
    `http://www.عربي.com`,
    `http://127.0.0.1:3000/p/a/t_(asd)/h?q=abc123#dfdf`,
    `http://[2a00:1450:4025:401::67]/k/something`,
    `a.ta/p`,
    `a@b.cd`,
    `www.github.com/path`,
];


for (let i = 0; i < testers.length; i++) {
    const element = testers[i];
    const result = finalRegex.exec(element);
    if(result === null) {
        continue;
    }
    if (i === 0) {
        iidxes.isFile = result.lastIndexOf(result[0]);
        iidxes.file.fileName = result.indexOf("filename.pdf");
        iidxes.file.protocol = result.indexOf("file:///");
    }
    if (i === 1) {
        iidxes.isEmail = result.lastIndexOf(result[0]);
        iidxes.email.protocol = result.indexOf("mailto:");
        iidxes.email.local = result.indexOf("e+_mail.me");
        iidxes.email.host = result.indexOf("sub.domain.com");
    }
    if (i === 2) {
        iidxes.isURL = result.lastIndexOf(result[0]);
        iidxes.url.protocol[0] = result.indexOf("http://");
        iidxes.url.protocolWithDomain = result.indexOf(
            "http://sub.domain.co.uk:3000"
        );
        iidxes.url.port = result.indexOf("3000");
        iidxes.url.path = result.indexOf("/p/a/t/h_(asd)/h?q=abc123#dfdf");
    }
    if (i === 3) {
        iidxes.url.byProtocol = result.lastIndexOf("http://www.عربي.com");
    }
    if (i === 4) {
        iidxes.url.ipv4 = result.lastIndexOf("127.0.0.1");
    }
    if (i === 5) {
        iidxes.url.protocol[1] = result.lastIndexOf("http://");
    }
    if (i ===6) {
        iidxes.url.TLD[0] = result.indexOf("ta");
    }
    if (i === 7) {
        iidxes.url.TLD[1] = result.indexOf("cd");
    }
    if (i === 8) {
        iidxes.url.host[0] = result.lastIndexOf("www.github.com");
    }
    finalRegex.lastIndex = 0;
}

console.log(JSON.stringify(iidxes));
*/
export { iidxes };
