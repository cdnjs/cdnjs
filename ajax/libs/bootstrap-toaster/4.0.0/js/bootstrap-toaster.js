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
TOAST_CONTAINER.className = "position-fixed top-0 right-0";
TOAST_CONTAINER.setAttribute("aria-live", "polite");
document.body.appendChild(TOAST_CONTAINER);

/** HTML markup for the toast template. */
const TOAST_TEMPLATE = document.createElement("div");
TOAST_TEMPLATE.className = "toast";
TOAST_TEMPLATE.setAttribute("role", "status");
TOAST_TEMPLATE.setAttribute("aria-live", "polite");
TOAST_TEMPLATE.setAttribute("aria-atomic", "true");
TOAST_TEMPLATE.setAttribute("data-autohide", "false");
TOAST_TEMPLATE.innerHTML = `
        <div class="toast-header">
            <span class="status-icon bi mr-2" aria-hidden="true"></span>
            <strong class="mr-auto toast-title"></strong>
            <small class="timer" aria-hidden="true">just now</small>
            <button type="button" class="ml-2 mb-1 close" data-dismiss="toast" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
        </div>
        <div class="toast-body"></div>`;

/** Emulates enum functionality for setting toast statuses without needing to remember actual values. */
const TOAST_STATUS = {
    SUCCESS: 1,
    DANGER: 2,
    WARNING: 3,
    INFO: 4
};
/** Emulates enum functionality for setting toast container placement. */
const TOAST_PLACEMENT = {
    TOP_LEFT: 1,
    TOP_CENTER: 2,
    TOP_RIGHT: 3,
    MIDDLE_LEFT: 4,
    MIDDLE_CENTER: 5,
    MIDDLE_RIGHT: 6,
    BOTTOM_LEFT: 7,
    BOTTOM_CENTER: 8,
    BOTTOM_RIGHT: 9
};
/** Emulates enum functionality for setting toast themes. */
const TOAST_THEME = {
    LIGHT: 1,
    DARK: 2
};

/** Maximum amount of toasts to be allowed on the page at once. */
var maxToastCount = 4;
/** Number of toasts currently rendered on the page. */
var currentToastCount = 0;
/** Controls whether elapsed time will be displayed in the toast header. */
var enableTimers = true;

class Toast {

