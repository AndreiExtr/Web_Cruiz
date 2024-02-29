<template>
  <footer>
    <div class="container">
      <div class="footer-content">
        <div class="footer-logo">
          <img src="/src/assets/logo.svg" alt="Логотип">
        </div>
        <div class="footer-social">
          <img src="/src/assets/VK.svg" alt="ВКонтакте">
          <img src="/src/assets/Telegram.svg" alt="Telegram">
        </div>
      </div>
      <div class="footer-bottom">
        <p>&copy; 2024 Все права защищены • <a>Политика конфиденциальности</a> • <a>Условия использования</a></p>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'Footer',
}
</script>

<style scoped>
/* Основной стиль для footer'а */
footer {
  background-color: #333; /* Цвет фона */
  color: #fff; /* Цвет текста */
  margin: 0;
  padding-left: 48px;
  padding-right: 48px;
  padding-top: 16px;
  padding-bottom: 16px;
}

/* Стили для контента внутри footer'а */
.footer-content {
  display: flex; /* Отображение в строку */
  justify-content: space-between; /* Равномерное распределение элементов по горизонтали */
  align-items: center; /* Выравнивание элементов по вертикали */
}

/* Стили для логотипа в footer'е */
.footer-logo img {
  color: white;
  max-width: 100px; /* Максимальная ширина логотипа */
}

.footer-social img {
  width: 40px; /* Ширина иконок */
  height: auto; /* Автоматическая высота, чтобы сохранить пропорции */
  margin-right: 10px; /* Отступ между иконками */
  color: #fff; /* Цвет иконок */
}

/* Стили для копирайт информации в footer'е */
.footer-bottom {
  margin-top: 20px; /* Отступ сверху */
}

.footer-bottom p {
  color: #fff;
  font-weight: normal;
  font-size: 14px;
  margin: 0; /* Удаление внешних отступов */
}
</style>
