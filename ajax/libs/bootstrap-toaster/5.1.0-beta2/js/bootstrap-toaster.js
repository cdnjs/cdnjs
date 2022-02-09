/**
 * Copyright (c) 2021 Peyton Gasink
 * Distributed under MIT License.
 *
 * This file contains all the necessary scripting to programmatically
 * generate Bootstrap toasts. It first inserts a container at the bottom
 * of the DOM, then fills a toast template and inserts it into the container.
 *
 * Configuration options are also provided for toast placement, light & dark themes,
 * and the maximum number of toasts allowed on the page at a given time.
 */
/** Container that generated toasts will be inserted into. */
const TOAST_CONTAINER = document.createElement("div");
TOAST_CONTAINER.id = "toastContainer";
TOAST_CONTAINER.className = "toast-container position-fixed top-0 end-0";
TOAST_CONTAINER.setAttribute("aria-live", "polite");
document.body.appendChild(TOAST_CONTAINER);
/** HTML markup for the toast template. */
const TOAST_TEMPLATE = document.createElement("div");
TOAST_TEMPLATE.className = "toast";
TOAST_TEMPLATE.setAttribute("role", "status");
TOAST_TEMPLATE.setAttribute("aria-live", "polite");
TOAST_TEMPLATE.setAttribute("aria-atomic", "true");
TOAST_TEMPLATE.setAttribute("data-bs-autohide", "false");
TOAST_TEMPLATE.innerHTML = `
        <div class="toast-header">
            <span class="status-icon bi me-2" aria-hidden="true"></span>
            <strong class="me-auto toast-title"></strong>
            <small class="timer" aria-hidden="true">just now</small>
            <button type="button" class="btn-close ms-2" data-bs-dismiss="toast" aria-label="Close"></button>
        </div>
        <div class="toast-body"></div>`;