    /**
     * Shorthand function for quickly setting multiple global toast configurations.
     * @param {number} maxToasts The maximum number of toasts allowed on the page at once.
     * @param {number} placement The toast container's placement on-screen, defaults to top right. This will not affect small screens in portrait.
     * @param {number} theme The toasts' theme, either light or dark. If unset, they will follow OS light/dark preference.
     * @param {boolean} enableTimers Controls whether elapsed time will be displayed in the toast header.
     */
    static configure(maxToasts = null, placement = TOAST_PLACEMENT.TOP_RIGHT, theme = null, enableTimers = true) {
        Toast.setMaxCount(maxToasts);

        Toast.setPlacement(placement);

        Toast.setTheme(theme);

        Toast.enableTimers(enableTimers);
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
     * @param {number} placement Placement of the toast container.
     */
    static setPlacement(placement) {
        TOAST_CONTAINER.className = "position-fixed";
        switch (placement) {
            case TOAST_PLACEMENT.TOP_LEFT:
                TOAST_CONTAINER.classList.add("top-0", "left-0");
                break;
            case TOAST_PLACEMENT.TOP_CENTER:
                TOAST_CONTAINER.classList.add("top-0", "left-50", "translate-middle-x");
                break;
            case TOAST_PLACEMENT.TOP_RIGHT:
                TOAST_CONTAINER.classList.add("top-0", "right-0");
                break;
            case TOAST_PLACEMENT.MIDDLE_LEFT:
                TOAST_CONTAINER.classList.add("top-50", "left-0", "translate-middle-y");
                break;
            case TOAST_PLACEMENT.MIDDLE_CENTER:
                TOAST_CONTAINER.classList.add("top-50", "left-50", "translate-middle");
                break;
            case TOAST_PLACEMENT.MIDDLE_RIGHT:
                TOAST_CONTAINER.classList.add("top-50", "right-0", "translate-middle-y");
                break;
            case TOAST_PLACEMENT.BOTTOM_LEFT:
                TOAST_CONTAINER.classList.add("bottom-0", "left-0");
                break;
            case TOAST_PLACEMENT.BOTTOM_CENTER:
                TOAST_CONTAINER.classList.add("bottom-0", "left-50", "translate-middle-x");
                break;
            case TOAST_PLACEMENT.BOTTOM_RIGHT:
                TOAST_CONTAINER.classList.add("bottom-0", "right-0");
                break;
            default:
                TOAST_CONTAINER.classList.add("top-0", "right-0");
                break;
        }
    }

    /**
     * Sets the toasts' theme to light or dark. If unset, they will follow OS light/dark preference.
     * @param {number} theme The toast theme. Options are TOAST_THEME.LIGHT and TOAST_THEME.DARK.
     */
    static setTheme(theme = null) {
        let header = TOAST_TEMPLATE.querySelector(".toast-header");
        let close = header.querySelector(".close");
        switch (theme) {
            case TOAST_THEME.LIGHT:
                TOAST_TEMPLATE.style.backgroundColor = "var(--body-bg-color-light)";
                TOAST_TEMPLATE.style.color = "var(--text-color-light)";
                header.style.backgroundColor = "var(--header-bg-color-light)";
                header.style.color = "var(--header-color-light)";
                close.style.color = "var(--text-color-light)";
                break;
            case TOAST_THEME.DARK:
                TOAST_TEMPLATE.style.backgroundColor = "var(--body-bg-color-dark)";
                TOAST_TEMPLATE.style.color = "var(--text-color-dark)";
                header.style.backgroundColor = "var(--header-bg-color-dark)";
                header.style.color = "var(--header-color-dark)";
                close.style.color = "var(--text-color-dark)";
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
     * Endpoint to generate Bootstrap toasts from a template and insert their HTML onto the page,
     * run timers for each's elapsed time since appearing, and remove them from the
     * DOM after they are hidden. Caps toast count at maxToastCount.
     * @param {string} title The text of the toast's header.
     * @param {string} message The text of the toast's body.
     * @param {number} status The status/urgency of the toast. Affects status icon and ARIA accessibility features. Defaults to 0, which renders no icon.
     * @param {number} timeout Time in ms until toast disappears automatically. Defaults to 0, which is indefinite.
     */
    static create(title, message, status = 0, timeout = 0) {
        if (currentToastCount >= maxToastCount)
            return;

        let toast = TOAST_TEMPLATE.cloneNode(true);

        let toastTitle = toast.querySelector(".toast-title");
        toastTitle.innerText = title;

        let toastBody = toast.querySelector(".toast-body");
        toastBody.innerHTML = message;

        Toast._setStatus(toast, status);

        Toast._render(toast, timeout);
    }

    /**
     * Sets the status icon and modifies ARIA properties if the context necessitates it
     * @param {Node} toast The HTML of the toast being modified.
     * @param {number} status The integer value representing the toast's status.
     */
    static _setStatus(toast, status) {
        let statusIcon = toast.querySelector(".status-icon");

        switch (status) {
            case TOAST_STATUS.SUCCESS:
                statusIcon.classList.add("text-success", "bi-check-circle-fill");
                break;
            case TOAST_STATUS.DANGER:
                statusIcon.classList.add("text-danger", "bi-x-circle-fill");
                toast.setAttribute("role", "alert");
                toast.setAttribute("aria-live", "assertive");
                break;
            case TOAST_STATUS.WARNING:
                statusIcon.classList.add("text-warning", "bi-exclamation-circle-fill");
                toast.setAttribute("role", "alert");
                toast.setAttribute("aria-live", "assertive");
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
     * @param {Node} toast The HTML of the toast being modified.
     * @param {number} timeout Time in ms until toast disappears automatically. Indefinite if zero.
     */
    static _render(toast, timeout) {
        if (timeout > 0) {
            toast.setAttribute("data-delay", timeout);
            toast.setAttribute("data-autohide", true);
        }

        let timer = toast.querySelector(".timer");

        if (enableTimers) {
            // Start a timer that updates the text of the time indicator every minute
            // Initially set to 1 because for the first minute the indicator reads "just now"
            let minutes = 1
            let elapsedTimer = setInterval(() => {
                timer.innerText = `${minutes}m ago`;
                minutes++;
            }, 60 * 1000);

            // When the toast hides, delete its timer instance
            $(toast).on('hidden.bs.toast', () => {
                clearInterval(elapsedTimer);
            });
        }
        else {
            let toastHeader = toast.querySelector(".toast-header");
            toastHeader.removeChild(timer);
        }

        TOAST_CONTAINER.appendChild(toast);
        $(toast).toast('show');
        currentToastCount++;

        // When the toast hides, remove it from the DOM
        $(toast).on('hidden.bs.toast', () => {
            TOAST_CONTAINER.removeChild(toast);
            currentToastCount--;
        });
    }
}
