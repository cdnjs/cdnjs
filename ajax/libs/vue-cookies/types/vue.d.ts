import { VueCookies } from "./index";

declare module "vue/types/vue" {
  interface Vue {
    $cookies: VueCookies;
  }

  interface VueConstructor {
    $cookies: VueCookies;
  }
}

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $cookies: VueCookies
  }
}
