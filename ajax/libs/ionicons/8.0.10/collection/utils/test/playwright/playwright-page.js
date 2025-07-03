import { test as base } from "@playwright/test";
import { goto as goToPage } from "./page/utils";
/**
 * Extends the base `page` test figure within Playwright.
 * @param page The page to extend.
 * @param testInfo The test info.
 * @returns The modified playwright page with extended functionality.
 */
export async function extendPageFixture(page, testInfo) {
    const originalGoto = page.goto.bind(page);
    /**
     * Adds a global flag on the window that the test suite
     * can use to determine when it is safe to execute tests
     * on hydrated Stencil components.
     */
    await page.addInitScript(`
  (function() {
    window.addEventListener('appload', () => {
      window.testAppLoaded = true;
    });
  })();`);
    // Overridden Playwright methods
    page.goto = (url, options) => goToPage(page, url, options, testInfo, originalGoto);
    return page;
}
export const test = base.extend({
    page: async ({ page }, use, testInfo) => {
        page = await extendPageFixture(page, testInfo);
        await use(page);
    },
});
