import vkBridge from '@vkontakte/vk-bridge';
export function runTapticImpactOccurred(style) {
  if (vkBridge.supports('VKWebAppTapticImpactOccurred')) {
    vkBridge.send('VKWebAppTapticImpactOccurred', {
      style: style
    }).catch(function () {
      return undefined;
    });
  }
}
//# sourceMappingURL=taptic.js.map