
<template>
  <div id="app">
    <Head />
    <router-view />
  </div>

</template>

<script>

import {defineComponent} from "vue";
import SwaggerUI from "../SwaggerUI.vue";

export default defineComponent({
  components: {SwaggerUI}
})
</script>

<style>
</style>

