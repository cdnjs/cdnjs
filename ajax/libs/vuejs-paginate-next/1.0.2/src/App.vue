<script>
import VuejsPaginateNext from './components/Paginate.vue'

export default {
  data() {
    return {
      page: 1,
    }
  },
  components: {
    paginate: VuejsPaginateNext,
  }
}
</script>

<template>
  <div style="padding-left: 20px;">
    <h2>vuejs-paginate-next</h2>
    <hr />

    <div>
      <h3>Unit Test</h3>
      <!-- The 'pagination' style using in containerClass comes from bootstrap -->
      <paginate
        id="unit"
        :page-count="10"
        :page-range="5"
        :margin-pages="0"
        :initial-page="2"
        :prev-class="'ignore'"
        :next-class="'ignore'"
        :disabled-class="'ignore'"
      ></paginate>
    </div>

    <div>
      <h3>Pagination component with 'li' tag surrounded (Bootstrap 5 default)</h3>
      <!-- The 'pagination' style using in containerClass comes from bootstrap -->
      <paginate
        v-model="page"
        :page-count="20"
        :margin-pages="2"
        :page-range="5"
        :first-last-button="true"
      ></paginate>
    </div>

    <div>
      <h3>Pagination component with 'li' tag surrounded (Bootstrap 5 and classes set)</h3>
      <!-- The 'pagination' style using in containerClass comes from bootstrap -->
      <paginate
        v-model="page"
        :page-count="20"
        :margin-pages="2"
        :page-range="5"
        :container-class="'pagination'"
        :page-class="'page-item'"
        :page-link-class="'page-link'"
        :prev-class="'prev-item'"
        :prev-link-class="'page-link prev-link-item'"
        :next-class="'next-item'"
        :next-link-class="'page-link next-link-item'"
        :break-view-class="'break-view'"
        :break-view-link-class="'break-view-link'"
        :first-last-button="true"
      ></paginate>
    </div>

    <div>
      <h3>Pagination component without 'li' tag surrounded (Semantic UI)</h3>
      <!-- The css class comes from semantic ui. -->
      <paginate
        v-model="page"
        :page-count="20"
        :margin-pages="2"
        :page-range="5"
        :container-class="'ui pagination menu'"
        :page-link-class="'item'"
        :prev-link-class="'item'"
        :next-link-class="'item'"
        :break-view-link-class="'break-view-link'"
        :no-li-surround="true"
      ></paginate>
    </div>

    <div>
      <h3>Pagination component without margin pages</h3>
      <!-- The 'pagination' style using in containerClass comes from bootstrap -->
      <paginate
        v-model="page"
        :page-count="20"
        :margin-pages="0"
        :page-range="5"
        :container-class="'pagination'"
        :page-class="'page-item'"
        :page-link-class="'page-link'"
        :prev-class="'ignore prev-item'"
        :prev-link-class="'page-link prev-link-item'"
        :next-class="'ignore next-item'"
        :next-link-class="'page-link next-link-item'"
        :disabled-class="'ignore disabled'"
      ></paginate>
    </div>

    <div>
      <h3>Pagination component with SVG for view break</h3>
      <paginate
        v-model="page"
        :page-count="20"
        :margin-pages="2"
        :page-range="4"
        :container-class="'pagination'"
        :page-class="'page-item'"
        :page-link-class="'page-link'"
        :prev-class="'prev-item'"
        :prev-link-class="'page-link prev-link-item'"
        :next-class="'next-item'"
        :next-link-class="'page-link next-link-item'"
        :break-view-class="'break-view'"
        :break-view-link-class="'break-view-link'"
      >
        <span slot="breakViewContent">
          <svg width="16" height="4" viewBox="0 0 16 4">
            <circle fill="#999999" cx="2" cy="2" r="2" />
            <circle fill="#999999" cx="8" cy="2" r="2" />
            <circle fill="#999999" cx="14" cy="2" r="2" />
          </svg>
        </span>
      </paginate>
    </div>
  </div>
</template>

<style>
h3 {
  margin-top: 30px;
}
</style>
