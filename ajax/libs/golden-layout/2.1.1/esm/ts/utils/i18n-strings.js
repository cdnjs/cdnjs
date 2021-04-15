import { AssertError } from '../errors/internal-error';
/** @public */
export var I18nStrings;
(function (I18nStrings) {
    /** @internal */
    let initialised = false;
    /** @internal */
    const infosObject = {
        PopoutCannotBeCreatedWithGroundItemConfig: {
            id: 0 /* PopoutCannotBeCreatedWithGroundItemConfig */,
            default: 'Popout cannot be created with ground ItemConfig'
        },
        PleaseRegisterAConstructorFunction: {
            id: 1 /* PleaseRegisterAConstructorFunction */,
            default: 'Please register a constructor function'
        },
        ComponentIsAlreadyRegistered: {
            id: 2 /* ComponentIsAlreadyRegistered */,
            default: 'Component is already registered',
        },
        ItemConfigIsNotTypeComponent: {
            id: 3 /* ItemConfigIsNotTypeComponent */,
            default: 'ItemConfig is not of type component',
        },
    };
    I18nStrings.idCount = Object.keys(infosObject).length;
    /** @internal */
    const infos = Object.values(infosObject);
    function checkInitialise() {
        if (!initialised) {
            for (let i = 0; i < I18nStrings.idCount; i++) {
                const info = infos[i];
                if (info.id !== i) {
                    throw new AssertError('INSI00110', `${i}: ${info.id}`);
                }
                else {
                    i18nStrings[i] = info.default;
                }
            }
        }
        initialised = true;
    }
    I18nStrings.checkInitialise = checkInitialise;
})(I18nStrings || (I18nStrings = {}));
/** @public */
export const i18nStrings = new Array(I18nStrings.idCount);
//# sourceMappingURL=i18n-strings.js.map