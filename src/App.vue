
<template>
  <div id="app">
    <Head />
    <router-view />
    <Footer />
  </div>
</template>

<script>

import {defineComponent} from "vue";
import SwaggerUI from "../SwaggerUI.vue";
import Footer from "@/components/Footer.vue";

export default defineComponent({
  components: {Footer, SwaggerUI}
})
</script>

<style>
</style>

