import { hexToNumber, leftPad, numberToHex } from 'web3-utils';
import { LSP6_DEFAULT_PERMISSIONS } from '../constants/constants';
export function encodePermissions(permissions) {
    let basePermissions = BigInt(0);
    // Process each permission to potentially switch off permissions included in ALL_PERMISSIONS
    // Deal with ALL_PERMISSIONS first IMPORTANT!
    const keys = Object.keys(permissions).filter((key) => key !== 'ALL_PERMISSIONS');
    keys.splice(0, 0, 'ALL_PERMISSIONS');
    // Do not use an for of loop here to not require the regenerator runtime
    for (let i = 0; i < keys.length; i += 1) {
        const key = keys[i];
        const permissionValue = BigInt(hexToNumber(LSP6_DEFAULT_PERMISSIONS[key], true));
        if (key in permissions) {
            if (permissions[key]) {
                basePermissions |= permissionValue;
            }
            else {
                basePermissions &= ~permissionValue;
            }
        }
    }
    // Convert the final BigInt permission value back to a hex string, properly padded
    return leftPad(numberToHex(basePermissions.toString()), 64);
}
export function decodePermissions(permissionHex) {
    const result = {
        CHANGEOWNER: false,
        ADDCONTROLLER: false,
        EDITPERMISSIONS: false,
        ADDEXTENSIONS: false,
        CHANGEEXTENSIONS: false,
        ADDUNIVERSALRECEIVERDELEGATE: false,
        CHANGEUNIVERSALRECEIVERDELEGATE: false,
        REENTRANCY: false,
        SUPER_TRANSFERVALUE: false,
        TRANSFERVALUE: false,
        SUPER_CALL: false,
        CALL: false,
        SUPER_STATICCALL: false,
        STATICCALL: false,
        SUPER_DELEGATECALL: false,
        DELEGATECALL: false,
        DEPLOY: false,
        SUPER_SETDATA: false,
        SETDATA: false,
        ENCRYPT: false,
        DECRYPT: false,
        SIGN: false,
        EXECUTE_RELAY_CALL: false,
        ERC4337_PERMISSION: false,
        ALL_PERMISSIONS: false,
    };
    const permissionsToTest = Object.keys(LSP6_DEFAULT_PERMISSIONS);
    const passedPermissionDecimal = BigInt(hexToNumber(permissionHex, true));
    // Do not use an for of loop here to not require the regenerator runtime
    // Deal with ALL_PERMISSIONS the same way. So as long as all the bits in ALL_PERMISSIONS
    // are set the same way as in ALL_PERMISSIONS then this flag will return as true.
    // It does not mean some extra permissions are not included.
    for (let i = 0; i < permissionsToTest.length; i += 1) {
        const testPermission = permissionsToTest[i];
        const decimalTestPermission = BigInt(hexToNumber(LSP6_DEFAULT_PERMISSIONS[testPermission], true));
        const isPermissionIncluded = (passedPermissionDecimal & decimalTestPermission) ===
            decimalTestPermission;
        result[testPermission] = isPermissionIncluded;
    }
    return result;
}
//# sourceMappingURL=permissions.js.map