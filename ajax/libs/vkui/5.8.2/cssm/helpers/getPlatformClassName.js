// TODO [>=6]: удалить этот хеллпер
import { platform } from '../lib/platform';
export function getPlatformClassName(base, osname = platform(), /**
   * Note: ввиду того, что Typescript не поддерживает `typescript-plugin-css-modules` во время компиляции,
   *  не удалось покрыть дженерик типом параметр `styles`. Поэтому может вернуться undefined.
   */ styles) {
    const platformClassName = `${String(base)}--${osname}`;
    return styles ? styles[platformClassName] : platformClassName;
}

//# sourceMappingURL=getPlatformClassName.js.map