/** Defines the valid status options for toasts. */
var TOAST_STATUS;
(function (TOAST_STATUS) {
    TOAST_STATUS[TOAST_STATUS["SUCCESS"] = 1] = "SUCCESS";
    TOAST_STATUS[TOAST_STATUS["DANGER"] = 2] = "DANGER";
    TOAST_STATUS[TOAST_STATUS["WARNING"] = 3] = "WARNING";
    TOAST_STATUS[TOAST_STATUS["INFO"] = 4] = "INFO";
})(TOAST_STATUS || (TOAST_STATUS = {}));
;
/** Defines the valid placement options for the toast container. */
var TOAST_PLACEMENT;
(function (TOAST_PLACEMENT) {
    TOAST_PLACEMENT[TOAST_PLACEMENT["TOP_LEFT"] = 1] = "TOP_LEFT";
    TOAST_PLACEMENT[TOAST_PLACEMENT["TOP_CENTER"] = 2] = "TOP_CENTER";
    TOAST_PLACEMENT[TOAST_PLACEMENT["TOP_RIGHT"] = 3] = "TOP_RIGHT";
    TOAST_PLACEMENT[TOAST_PLACEMENT["MIDDLE_LEFT"] = 4] = "MIDDLE_LEFT";
    TOAST_PLACEMENT[TOAST_PLACEMENT["MIDDLE_CENTER"] = 5] = "MIDDLE_CENTER";
    TOAST_PLACEMENT[TOAST_PLACEMENT["MIDDLE_RIGHT"] = 6] = "MIDDLE_RIGHT";
    TOAST_PLACEMENT[TOAST_PLACEMENT["BOTTOM_LEFT"] = 7] = "BOTTOM_LEFT";
    TOAST_PLACEMENT[TOAST_PLACEMENT["BOTTOM_CENTER"] = 8] = "BOTTOM_CENTER";
    TOAST_PLACEMENT[TOAST_PLACEMENT["BOTTOM_RIGHT"] = 9] = "BOTTOM_RIGHT";
})(TOAST_PLACEMENT || (TOAST_PLACEMENT = {}));
;
/** Defines the valid options for toast themes. */
var TOAST_THEME;
(function (TOAST_THEME) {
    TOAST_THEME[TOAST_THEME["LIGHT"] = 1] = "LIGHT";
    TOAST_THEME[TOAST_THEME["DARK"] = 2] = "DARK";
})(TOAST_THEME || (TOAST_THEME = {}));
;
/** Maximum amount of toasts to be allowed on the page at once. */
var maxToastCount = 4;
/** Controls whether to queue toasts that exceed the maximum toast count. */
var enableQueue = true;
/** Number of toasts currently rendered on the page. */
var currentToastCount = 0;
/** Controls whether elapsed time will be displayed in the toast header. */
var enableTimers = true;
class Toast {
    /**
     * Shorthand function for quickly setting multiple global toast configurations.
     * @param {IConfiguration} options Object containing all the desired toast options.
     */
    static configure(options) {
        Toast.setMaxCount(options === null || options === void 0 ? void 0 : options.maxToasts);
        Toast.setPlacement(options === null || options === void 0 ? void 0 : options.placement);
        Toast.setTheme(options === null || options === void 0 ? void 0 : options.theme);
        Toast.enableTimers(options === null || options === void 0 ? void 0 : options.enableTimers);
        Toast.enableQueue(options === null || options === void 0 ? void 0 : options.enableQueue);
    }
    /**
     * Sets the maximum number of toasts allowed on the page at once.
     * @param {number} maxToasts Maximum number of toasts allowed on the page at once.
     */
    static setMaxCount(maxToasts) {
        if (maxToasts !== null) {
            if (maxToasts > 0) {
                maxToastCount = maxToasts;
            }
            else {
                console.error("The maximum number of toasts must be greater than 0. Reverting to default.");
            }
        }
    }
    /**
     * Sets the toast container's placement.
     * @param {TOAST_PLACEMENT} placement Placement of the toast container.
     */
    static setPlacement(placement) {
        TOAST_CONTAINER.className = "toast-container position-fixed";
        switch (placement) {
            case TOAST_PLACEMENT.TOP_LEFT:
                TOAST_CONTAINER.classList.add("top-0", "start-0");
                break;
            case TOAST_PLACEMENT.TOP_CENTER:
                TOAST_CONTAINER.classList.add("top-0", "start-50", "translate-middle-x");
                break;
            case TOAST_PLACEMENT.TOP_RIGHT:
                TOAST_CONTAINER.classList.add("top-0", "end-0");
                break;
            case TOAST_PLACEMENT.MIDDLE_LEFT:
                TOAST_CONTAINER.classList.add("top-50", "start-0", "translate-middle-y");
                break;
            case TOAST_PLACEMENT.MIDDLE_CENTER:
                TOAST_CONTAINER.classList.add("top-50", "start-50", "translate-middle");
                break;
            case TOAST_PLACEMENT.MIDDLE_RIGHT:
                TOAST_CONTAINER.classList.add("top-50", "end-0", "translate-middle-y");
                break;
            case TOAST_PLACEMENT.BOTTOM_LEFT:
                TOAST_CONTAINER.classList.add("bottom-0", "start-0");
                break;
            case TOAST_PLACEMENT.BOTTOM_CENTER:
                TOAST_CONTAINER.classList.add("bottom-0", "start-50", "translate-middle-x");
                break;
            case TOAST_PLACEMENT.BOTTOM_RIGHT:
                TOAST_CONTAINER.classList.add("bottom-0", "end-0");
                break;
            default:
                TOAST_CONTAINER.classList.add("top-0", "end-0");
                break;
        }
    }
    /**
     * Sets the toasts' theme to light or dark. If unset, they will follow OS light/dark preference.
     * @param {TOAST_THEME} theme The toast theme. Options are TOAST_THEME.LIGHT and TOAST_THEME.DARK.
     */
    static setTheme(theme = null) {
        let header = TOAST_TEMPLATE.querySelector(".toast-header");
        let close = header.querySelector(".btn-close");
        switch (theme) {
            case TOAST_THEME.LIGHT:
                TOAST_TEMPLATE.style.backgroundColor = "var(--body-bg-color-light)";
                TOAST_TEMPLATE.style.color = "var(--text-color-light)";
                header.style.backgroundColor = "var(--header-bg-color-light)";
                header.style.color = "var(--header-color-light)";
                close.style.filter = "unset";
                break;
            case TOAST_THEME.DARK:
                TOAST_TEMPLATE.style.backgroundColor = "var(--body-bg-color-dark)";
                TOAST_TEMPLATE.style.color = "var(--text-color-dark)";
                header.style.backgroundColor = "var(--header-bg-color-dark)";
                header.style.color = "var(--header-color-dark)";
                close.style.filter = "invert(1) grayscale(100%) brightness(200%)";
                break;
            default:
                TOAST_TEMPLATE.removeAttribute("style");
                header.removeAttribute("style");
                close.removeAttribute("style");
                break;
        }
    }
    /**
     * Enables or disables toasts displaying elapsed time since appearing in the header.
     * Timers are enabled by default.
     * @param {boolean} enabled Controls whether elapsed time will be displayed in the toast header.
     */
    static enableTimers(enabled = true) {
        enableTimers = enabled;
    }
    /**
     * Enables or disables toasts queueing after the maximum toast count is reached.
     * Queuing is enabled by default.
     * @param {boolean} enabled Controls whether queue is enabled.
     */
    static enableQueue(enabled = true) {
        enableQueue = enabled;
    }
    /**
     * Endpoint to generate Bootstrap toasts from a template and insert their HTML onto the page,
     * run timers for each's elapsed time since appearing, and remove them from the
     * DOM after they are hidden. Caps toast count at maxToastCount.
     * @param {IToastOptions} toastOptions Object containing all the desired toast options.
     */
    static create(toastOptions) {
        let toastEl = TOAST_TEMPLATE.cloneNode(true);
        let toastTitle = toastEl.querySelector(".toast-title");
        toastTitle.innerText = toastOptions.title;
        let toastBody = toastEl.querySelector(".toast-body");
        toastBody.innerHTML = toastOptions.message;
        Toast.setStatus(toastEl, toastOptions.status);
        // Add toast to the queue if it would exceed maxToastCount
        if (currentToastCount >= maxToastCount) {
            if (!enableQueue)
                return;
            const toastToQueue = {
                toast: toastEl,
                timeout: toastOptions.timeout
            };
            this.queue.push(toastToQueue);
            return;
        }
        const toastInfo = {
            toast: toastEl,
            timeout: toastOptions.timeout
        };
        Toast.render(toastInfo);
    }
    /**
     * Sets the status icon and modifies ARIA properties if the context necessitates it
     * @param {HTMLElement} toastEl The HTML of the toast being modified.
     * @param {TOAST_STATUS} status The integer value representing the toast's status.
     */
    static setStatus(toastEl, status) {
        let statusIcon = toastEl.querySelector(".status-icon");
        switch (status) {
            case TOAST_STATUS.SUCCESS:
                statusIcon.classList.add("text-success", "bi-check-circle-fill");
                break;
            case TOAST_STATUS.DANGER:
                statusIcon.classList.add("text-danger", "bi-x-circle-fill");
                toastEl.setAttribute("role", "alert");
                toastEl.setAttribute("aria-live", "assertive");
                break;
            case TOAST_STATUS.WARNING:
                statusIcon.classList.add("text-warning", "bi-exclamation-circle-fill");
                toastEl.setAttribute("role", "alert");
                toastEl.setAttribute("aria-live", "assertive");
                break;
            case TOAST_STATUS.INFO:
                statusIcon.classList.add("text-info", "bi-info-circle-fill");
                break;
            default:
                statusIcon.classList.add("d-none");
                break;
        }
    }
    /**
     * Inserts toast HTML onto page and sets up for toast deletion.
     * @param {IToast} toastInfo The toast object to be rendered.
     */
    static render(toastInfo) {
        // If the timeout is 0, the toast must be dismissed manually
        if (toastInfo.timeout > 0) {
            toastInfo.toast.setAttribute("data-bs-delay", toastInfo.timeout.toString());
            toastInfo.toast.setAttribute("data-bs-autohide", "true");
        }
        let timer = toastInfo.toast.querySelector(".timer");
        if (enableTimers) {
            // Start a timer that updates the text of the time indicator every minute
            // Initially set to 1 because for the first minute the indicator reads "just now"
            let minutes = 1;
            let elapsedTimer = setInterval(() => {
                timer.innerText = `${minutes}m ago`;
                minutes++;
            }, 60 * 1000);
            // When the toast hides, delete its timer instance
            toastInfo.toast.addEventListener('hidden.bs.toast', () => {
                clearInterval(elapsedTimer);
            });
        }
        else {
            let toastHeader = toastInfo.toast.querySelector(".toast-header");
            toastHeader.removeChild(timer);
        }
        TOAST_CONTAINER.appendChild(toastInfo.toast);
        // Initialize Bootstrap 5's toast plugin
        const bsToast = new window["bootstrap"].Toast(toastInfo.toast);
        bsToast.show();
        currentToastCount++;
        // When the toast hides, remove it from the DOM
        toastInfo.toast.addEventListener('hidden.bs.toast', () => {
            TOAST_CONTAINER.removeChild(toastInfo.toast);
            currentToastCount--;
            if (enableQueue && this.queue.length > 0 && currentToastCount < maxToastCount) {
                const queuedToast = this.queue.shift();
                this.render(queuedToast);
            }
        });
    }
}
Toast.queue = [];
//# sourceMappingURL=bootstrap-toaster.js.map