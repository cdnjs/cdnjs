import vkBridge from "@vkontakte/vk-bridge";
/**
 * TODO [>=6]: удалить хук (#5049)
 * @deprecated v5.8.0
 */ export function runTapticImpactOccurred(style) {
    if (vkBridge.supports("VKWebAppTapticImpactOccurred")) {
        vkBridge.send("VKWebAppTapticImpactOccurred", {
            style: style
        }).catch(function() {
            return undefined;
        });
    }
}

//# sourceMappingURL=taptic.js.map