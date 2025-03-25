import * as React from 'react';
import { canUseDOM, hasHover as hasHoverLib, hasMouse as hasPointerLib } from '@vkontakte/vkjs';
import { AdaptivityContext } from '../components/AdaptivityProvider/AdaptivityContext';
import { getOrDefault } from '../helpers/getOrDefault';
import { getSizeX, getSizeY, getViewHeightByMediaQueries, getViewWidthByMediaQueries, tryToCheckIsDesktop } from '../lib/adaptivity';
import { matchMediaListAddListener, matchMediaListRemoveListener } from '../lib/matchMedia';
import { useMediaQueries } from './useMediaQueries';
import { usePlatform } from './usePlatform';
/**
 * Высчитывает и возвращает параметры адаптивности при изменении вьюпорта.
 *
 * Берёт в приоритет значения из `AdaptivityContext`.
 *
 * > ⚠ SSR
 * >
 * > Во избежания ошибок при гидратации, не используйте данный хук, если есть вероятность, что компонент будет отрендерен
 * > на стороне сервера.
 * >
 * > Лучше всего использовать для всплывающих окон, т.к. они вызываются только после загрузки
 * > страницы либо пользователем, либо программно.
 */ export const useAdaptivityWithJSMediaQueries = ()=>{
    if (!canUseDOM) {
        // eslint-disable-next-line no-console
        console.error(`[useAdaptivityWithJSMediaQueries] Похоже, вы пытаетесь использовать хук вне браузера.

Постарайтесь этого избегать, чтобы не было ошибок при гидратации: при SSR нет информации о размерах экрана.

Используйте CSS Media Query или библиотеку по типу https://github.com/artsy/fresnel.`);
    }
    const { viewWidth: viewWidthContext, viewHeight: viewHeightContext, sizeX: sizeXContext, sizeY: sizeYContext, hasPointer: hasPointerContext, hasHover: hasHoverContext } = React.useContext(AdaptivityContext);
    const platform = usePlatform();
    const mediaQueries = useMediaQueries();
    const [[viewWidthLocal, viewHeightLocal], setViewSizeLocal] = React.useState(()=>[
            getOrDefault(viewWidthContext, getViewWidthByMediaQueries(mediaQueries)),
            getOrDefault(viewHeightContext, getViewHeightByMediaQueries(mediaQueries))
        ]);
    const adaptivityProps = React.useMemo(()=>{
        const hasPointer = getOrDefault(hasPointerContext, hasPointerLib);
        const hasHover = getOrDefault(hasHoverContext, hasHoverLib);
        const viewWidth = getOrDefault(viewWidthContext, viewWidthLocal);
        const viewHeight = getOrDefault(viewHeightContext, viewHeightLocal);
        const sizeX = getOrDefault(sizeXContext, getSizeX(viewWidth));
        const sizeY = getOrDefault(sizeYContext, getSizeY(viewWidth, viewHeight, hasPointer));
        const isDesktop = tryToCheckIsDesktop(viewWidth, viewHeight, hasPointer, platform);
        return {
            viewWidth,
            viewHeight,
            sizeX,
            sizeY,
            hasPointer,
            hasHover,
            isDesktop
        };
    }, [
        viewWidthLocal,
        viewHeightLocal,
        viewWidthContext,
        viewHeightContext,
        sizeXContext,
        sizeYContext,
        hasPointerContext,
        hasHoverContext,
        platform
    ]);
    React.useEffect(()=>{
        const handleMediaQuery = ()=>{
            setViewSizeLocal((prevSizeLocal)=>{
                const newViewWidthLocal = getOrDefault(viewWidthContext, getViewWidthByMediaQueries(mediaQueries));
                const newViewHeightLocal = getOrDefault(viewHeightContext, getViewHeightByMediaQueries(mediaQueries));
                const [prevViewWidthLocal, prevViewHeightLocal] = prevSizeLocal;
                if (prevViewWidthLocal !== newViewWidthLocal || prevViewHeightLocal !== newViewHeightLocal) {
                    return [
                        newViewWidthLocal,
                        newViewHeightLocal
                    ];
                }
                return prevSizeLocal;
            });
        };
        if (!viewWidthContext) {
            [
                mediaQueries.desktopPlus,
                mediaQueries.tablet,
                mediaQueries.smallTablet,
                mediaQueries.mobile
            ].forEach((matchMediaListener)=>matchMediaListAddListener(matchMediaListener, handleMediaQuery));
        }
        if (!viewHeightContext) {
            [
                mediaQueries.mediumHeight,
                mediaQueries.mobileLandscapeHeight
            ].forEach((matchMediaListener)=>matchMediaListAddListener(matchMediaListener, handleMediaQuery));
        }
        return ()=>{
            [
                mediaQueries.desktopPlus,
                mediaQueries.tablet,
                mediaQueries.smallTablet,
                mediaQueries.mobile,
                mediaQueries.mediumHeight,
                mediaQueries.mobileLandscapeHeight
            ].forEach((matchMediaListener)=>matchMediaListRemoveListener(matchMediaListener, handleMediaQuery));
        };
    }, [
        mediaQueries,
        viewWidthContext,
        viewHeightContext
    ]);
    return adaptivityProps;
};

//# sourceMappingURL=useAdaptivityWithJSMediaQueries.js.map