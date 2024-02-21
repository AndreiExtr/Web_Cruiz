<script>
export default {
  props: {
    isMenuOpen: Boolean,
  },
  methods: {
    closeMenu() {
      // Вызываем событие для родительского компонента для закрытия меню
      this.$emit('close-menu');
    }
  }
};
</script>

<template>
  <!-- БОКОВЕО МЕНЮ-->
  <div class="menu-container" :class="{ 'open': isMenuOpen }">
    <div class="icon_close_menu" @click="closeMenu()" >
      <!--  ИКОНКА "ЗАКРЫТИЕ МЕНЮ"-->
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
        <path d="M13.4099 11.9999L19.7099 5.70994C19.8982 5.52164 20.004 5.26624 20.004 4.99994C20.004 4.73364 19.8982 4.47825 19.7099 4.28994C19.5216 4.10164 19.2662 3.99585 18.9999 3.99585C18.7336 3.99585 18.4782 4.10164 18.2899 4.28994L11.9999 10.5899L5.70994 4.28994C5.52164 4.10164 5.26624 3.99585 4.99994 3.99585C4.73364 3.99585 4.47824 4.10164 4.28994 4.28994C4.10164 4.47825 3.99585 4.73364 3.99585 4.99994C3.99585 5.26624 4.10164 5.52164 4.28994 5.70994L10.5899 11.9999L4.28994 18.2899C4.19621 18.3829 4.12182 18.4935 4.07105 18.6154C4.02028 18.7372 3.99414 18.8679 3.99414 18.9999C3.99414 19.132 4.02028 19.2627 4.07105 19.3845C4.12182 19.5064 4.19621 19.617 4.28994 19.7099C4.3829 19.8037 4.4935 19.8781 4.61536 19.9288C4.73722 19.9796 4.86793 20.0057 4.99994 20.0057C5.13195 20.0057 5.26266 19.9796 5.38452 19.9288C5.50638 19.8781 5.61698 19.8037 5.70994 19.7099L11.9999 13.4099L18.2899 19.7099C18.3829 19.8037 18.4935 19.8781 18.6154 19.9288C18.7372 19.9796 18.8679 20.0057 18.9999 20.0057C19.132 20.0057 19.2627 19.9796 19.3845 19.9288C19.5064 19.8781 19.617 19.8037 19.7099 19.7099C19.8037 19.617 19.8781 19.5064 19.9288 19.3845C19.9796 19.2627 20.0057 19.132 20.0057 18.9999C20.0057 18.8679 19.9796 18.7372 19.9288 18.6154C19.8781 18.4935 19.8037 18.3829 19.7099 18.2899L13.4099 11.9999Z"/>
      </svg>
    </div>

    <div class="menu">
      <ul>
        <li><a href="#">ГЛАВНАЯ</a></li>
        <li><a href="#section1" @click="scrollToSection($event)">О НАС</a></li>
        <li><a href="#section2" @click="scrollToSection($event)">КРУИЗЫ</a></li>
        <li><a href="#section3" @click="scrollToSection($event)">СПЕЦПРЕДЛОЖЕНИЯ</a></li>
        <li><a href="#section4" @click="scrollToSection($event)">НОВОСТИ</a></li>
        <li><a href="#section5" @click="scrollToSection($event)">КОНТАКТЫ</a></li>
      </ul>
    </div>

  </div>
</template>

<style scoped>
/* Медиа-запрос для адаптивного разрешения */
@media screen and (min-width: 1000px) {
  /* Показываем иконку бургера */
  .menu-container {
    display: none;
  }
}

/* БОКОВОЕ МЕНЮ */
.menu-container {
  position: fixed;
  top: 0;
  left: -250px; /* Скрываем меню за пределами экрана */
  width: 250px;
  height: 100%;
  background-color: #ffffff;
  z-index: 4; /* Устанавливаем поверх шапки */
  transition: left 0.3s ease;
}

.icon_close_menu {
  position: absolute;
  top: 10px;
  right: 10px;
  fill: #333333;
  cursor: pointer;
}
.icon_close_menu:hover {
  fill: #274da7;
  cursor: pointer;
}

.menu-container.open {
  left: 0; /* Отображаем меню */
}

.menu {
  padding-top: 54px; /* Учитываем высоту шапки */
  padding-right: 16px;
  padding-left: 32px;
  padding-bottom: 32px;
}

.menu li {
  margin-bottom: 16px;
  list-style-type: none; /* Убираем маркеры списка */
}

ul{
  padding: 0;
}

.menu li a {
  font-size: 14px;
  position: relative;  /* Добавлено для позиционирования псевдоэлемента относительно ссылки */
  text-decoration: none;
  color: #333;
  transition: color 0.3s ease-in-out;
  ist-style-type: none; /* Убираем маркеры списка */
}

.menu li a::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 0;
  width: 0;
  height: 2px;
  background-color: #274da7;
  transition: width 0.3s ease-in-out;
}

.menu li a:hover::after {
  width: 100%;  /* Увеличиваем ширину при наведении */
}

.menu li a:hover {
  color: #274da7;
}
</style>