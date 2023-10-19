import * as React from 'react';
import { Icon24Dismiss } from '@vkontakte/icons';
import { warnOnce } from '../../lib/warnOnce';
import { Button } from '../Button/Button';
import { Image } from '../Image/Image';
import { RootComponent } from '../RootComponent/RootComponent';
import { SimpleCell } from '../SimpleCell/SimpleCell';
import { Footnote } from '../Typography/Footnote/Footnote';
import styles from './PromoBanner.module.css';
const warn = warnOnce('PromoBanner');
// TODO [>=6]: Удалить компонент
/**
 * @see https://vkcom.github.io/VKUI/#/PromoBanner
 * @deprecated v5.3.1
 *
 * Используйте событие [VKWebAppShowBannerAd](https://dev.vk.com/mini-apps/monetization/ad/banners)
 */ export const PromoBanner = ({ bannerData = {}, onClose, isCloseButtonHidden, ...restProps })=>{
    if (process.env.NODE_ENV === 'development') {
        warn('Компонент устарел и будет удален в v6. Используйте событие VKWebAppShowBannerAd https://dev.vk.com/mini-apps/monetization/ad/banners');
    }
    const [currentPixel, setCurrentPixel] = React.useState('');
    const statsPixels = React.useMemo(()=>bannerData.statistics ? bannerData.statistics.reduce((acc, item)=>({
                ...acc,
                [item.type]: item.url
            }), {}) : {}, [
        bannerData.statistics
    ]);
    const onClick = React.useCallback(()=>setCurrentPixel(statsPixels.click || ''), [
        statsPixels.click
    ]);
    React.useEffect(()=>{
        if (statsPixels.playbackStarted) {
            setCurrentPixel(statsPixels.playbackStarted);
        }
    }, [
        statsPixels.playbackStarted
    ]);
    return /*#__PURE__*/ React.createElement(RootComponent, {
        baseClassName: styles['PromoBanner'],
        ...restProps
    }, /*#__PURE__*/ React.createElement("div", {
        className: styles['PromoBanner__head']
    }, /*#__PURE__*/ React.createElement(Footnote, null, bannerData.advertisingLabel || 'Advertisement'), bannerData.ageRestrictions && /*#__PURE__*/ React.createElement(Footnote, {
        className: styles['PromoBanner__age']
    }, bannerData.ageRestrictions), !isCloseButtonHidden && /*#__PURE__*/ React.createElement("div", {
        className: styles['PromoBanner__close'],
        onClick: onClose
    }, /*#__PURE__*/ React.createElement(Icon24Dismiss, null))), /*#__PURE__*/ React.createElement(SimpleCell, {
        href: bannerData.trackingLink,
        onClick: onClick,
        rel: "nofollow noopener noreferrer",
        target: "_blank",
        before: bannerData.iconLink && /*#__PURE__*/ React.createElement(Image, {
            size: 48,
            src: bannerData.iconLink,
            alt: bannerData.title,
            "data-testid": process.env.NODE_ENV === 'test' ? 'avatar' : undefined
        }),
        after: bannerData.ctaText && /*#__PURE__*/ React.createElement(Button, {
            mode: "outline",
            "data-testid": process.env.NODE_ENV === 'test' ? 'button-ctaText' : undefined
        }, bannerData.ctaText),
        subtitle: bannerData.domain
    }, bannerData.title), currentPixel.length > 0 && /*#__PURE__*/ React.createElement("div", {
        className: styles['PromoBanner__pixels']
    }, /*#__PURE__*/ React.createElement("img", {
        src: currentPixel,
        alt: ""
    })));
};

//# sourceMappingURL=PromoBanner.js.map