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
            <small class="timer" aria-hidden="true"></small>
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
/** Defines the valid options for toast themes. */
var TOAST_THEME;
(function (TOAST_THEME) {
    TOAST_THEME[TOAST_THEME["LIGHT"] = 1] = "LIGHT";
    TOAST_THEME[TOAST_THEME["DARK"] = 2] = "DARK";
})(TOAST_THEME || (TOAST_THEME = {}));
/** Defines the valid options for toast header timers. */
var TOAST_TIMERS;
(function (TOAST_TIMERS) {
    TOAST_TIMERS[TOAST_TIMERS["DISABLED"] = 0] = "DISABLED";
    TOAST_TIMERS[TOAST_TIMERS["ELAPSED"] = 1] = "ELAPSED";
    TOAST_TIMERS[TOAST_TIMERS["COUNTDOWN"] = 2] = "COUNTDOWN";
})(TOAST_TIMERS || (TOAST_TIMERS = {}));
class Toast {
    /**
     * Shorthand function for quickly setting multiple global toast configurations.
     * @param {IConfiguration} options Object containing all the desired toast options.
     */
    static configure(options) {
        this.setMaxCount(options === null || options === void 0 ? void 0 : options.maxToasts);
        this.setPlacement(options === null || options === void 0 ? void 0 : options.placement);
        this.setTheme(options === null || options === void 0 ? void 0 : options.theme);
        this.enableTimers(options === null || options === void 0 ? void 0 : options.enableTimers);
        this.enableQueue(options === null || options === void 0 ? void 0 : options.enableQueue);
    }
    /**
     * Sets the maximum number of toasts allowed on the page at once.
     * @param {number} maxToasts Maximum number of toasts allowed on the page at once.
     */
    static setMaxCount(maxToasts) {
        if (maxToasts !== null) {
            if (maxToasts > 0) {
                this.maxToastCount = maxToasts;
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
     * @param {TOAST_THEME} theme The toast theme.
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
     * Sets whether timers in the toast header will display elapsed time or a countdown.
     * Timers display elapsed time by default.
     * @param type The timer type.
     */
    static enableTimers(type) {
        this.timersEnabled = type;
    }
    /**
     * Enables or disables toasts queueing after the maximum toast count is reached.
     * Queuing is enabled by default.
     * @param {boolean} enabled Controls whether queue is enabled.
     */
    static enableQueue(enabled = true) {
        this.queueEnabled = enabled;
        // Empty the queue once it's disabled.
        if (!enabled)
            this.queue = [];
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
        this.setStatus(toastEl, toastOptions.status);
        // Add toast to the queue if it would exceed maxToastCount
        if (this.currentToastCount >= this.maxToastCount) {
            if (!this.queueEnabled)
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
        this.render(toastInfo);
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
        this.renderTimer(toastInfo);
        TOAST_CONTAINER.appendChild(toastInfo.toast);
        // Initialize Bootstrap 5's toast plugin
        const bsToast = new window["bootstrap"].Toast(toastInfo.toast);
        bsToast.show();
        this.currentToastCount++;
        // When the toast hides, remove it from the DOM
        toastInfo.toast.addEventListener('hidden.bs.toast', () => {
            TOAST_CONTAINER.removeChild(toastInfo.toast);
            this.currentToastCount--;
            if (this.queueEnabled && this.queue.length > 0 && this.currentToastCount < this.maxToastCount) {
                const queuedToast = this.queue.shift();
                this.render(queuedToast);
            }
        });
    }
    /**
     * Handles the rendering of the timer in the toast header.
     * @param toastInfo The toast object to be rendered.
     */
    static renderTimer(toastInfo) {
        let timer = toastInfo.toast.querySelector(".timer");
        switch (this.timersEnabled) {
            case TOAST_TIMERS.ELAPSED: {
                timer.innerText = "just now";
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
                break;
            }
            case TOAST_TIMERS.COUNTDOWN: {
                if (toastInfo.timeout > 0) {
                    // Start a timer that updates the text of the time indicator every minute
                    // Initially set to 1 because for the first minute the indicator reads "just now"
                    let seconds = toastInfo.timeout / 1000;
                    timer.innerText = `${seconds}s`;
                    let countdownTimer = setInterval(() => {
                        timer.innerText = `${seconds - 1}s`;
                        seconds--;
                    }, 1000);
                    // When the toast hides, delete its timer instance
                    toastInfo.toast.addEventListener('hidden.bs.toast', () => {
                        clearInterval(countdownTimer);
                    });
                    break;
                }
            }
            default: {
                let toastHeader = toastInfo.toast.querySelector(".toast-header");
                toastHeader.removeChild(timer);
                break;
            }
        }
    }
    /**
     * @deprecated This will be removed in a future version. Migrate to the new configure method.
     *
     * Shorthand function for quickly setting multiple global toast configurations.
     * @param {number} maxToasts The maximum number of toasts allowed on the page at once.
     * @param {number} placement The toast container's placement on-screen, defaults to top right. This will not affect small screens in portrait.
     * @param {number} theme The toasts' theme, either light or dark. If unset, they will follow OS light/dark preference.
     * @param {boolean} enableTimers Controls whether elapsed time will be displayed in the toast header.
     */
    static oldConfigure(maxToasts = null, placement = TOAST_PLACEMENT.TOP_RIGHT, theme = null, enableTimers = true) {
        const configuration = {
            maxToasts: maxToasts,
            placement: placement,
            theme: theme,
            enableTimers: enableTimers ? TOAST_TIMERS.ELAPSED : TOAST_TIMERS.DISABLED
        };
        this.configure(configuration);
    }
    /**
     * @deprecated This will be removed in a future version. Migrate to the new create method.
     *
     * Endpoint to generate Bootstrap toasts from a template and insert their HTML onto the page,
     * run timers for each's elapsed time since appearing, and remove them from the
     * DOM after they are hidden. Caps toast count at maxToastCount.
     * @param {string} title The text of the toast's header.
     * @param {string} message The text of the toast's body.
     * @param {TOAST_STATUS} status The status/urgency of the toast. Affects status icon and ARIA accessibility features. Defaults to 0, which renders no icon.
     * @param {number} timeout Time in ms until toast disappears automatically. Defaults to 0, which is indefinite.
     */
    static oldCreate(title, message, status = 0, timeout = 0) {
        const toast = {
            title: title,
            message: message,
            status: status,
            timeout: timeout
        };
        this.create(toast);
    }
    /**
     * @deprecated This will be removed in a future version. Migrate to the new enableTimers method.
     *
     * Enables or disables toasts displaying elapsed time since appearing in the header.
     * Timers are enabled by default.
     * @param {boolean} enabled Controls whether elapsed time will be displayed in the toast header.
     */
    static oldEnableTimers(enabled) {
        this.timersEnabled = enabled ? TOAST_TIMERS.ELAPSED : TOAST_TIMERS.DISABLED;
    }
}
/** Maximum amount of toasts to be allowed on the page at once. */
Toast.maxToastCount = 4;
/** Number of toasts currently rendered on the page. */
Toast.currentToastCount = 0;
/** Controls whether toasts will have elapsed or countdown timers. */
Toast.timersEnabled = TOAST_TIMERS.ELAPSED;
/** Controls whether to queue toasts that exceed the maximum toast count. */
Toast.queueEnabled = true;
Toast.queue = [];
//# sourceMappingURL=bootstrap-toaster.js.map