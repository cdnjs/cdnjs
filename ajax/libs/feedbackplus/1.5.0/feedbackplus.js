/*! FeedbackPlus v1.2.2 | (c) ColonelParrot and other contributors | MIT License */

; (function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
        typeof define === 'function' && define.amd ? define(factory) :
            global.FeedbackPlus = factory()
}(this, (function () {
    'use strict';
    class FeedbackPlus {

        // create necessary elements for reuse
        // also allows for customization by accessing the modal & backdrop properties
        constructor() {
            const modal = document.createElement('div')
            modal.classList.add('feedbackplus', 'feedbackplus-modal')
            modal.innerHTML = `<div class="feedbackplus feedbackplus-header"><h2 style="margin:5px 20px">Edit Screenshot</h2><svg class="feedbackplus feedbackplus-close"fill=#000000 height=24px viewBox="0 0 24 24"width=24px xmlns=http://www.w3.org/2000/svg style=margin-right:10px><path d="M0 0h24v24H0V0z"fill=none /><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"/></svg></div><div class="feedbackplus feedbackplus-canvas-container"><canvas class="feedbackplus feedbackplus-canvas"></canvas></div><div class="feedbackplus feedbackplus-footer"><div class="feedbackplus feedbackplus-tools"><div class="feedbackplus feedbackplus-button feedbackplus-tool feedbackplus-highlight-tool"><svg class="feedbackplus feedbackplus-tool-icon"fill=#0b57d0 height=20px viewBox="0 0 24 24"width=20px xmlns=http://www.w3.org/2000/svg enable-background="new 0 0 24 24"><g><rect fill=none height=24 width=24 /><path d="M17,5h-2V3h2V5z M15,15v6l2.29-2.29L19.59,21L21,19.59l-2.29-2.29L21,15H15z M19,9h2V7h-2V9z M19,13h2v-2h-2V13z M11,21h2 v-2h-2V21z M7,5h2V3H7V5z M3,17h2v-2H3V17z M5,21v-2H3C3,20.1,3.9,21,5,21z M19,3v2h2C21,3.9,20.1,3,19,3z M11,5h2V3h-2V5z M3,9h2 V7H3V9z M7,21h2v-2H7V21z M3,13h2v-2H3V13z M3,5h2V3C3.9,3,3,3.9,3,5z"/></g></svg> Highlight</div><div class="feedbackplus feedbackplus-button feedbackplus-tool feedbackplus-hide-tool"style="margin-left:10px;margin-right:10px"><svg class="feedbackplus feedbackplus-tool-icon"fill=#0b57d0 height=20px viewBox="0 0 24 24"width=20px xmlns=http://www.w3.org/2000/svg enable-background="new 0 0 24 24"><g><rect fill=none height=24 width=24 /></g><g><g><path d=M19,5v11.17l2,2V5c0-1.1-0.9-2-2-2H5.83l2,2H19z /><path d="M2.81,2.81L1.39,4.22L3,5.83V19c0,1.1,0.9,2,2,2h13.17l1.61,1.61l1.41-1.41L2.81,2.81z M5,19V7.83l7.07,7.07L11.25,16 L9,13l-3,4h8.17l2,2H5z"/></g></g></svg> Hide</div></div><div class="feedbackplus feedbackplus-finish-actions"><div class="feedbackplus feedbackplus-button feedbackplus-cancel"style=margin-right:10px>Cancel</div><div class="feedbackplus feedbackplus-button feedbackplus-complete"style=border-color:#0b57d0;background-color:#0b57d0;color:#fff>Done</div></div></div>`

            const backdrop = document.createElement('div')
            backdrop.classList.add('feedbackplus', 'feedbackplus-backdrop')

            this.modal = modal;
            this.backdrop = backdrop;
        }

        /**
        * Checks whether the base APIs needed are supported. Does not account for the presence of html2canvas
        */
        static isRootSupported() {
            return !!navigator?.mediaDevices?.getDisplayMedia && !!window.HTMLCanvasElement;
        }

        /**
        * Checks whether the library can be used. Accounts for presence of html2canvas
        */
        static isSupported() {
            const isRootSupported = FeedbackPlus.isRootSupported()
            if (!isRootSupported) {
                return !!window.html2canvas
            }
            return isRootSupported
        }

        /**
        * Captures a screenshot of the page. Fallbacks to `html2canvas` if available
        * @param {Number} timeout - Default `500`ms. Timeout between call & capture. Can be used to wait for animations to finish before capture
        * @returns {Promise} promise - A promise that, when resolved, provides an ImageBitmap
        */
        async capture(timeout = 500) {
            if (FeedbackPlus.isSupported()) {
                if (FeedbackPlus.isRootSupported()) {
                    return new Promise((resolve, reject) => {
                        navigator.mediaDevices.getDisplayMedia({ video: true, preferCurrentTab: true }).then(stream => {
                            const video = document.createElement('video')
                            setTimeout(() => { 
                                video.srcObject = stream
                                video.onloadedmetadata = () => {
                                    video.play()
                                    video.pause()
    
                                    const canvas = document.createElement('canvas')
                                    canvas.width = video.videoWidth
                                    canvas.height = video.videoHeight
                                    canvas.getContext('2d').drawImage(video, 0, 0)
                                    stream.getVideoTracks().forEach(track => track.stop())
                                    FeedbackPlus.canvasToBitmap(canvas).then(bitmap => resolve(bitmap))
                                }
                             }, timeout)
                        }).catch(e => reject(e))
                    })
                } else {
                    return new Promise((resolve, reject) => {
                        setTimeout(function () {
                            html2canvas(document.body, { logging: false, windowWidth: window.screen.width + 'px' }).then(function (canvas) {
                                FeedbackPlus.canvasToBitmap(canvas).then(bitmap => {
                                    resolve(bitmap)
                                })
                            }).catch(e => reject(e))
                        }, timeout)
                    })
                }
            }
        }

        /**
        * Shows an edit dialog for an ImageBitmap. Should be used with the ImageBitmap 
        * returned from {@link capture()}
        * @param {ImageBitmap} bitmap - The ImageBitmap to edit
        * @param {Function} onComplete - callback function called when user finishes editing
        * @param {Function} onCancel - callback function called when user cancels edit
        * @param {Object} options - options for edit dialog. See the docs for more details
        * @returns {HTMLCanvasElement} canvas - Canvas passed to `onComplete` function, nothing passed to `onCancel`
        */
        showEditDialog(bitmap, onComplete, onCancel, options) {
            options = options || {};
            options.allowHighlight = options.allowHighlight ?? true;
            options.allowHide = options.allowHide ?? true;
            const { allowHighlight, allowHide } = options;

            function clearListeners() {
                canvasContainer.removeEventListener('mousedown', mousedownListener)
                canvasContainer.removeEventListener('mousemove', mouseMoveListener)
                document.body.removeEventListener('mouseup', mouseUpListener)
                canvasContainer.removeEventListener('mousedown', editDeleteMousedownListener, true)
                doneButton.removeEventListener('click', doneListener)
                cancelButton.removeEventListener('click', cancelListener)
                closeButton.removeEventListener('click', cancelListener)
                modalToolsOptions.forEach(option => {
                    option.removeEventListener('click', modalOptionListener)
                })
                document.body.removeEventListener('keypress', undoListener)
            }
            const { modal, backdrop } = this;
            const modalToolsOptions = modal.querySelectorAll('.feedbackplus.feedbackplus-tool')
            const modalOptionListener = function (e) {
                modalToolsOptions.forEach(option => option.classList.remove('feedbackplus-active'))
                e.target.closest('.feedbackplus.feedbackplus-tool').classList.add('feedbackplus-active')
            }
            modalToolsOptions.forEach(option => {
                option.addEventListener('click', modalOptionListener)
            })
            const canvas = modal.querySelector('.feedbackplus.feedbackplus-canvas')
            canvas.width = bitmap.width;
            canvas.height = bitmap.height;
            canvas.getContext('2d').drawImage(bitmap, 0, 0)

            const cloneCanvas = document.createElement('canvas')
            cloneCanvas.width = bitmap.width;
            cloneCanvas.height = bitmap.height;
            cloneCanvas.getContext('2d').drawImage(bitmap, 0, 0)

            const feedbackHighlightTool = modal.querySelector('.feedbackplus.feedbackplus-highlight-tool')
            const feedbackHideTool = modal.querySelector('.feedbackplus.feedbackplus-hide-tool')

            const feedbackHighlight = document.createElement('div')
            feedbackHighlight.classList.add('feedbackplus', 'feedbackplus-highlight', 'feedbackplus-edit')
            feedbackHighlight.innerHTML = `<svg fill=#000000 height=20px class="feedbackplus feedbackplus-tool-close"style="display:none"viewBox="0 0 24 24"width=20px xmlns=http://www.w3.org/2000/svg><path d="M0 0h24v24H0V0z"fill=none></path><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"></path></svg>`

            const feedbackHide = document.createElement('div')
            feedbackHide.classList.add('feedbackplus', 'feedbackplus-hide', 'feedbackplus-edit')
            feedbackHide.innerHTML = `<svg fill=#000000 height=20px class="feedbackplus feedbackplus-tool-close"style="display:none"viewBox="0 0 24 24"width=20px xmlns=http://www.w3.org/2000/svg><path d="M0 0h24v24H0V0z"fill=none></path><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"></path></svg>`
            let highlightElem = null;
            const canvasContainer = modal.querySelector('.feedbackplus.feedbackplus-canvas-container')
            let startX;
            let startY;

            const mousedownListener = function (e) {
                if (highlightElem) {
                    mouseUpListener(e)
                }

                let isHighlight = feedbackHighlightTool.classList.contains('feedbackplus-active')
                if (allowHighlight && isHighlight) {
                    highlightElem = feedbackHighlight.cloneNode(true)
                } else if (allowHide && feedbackHideTool.classList.contains('feedbackplus-active')) {
                    highlightElem = feedbackHide.cloneNode(true)
                } else {
                    return;
                }
                const x = e.pageX;
                const y = e.pageY;
                const offset = canvasContainer.getBoundingClientRect()
                const [realX, realY] = [x - offset.left + canvasContainer.scrollLeft - (isHighlight ? 5 : 0), y - offset.top + canvasContainer.scrollTop - (isHighlight ? 5 : 0)]
                startX = realX;
                startY = realY;
                highlightElem.style.top = startY + "px";
                highlightElem.style.left = startX + "px";
                canvasContainer.appendChild(highlightElem)
            }
            canvasContainer.addEventListener('mousedown', mousedownListener)

            const mouseMoveListener = function (e) {
                if (highlightElem) {
                    e.preventDefault();
                    let isHighlight = feedbackHighlightTool.classList.contains('feedbackplus-active')

                    const offset = canvasContainer.getBoundingClientRect()
                    const x = e.pageX - offset.left + canvasContainer.scrollLeft - (isHighlight ? 5 : 0);
                    const y = e.pageY - offset.top + canvasContainer.scrollTop - (isHighlight ? 5 : 0);
                    const Xdiff = (x - startX);
                    const Ydiff = (y - startY);
                    if (Xdiff < 0) {
                        highlightElem.style.left = startX + Xdiff + "px";
                        highlightElem.style.width = startX - x + "px";
                    } else {
                        highlightElem.style.left = startX + "px";
                        highlightElem.style.width = Xdiff + "px";
                    }
                    if (Ydiff < 0) {
                        highlightElem.style.top = startY + Ydiff + "px";
                        highlightElem.style.height = startY - y + "px";
                    } else {
                        highlightElem.style.top = startY + "px";
                        highlightElem.style.height = Ydiff + "px";
                    }

                }
            }
            canvasContainer.addEventListener('mousemove', mouseMoveListener)

            const mouseUpListener = function (e) {
                if (highlightElem) {
                    highlightElem.querySelector('.feedbackplus.feedbackplus-tool-close').style.removeProperty('display')
                    if (highlightElem.offsetHeight < 30 && highlightElem.offsetWidth < 30) {
                        highlightElem.remove();
                    }
                    highlightElem = null;
                }
            }
            document.body.addEventListener('mouseup', mouseUpListener)

            const editDeleteMousedownListener = function (e) {
                if (e.target.closest('.feedbackplus-tool-close')) {
                    e.stopPropagation()
                    e.target.closest('.feedbackplus-highlight')?.remove()
                    e.target.closest('.feedbackplus-hide')?.remove()
                }
            }
            canvasContainer.addEventListener('mousedown', editDeleteMousedownListener, true)

            const doneListener = () => {
                const edits = canvasContainer.querySelectorAll('.feedbackplus.feedbackplus-edit')
                const cloneCanvasContext = cloneCanvas.getContext('2d')
                cloneCanvasContext.lineWidth = 5
                cloneCanvasContext.strokeStyle = "#FCC934"
                cloneCanvasContext.fillStyle = "black"
                edits.forEach(edit => {
                    let { top, left, width, height } = edit.style;
                    top = +top.slice(0, -2)
                    left = +left.slice(0, -2)
                    width = +width.slice(0, -2)
                    height = +height.slice(0, -2)
                    if (edit.classList.contains('feedbackplus-highlight')) {
                        cloneCanvasContext.strokeRect(left + 2.5, top + 2.5, width + 5, height + 5)
                    } else if (edit.classList.contains('feedbackplus-hide')) {
                        cloneCanvasContext.fillRect(left, top, width, height)
                    }
                })

                clearListeners()
                this.clearEdits()
                onComplete(cloneCanvas)
            }
            const doneButton = modal.querySelector('.feedbackplus.feedbackplus-complete')
            doneButton.addEventListener('click', doneListener)

            const cancelButton = modal.querySelector('.feedbackplus.feedbackplus-cancel')
            const closeButton = modal.querySelector('.feedbackplus.feedbackplus-close')

            const cancelListener = () => {
                clearListeners()
                this.clearEdits()
                onCancel()
            }
            cancelButton.addEventListener('click', cancelListener)
            closeButton.addEventListener('click', cancelListener)

            const undoListener = (e) => {
                if (e.ctrlKey && e.keyCode == 26) {
                    const edits = canvasContainer.querySelectorAll('.feedbackplus.feedbackplus-edit')
                    const lastEdit = edits[edits.length - 1]
                    if (lastEdit) {
                        lastEdit.remove()
                    }
                }
            }

            document.body.addEventListener('keypress', undoListener)

            document.body.appendChild(modal)
            document.body.appendChild(backdrop)

            feedbackHideTool.style.display = allowHide ? "inherit" : "none";
            feedbackHighlightTool.style.display = allowHighlight ? "inherit" : "none";

            const visibleTools = modal.querySelectorAll('.feedbackplus.feedbackplus-tool')
            visibleTools.forEach(e => e.classList.remove('feedbackplus-active'))
            for (const tool of visibleTools) {
                if (window.getComputedStyle(tool).display != "none") {
                    tool.classList.add('feedbackplus-active')
                    break;
                }
            }
        }

        /**
        * Closes the edit dialog. Should be called in the `onComplete` and `onCancel` callbacks for {@link showEditDialog()}
        */
        closeEditDialog() {
            const { modal, backdrop } = this;
            modal.remove()
            backdrop.remove()
        }

        /**
        * Removes all edits made by the user thus far in the edit dialog
        */
        clearEdits() {
            const { modal, backdrop } = this;
            const canvasContainer = modal.querySelector('.feedbackplus.feedbackplus-canvas-container')
            const edits = canvasContainer.querySelectorAll('.feedbackplus.feedbackplus-edit')
            edits.forEach(edit => edit.remove())
        }

        /**
        * Converts a canvas to an ImageBitmap. Can be called on the canvas returned by {@link showEditDialog()} to redraw on canvas
        * @param {HTMLCanvasElement} canvas - The canvas
        * @returns {Promise} promise - A promise which, when resolved, returns the ImageBitmap
        */
        static canvasToBitmap(canvas) {
            return new Promise((resolve, reject) => {
                const canvasContext = canvas.getContext('2d')
                const imageData = canvasContext.getImageData(0, 0, canvas.width, canvas.height)
                createImageBitmap(imageData).then(bitmap => {
                    resolve({
                        bitmap,
                        width: bitmap.width,
                        height: bitmap.height
                    })
                })
            })
        }
    }

    return FeedbackPlus
})));