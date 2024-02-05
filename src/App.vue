<script setup>
</script>

<template>

  <Head />
  <Cont1 />

</template>
<script>
import Head from "@/components/Head.vue";
import Cont1 from "@/components/Cont1.vue"

export default {
  name: 'App',
  components: {
    Head,
    Cont1,
  }
}
</script>