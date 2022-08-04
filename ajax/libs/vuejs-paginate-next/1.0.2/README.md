# vuejs-paginate-next

![tests](https://github.com/cloudeep/vuejs-paginate-next/actions/workflows/test.yaml/badge.svg)
<a href="https://www.npmjs.com/package/vuejs-paginate-next">
<img src="https://img.shields.io/npm/v/vuejs-paginate-next.svg" alt="npm">
</a>
<a href="LICENSE">
<img src="https://img.shields.io/badge/License-MIT-yellow.svg" alt="MIT">
</a>

[![vue](https://badges.aleen42.com/src/vue.svg)](https://badges.aleen42.com/src/vue.svg)
[![javascript](https://badges.aleen42.com/src/javascript.svg)](https://badges.aleen42.com/src/javascript.svg)
[![vitejs](https://badges.aleen42.com/src/vitejs.svg)](https://badges.aleen42.com/src/vitejs.svg)
[![rollup](https://badges.aleen42.com/src/rollup.svg)](https://badges.aleen42.com/src/rollup.svg)

<!-- [![npm version](https://badge.fury.io/js/vuejs-paginate-next.svg)](https://badge.fury.io/js/vuejs-paginate-next) -->
<!-- [![npm](https://nodei.co/npm/vuejs-paginate-next.png)](https://nodei.co/npm/vuejs-paginate-next/) -->

<img src="https://raw.githubusercontent.com/cloudeep/vuejs-paginate-next/main/public/vuejs-paginate-next.gif" width="550"/>

A Vue.js (v3) component to make pagination, based on [vuejs-paginate](https://github.com/lokyoung/vuejs-paginate) from [lokyoung](https://github.com/lokyoung). Thank [bverheec](https://github.com/bverheec) for his Vue.js v3 solution in issue [#128](https://github.com/lokyoung/vuejs-paginate/issues/128).

Easy to use by providing simple api. And you can customize the style of this component by CSS.

<!-- [Online demo](https://jsfiddle.net/lokyoung/u3u3nzns/) -->

## Installation

### NPM

Install the npm package.

```js
$ npm install vuejs-paginate-next --save
```

Register the component.

```js
import Paginate from "vuejs-paginate-next";
```

---

_Note_: For users using original **vuejs-paginate** package, just directly adopt **initial-page** as initial page settign instead of **value**.

After Vue 3, the `Vue.use(Paginate)` is **deprecated**. You should use `app.createApp({...}).use(Paginate).mount('#app')` instead.

---

### CDN

Include the source file.

```html
<!-- use the latest release -->
<script src="https://unpkg.com/vuejs-paginate-next@latest/dist/vuejs-paginate-next.umd.js"></script>
<!-- or use the specify version -->
<script src="https://unpkg.com/vuejs-paginate-next@1.0.2/dist/vuejs-paginate-next.umd.js"></script>
```

## Usage

### In Vue Template

**Basic Usage**

```html
<paginate
  :page-count="20"
  :click-handler="functionName"
  :prev-text="'Prev'"
  :next-text="'Next'"
  :container-class="'className'"
>
</paginate>
```

_Note_: In vue template, camelCase and kebab-case are both supported. For example, you can either use prop `page-count` or `pageCount`. They are leading to the same result.

So this is also avaliable

```html
<paginate
  :pageCount="20"
  :clickHandler="functionName"
  :prevText="'Prev'"
  :nextText="'Next'"
  :containerClass="'className'"
>
</paginate>
```

**Example**

```html
<template>
  <paginate
    :page-count="20"
    :page-range="3"
    :margin-pages="2"
    :click-handler="clickCallback"
    :prev-text="'Prev'"
    :next-text="'Next'"
    :container-class="'pagination'"
    :page-class="'page-item'"
  >
  </paginate>
</template>

<script>
  import Paginate from 'vuejs-paginate-next';
  export default {
    components: {
      paginate: Paginate,
    },
    methods: {
      clickCallback (pageNum) => {
        console.log(pageNum)
      }
    },
  };
</script>

<style lang="css">
  /* Adopt bootstrap pagination stylesheet. */
  @import "https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css";

  /* Write your own CSS for pagination */
  .pagination {
  }
  .page-item {
  }
</style>
```

### Value Binding

Use `v-model` to set the selected page number. You can programmatically modify the current page by using this.

```html
<template>
  <paginate
    v-model="page"
    :page-count="20"
    :page-range="3"
    :margin-pages="2"
    :click-handler="clickCallback"
    :prev-text="'Prev'"
    :next-text="'Next'"
    :container-class="'pagination'"
    :page-class="'page-item'"
  >
  </paginate>
</template>

<script>
  export default {
    data() {
      return {
        page: 10,
      };
    },
  };
</script>
```

### In HTML

Must use kebab-case for props in pure HTML.

**Example**

JavaScript

```js
new Vue.createApp({
  components: {
    paginate: VuejsPaginateNext,
  },
  methods: {
    clickCallback: function (pageNum) {
      console.log(pageNum);
    },
  },
}).mount("#app");
```

HTML

```html
<div id="app">
  <paginate
    :page-count="10"
    :container-class="pagination"
    :prev-text="prev"
    :next-text="next"
    :click-handler="clickCallback"
  >
  </paginate>
</div>
```

## Props

| Name&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; | Type       | Description                                                                                                                                                                                                                                                                                           |
| ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :--------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `page-count`                                                                                                                                                                                                                                   | `Number`   | Total count of pages. **required**                                                                                                                                                                                                                                                                    |
| `page-range`                                                                                                                                                                                                                                   | `Number`   | Range of pages which displayed. **default: 3** <br> _(Note: It is recommended to use an odd number, so that the same number of pages are displayed before and after the active page. If using an even number, there will be one more page number before the active page than after the current page)_ |
| `margin-pages`                                                                                                                                                                                                                                 | `Number`   | The number of displayed pages for margins. **default: 1**                                                                                                                                                                                                                                             |
| `prev-text`                                                                                                                                                                                                                                    | `String`   | Text for the previous button. You can use HTML here. **default: Prev**                                                                                                                                                                                                                                |
| `next-text`                                                                                                                                                                                                                                    | `String`   | Text for the next button. You can use HTML here. **default: Next**                                                                                                                                                                                                                                    |
| `break-view-text`                                                                                                                                                                                                                              | `String`   | Text for the break view indicator. **default: ...**                                                                                                                                                                                                                                                   |
| `initial-page` <br>                                                                                                                                                                                                                            | `Number`   | The index of initial page which selected. **default: 1**                                                                                                                                                                                                                                              |
| `force-page`                                                                                                                                                                                                                                   | `Number`   | The page number of overridden selected page.                                                                                                                                                                                                                                                          |
| `click-handler`                                                                                                                                                                                                                                | `Function` | The method to call when page clicked. Use clicked page number as parameter.                                                                                                                                                                                                                           |
| `container-class`                                                                                                                                                                                                                              | `String`   | CSS class name for the layout.                                                                                                                                                                                                                                                                        |
| `page-class`                                                                                                                                                                                                                                   | `String`   | CSS class name for tag `li` of each page element.                                                                                                                                                                                                                                                     |
| `page-link-class`                                                                                                                                                                                                                              | `String`   | CSS class name for tag `a` of each page element.                                                                                                                                                                                                                                                      |
| `prev-class`                                                                                                                                                                                                                                   | `String`   | CSS class name for tag `li` of `previous` element.                                                                                                                                                                                                                                                    |
| `prev-link-class`                                                                                                                                                                                                                              | `String`   | CSS class name for tag `a` of `previous` element.                                                                                                                                                                                                                                                     |
| `next-class`                                                                                                                                                                                                                                   | `String`   | CSS class name for tag `li` of `next` element.                                                                                                                                                                                                                                                        |
| `next-link-class`                                                                                                                                                                                                                              | `String`   | CSS class name for tag `a` of `next` element.                                                                                                                                                                                                                                                         |
| `break-view-class`                                                                                                                                                                                                                             | `String`   | CSS class name for tag `li` of `break view` element.                                                                                                                                                                                                                                                  |
| `break-view-link-class`                                                                                                                                                                                                                        | `String`   | CSS class name for tag `a` of `break view` element.                                                                                                                                                                                                                                                   |
| `active-class`                                                                                                                                                                                                                                 | `String`   | CSS class name for active page element. **default: active**                                                                                                                                                                                                                                           |
| `disabled-class`                                                                                                                                                                                                                               | `String`   | CSS class name for disabled page element. **default: disabled**                                                                                                                                                                                                                                       |
| `no-li-surround`                                                                                                                                                                                                                               | `Boolean`  | Support no `li` tag surround `a` tag. **default: false**                                                                                                                                                                                                                                              |
| `first-last-button`                                                                                                                                                                                                                            | `Boolean`  | Support buttons to turn to the first and last page. **default: false**                                                                                                                                                                                                                                |
| `first-button-text`                                                                                                                                                                                                                            | `String`   | Text for first button. (Not visible when `first-last-button` is false. You can use HTML here.) **default: 'First'**                                                                                                                                                                                   |
| `last-button-text`                                                                                                                                                                                                                             | `String`   | Text for last button. (Not visible when `first-last-button` is false. You can use HTML here.) **default: 'Last'**                                                                                                                                                                                     |
| `hide-prev-next`                                                                                                                                                                                                                               | `Boolean`  | Hide prev/next button when there is no previous or next page. **default: false**                                                                                                                                                                                                                      |

## Customize inner HTML (experimental)

You can customize the inner HTML of the previous button, next button, and break view indicator, with the `slot` tag.

**Slot names**

| Name               | Description          |
| ------------------ | -------------------- |
| `prevContent`      | Previous button      |
| `nextContent`      | Next button          |
| `breakViewContent` | Break view indicator |

**Note**
Slot of `prevContent` and `nextContent` are not supported after `v1.9.5`. You can directly set the HTML by `prev-text` and `next-text` props.

**Example**

```html
<paginate
  :page-count="10"
  :container-class="pagination"
  :prev-text="prev"
  :next-text="next"
  :click-handler="clickCallback"
>
  <span slot="prevContent">Changed previous button</span>
  <span slot="nextContent">Changed next button</span>
  <span slot="breakViewContent">
    <svg width="16" height="4" viewBox="0 0 16 4">
      <circle fill="#999999" cx="2" cy="2" r="2" />
      <circle fill="#999999" cx="8" cy="2" r="2" />
      <circle fill="#999999" cx="14" cy="2" r="2" />
    </svg>
  </span>
</paginate>
```

## Demo

You can see the demo for quickly understand how to use this package.

```sh
$ git clone https://github.com/cloudeep/vuejs-paginate-next.git
$ cd vuejs-paginate-next
$ npm install
$ npm run dev
```

Check the code from `./index.html` and `./src/App.vue`.
