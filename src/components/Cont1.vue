<template>
  <div class="container_1">
      <div class="title_button">
        <h1>Выберите свой <br> вариант путешествия</h1>
        <button  class="select-cruise-button" >Выбрать круиз</button>
      </div>

      <div class="overlay"></div>
      <img src="/src/assets/1.jpg" alt="Background Image" class="background-image">
  </div>
</template>

<script>
</script>

<style scoped>

/* БЛОК 1*/
.container_1 {
  position: relative;
  padding-top: 78px;

  height: 700px;
}

.overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5); /* Adjust the last value (0.5) for the desired level of darkness */
  z-index: 1;
}

.background-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: 0;
}

/* КНОПКА С ЗАГОЛОВКОМ */
.title_button {
  position: absolute;
  font-weight: normal;
  text-align: left;
  padding-left: 48px;
  top: 30%;
  left: 0;
  color: #fff; /* Цвет текста */
  z-index: 2;
}

h1 {
  font-weight: lighter; /* Изменение веса шрифта на жирный */
  font-size: 64px; /* Размер шрифта для заголовка */
  margin-bottom: 16px; /* Отступ снизу */
}

.select-cruise-button {
  background-color: #333333; /* Цвет фона кнопки */
  color: #fff; /* Цвет текста кнопки */
  padding: 10px 20px; /* Отступы внутри кнопки */
  font-size: 16px; /* Размер шрифта кнопки */
  border: none; /* Убираем границу кнопки */
  cursor: pointer;
}
.select-cruise-button:hover {
  background-color: #274da7; /* Цвет фона кнопки */
  font-size: 16px; /* Размер шрифта кнопки */
  border: none; /* Убираем границу кнопки */
  cursor: pointer;
}

</style>