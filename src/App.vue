
<template>

  <Head />
  <Cont1 />
  <Cont2 />

</template>
<script>
import Head from "@/components/Head.vue";
import Cont1 from "@/components/Cont1.vue"
import Cont2 from "@/components/Cont2.vue"

export default {
  name: 'App',
  components: {
    Head,
    Cont1,
    Cont2,
  }
}
</script>