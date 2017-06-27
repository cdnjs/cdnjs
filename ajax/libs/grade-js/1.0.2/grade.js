(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.Grade = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
class Grade {
    constructor(container) {
        this.container = container
        this.image = this.container.querySelector('img')
        this.canvas = document.createElement('canvas')
        this.ctx = this.canvas.getContext('2d')
        this.imageDimensions = {
            width: 0,
            height: 0
        }
        this.imageData = []
        this.readImage()
    }

    readImage() {
        this.imageDimensions.width = this.image.width
        this.imageDimensions.height = this.image.height
        this.render()
    }

    getImageData() {
        this.imageData = this.ctx.getImageData(
            0, 0, this.imageDimensions.width, this.imageDimensions.height
        ).data
    }

    getChunkedImageData() {
        const perChunk = 4

        return this.imageData.reduce((ar, it, i) => {
            const ix = Math.floor(i / perChunk)
            if (!ar[ix]) {
                ar[ix] = []
            }
            ar[ix].push(it)
            return ar
        }, [])
    }

    getRGBAGradientValues(top) {
        return top.map((color, index) => {
            return `rgb(${color.rgba.slice(0, 3).join(',')})`
        }).join(',')
    }

    getCSSGradientProperty(top) {
        return `linear-gradient(
                    to bottom right,
                    ${this.getRGBAGradientValues(top)}
                )`
    }

    getTopValues(uniq) {
        return [
            ...Object.keys(uniq).map(key => {
                const rgbaKey = key
                let components = key.split('|'),
                    brightness = ((components[0] * 299) + (components[1] * 587) + (components[2] * 114)) / 1000
                return {
                    rgba: rgbaKey.split('|'),
                    occurs: uniq[key]
                }
            }).sort((a, b) => a.brightness - b.brightness).reverse().slice(0, 2)
        ]
    }

    getUniqValues(chunked) {
        return chunked.reduce((accum, current) => {
            let key = current.join('|')
            if (!accum[key]) {
                accum[key] = 1
                return accum
            }
            accum[key] = ++(accum[key])
            return accum
        }, {})
    }

    renderGradient() {
        let chunked = this.getChunkedImageData()
        let gradientProperty = this.getCSSGradientProperty(this.getTopValues(this.getUniqValues(chunked)))
        this.container.style.backgroundImage = gradientProperty
    }

    render() {
        this.canvas.width = this.imageDimensions.width
        this.canvas.height = this.imageDimensions.height
        this.ctx.drawImage(this.image, 0, 0)
        this.getImageData()
        this.renderGradient()
    }
}

module.exports = (containers) => {
    Array.from(containers).forEach(container => new Grade(container))
}

},{}]},{},[1])(1)
});