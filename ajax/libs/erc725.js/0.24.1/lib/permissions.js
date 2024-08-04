import { hexToNumber, leftPad, toHex } from 'web3-utils';
import { LSP6_ALL_PERMISSIONS, LSP6_DEFAULT_PERMISSIONS, } from '../constants/constants';
export function encodePermissions(permissions) {
    let basePermissions = BigInt(0);
    // If ALL_PERMISSIONS is requested, start with that as the base
    if (permissions.ALL_PERMISSIONS) {
        basePermissions = BigInt(hexToNumber(LSP6_DEFAULT_PERMISSIONS.ALL_PERMISSIONS));
    }
    // Explicitly add REENTRANCY, DELEGATECALL, and SUPER_DELEGATECALL if requested (they are not included in ALL_PERMISSIONS)
    const additionalPermissions = [
        LSP6_DEFAULT_PERMISSIONS.REENTRANCY,
        LSP6_DEFAULT_PERMISSIONS.DELEGATECALL,
        LSP6_DEFAULT_PERMISSIONS.SUPER_DELEGATECALL,
    ];
    // Do not use an for of loop here to not require the regenerator runtime
    for (let i = 0; i < additionalPermissions.length; i += 1) {
        const permission = additionalPermissions[i];
        if (permissions[permission]) {
            basePermissions |= BigInt(hexToNumber(LSP6_DEFAULT_PERMISSIONS[permission]));
        }
    }
    // Process each permission to potentially switch off permissions included in ALL_PERMISSIONS
    const keys = Object.keys(permissions);
    // Do not use an for of loop here to not require the regenerator runtime
    for (let i = 0; i < keys.length; i += 1) {
        const key = keys[i];
        const permissionValue = BigInt(hexToNumber(LSP6_DEFAULT_PERMISSIONS[key]));
        if (permissions[key]) {
            // If not dealing with ALL_PERMISSIONS or additional permissions, ensure they are added
            if (!additionalPermissions.includes(key) &&
                key !== LSP6_DEFAULT_PERMISSIONS.ALL_PERMISSIONS) {
                basePermissions |= permissionValue;
            }
        }
        else if (LSP6_DEFAULT_PERMISSIONS[key] !== LSP6_DEFAULT_PERMISSIONS.ALL_PERMISSIONS) {
            // If permission is set to false, remove it from the basePermissions
            basePermissions &= ~permissionValue;
        }
    }
    // Convert the final BigInt permission value back to a hex string, properly padded
    return leftPad(toHex(basePermissions.toString()), 64);
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
    if (permissionHex === LSP6_ALL_PERMISSIONS) {
        // Do not use an for of loop here to not require the regenerator runtime
        for (let i = 0; i < permissionsToTest.length; i += 1) {
            const testPermission = permissionsToTest[i];
            result[testPermission] = true;
        }
        return result;
    }
    const passedPermissionDecimal = Number(hexToNumber(permissionHex));
    // Do not use an for of loop here to not require the regenerator runtime
    for (let i = 0; i < permissionsToTest.length; i += 1) {
        const testPermission = permissionsToTest[i];
        const decimalTestPermission = Number(hexToNumber(LSP6_DEFAULT_PERMISSIONS[testPermission]));
        const isPermissionIncluded = (passedPermissionDecimal & decimalTestPermission) ===
            decimalTestPermission;
        result[testPermission] = isPermissionIncluded;
    }
    return result;
}
//# sourceMappingURL=permissions.js.map