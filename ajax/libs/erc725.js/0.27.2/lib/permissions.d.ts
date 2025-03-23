import { Permissions } from '../types/Method';
export declare function encodePermissions(permissions: Permissions): string;
export declare function decodePermissions(permissionHex: string): {
    CHANGEOWNER: boolean;
    ADDCONTROLLER: boolean;
    EDITPERMISSIONS: boolean;
    ADDEXTENSIONS: boolean;
    CHANGEEXTENSIONS: boolean;
    ADDUNIVERSALRECEIVERDELEGATE: boolean;
    CHANGEUNIVERSALRECEIVERDELEGATE: boolean;
    REENTRANCY: boolean;
    SUPER_TRANSFERVALUE: boolean;
    TRANSFERVALUE: boolean;
    SUPER_CALL: boolean;
    CALL: boolean;
    SUPER_STATICCALL: boolean;
    STATICCALL: boolean;
    SUPER_DELEGATECALL: boolean;
    DELEGATECALL: boolean;
    DEPLOY: boolean;
    SUPER_SETDATA: boolean;
    SETDATA: boolean;
    ENCRYPT: boolean;
    DECRYPT: boolean;
    SIGN: boolean;
    EXECUTE_RELAY_CALL: boolean;
    ERC4337_PERMISSION: boolean;
    ALL_PERMISSIONS: boolean;
};
/**
 * @notice Map a permission to its corresponding bytes32 representation.
 * @param permission The permission string to be mapped.
 * @return The bytes32 representation of the permission.
 * @dev Return null if the input is not a known permission name or a valid 32-byte hex string.
 */
export declare function mapPermission(permission: string): string | null;
/**
 * @notice Check if the required permissions are included in the granted permissions.
 * @param requiredPermissions An array of required permissions or a single required permission.
 * @param grantedPermissions The granted permissions as a 32-byte hex string.
 * @return A boolean value indicating whether the required permissions are included in the granted permissions.
 * @dev Throws an error if the grantedPermissions input is not a valid 32-byte hex string.
 */
export declare const checkPermissions: (requiredPermissions: string[] | string, grantedPermissions: string) => boolean;
