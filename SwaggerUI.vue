<template>
  <div id="swagger-ui"></div>
</template>

<script>
import { SwaggerUIBundle } from 'swagger-ui-dist';
export default {
  mounted() {
    const ui = SwaggerUIBundle({
      url: "http://localhost:3000/swagger.json", // Укажите путь к вашему файлу Swagger JSON
      dom_id: "#swagger-ui",
    });
  }
}

</script>

<style lang="css">
@import 'src/swagger-ui-vue/dist/swagger-ui.css';

</style>



