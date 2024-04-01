<script>
import Menu from './Menu.vue';
import Login from './Login.vue'; // Импортируем компонент Login.vue
export default {
  components: {
    Menu,
    Login // Регистрируем компонент Login.vue
  },
  data() {
    return {
      isModalOpen: false, // Инициализируем свойство isModalOpen
      isMenuOpen: false,
      isSticky: false
    };
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll);
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.handleScroll);
  },
  methods: {
    openModal() {
      this.isModalOpen = true; // Открываем модальное окно
    },
    closeModal() {
      this.isModalOpen = false; // Закрываем модальное окно
    },
    handleScroll() {
      if (window.pageYOffset > 0) {
        this.isSticky = true;
      } else {
        this.isSticky = false;
      }
    },

    toggleMenu() {
      this.isMenuOpen = !this.isMenuOpen;
    },
    closeMenu() {
      // Закрытие меню
      this.isMenuOpen = false;
    }
  }
};
</script>

<template>
  <header  :class="{ 'sticky': isSticky }">
    <nav>
      <ul class="navbar">

        <!--  ИКОНКА "БУРГЕР"-->
        <li class="icon_burger" @click="toggleMenu()">
          <svg  xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" >
            <path d="M3 8H21C21.2652 8 21.5196 7.89464 21.7071 7.70711C21.8946 7.51957 22 7.26522 22 7C22 6.73478 21.8946 6.48043 21.7071 6.29289C21.5196 6.10536 21.2652 6 21 6H3C2.73478 6 2.48043 6.10536 2.29289 6.29289C2.10536 6.48043 2 6.73478 2 7C2 7.26522 2.10536 7.51957 2.29289 7.70711C2.48043 7.89464 2.73478 8 3 8ZM21 16H3C2.73478 16 2.48043 16.1054 2.29289 16.2929C2.10536 16.4804 2 16.7348 2 17C2 17.2652 2.10536 17.5196 2.29289 17.7071C2.48043 17.8946 2.73478 18 3 18H21C21.2652 18 21.5196 17.8946 21.7071 17.7071C21.8946 17.5196 22 17.2652 22 17C22 16.7348 21.8946 16.4804 21.7071 16.2929C21.5196 16.1054 21.2652 16 21 16ZM21 11H3C2.73478 11 2.48043 11.1054 2.29289 11.2929C2.10536 11.4804 2 11.7348 2 12C2 12.2652 2.10536 12.5196 2.29289 12.7071C2.48043 12.8946 2.73478 13 3 13H21C21.2652 13 21.5196 12.8946 21.7071 12.7071C21.8946 12.5196 22 12.2652 22 12C22 11.7348 21.8946 11.4804 21.7071 11.2929C21.5196 11.1054 21.2652 11 21 11Z"/>
          </svg>
        </li>

        <div class="navbar_logo"><img alt="Logo" src="/src/assets/logo.svg"></div>
        <li><a href="#">ГЛАВНАЯ</a></li>
        <li><a href="#section1" onclick="scrollToSection(event)">О НАС</a></li>
        <li><a href="#section2" onclick="scrollToSection(event)">КРУИЗЫ</a></li>
        <li><a href="#section3" onclick="scrollToSection(event)">СПЕЦПРЕДЛОЖЕНИЯ</a></li>
        <li><a href="#section4" onclick="scrollToSection(event)">НОВОСТИ</a></li>
        <li><a href="#section5" onclick="scrollToSection(event)">КОНТАКТЫ</a></li>

        <div class="action">
          <p>+7 (999) 124-23-45</p>
          <!-- КНОПКА "ВОЙТИ" -->
          <button class="login_button" @click="openModal">Войти</button>

        </div>
      </ul>
    </nav>
  </header>
  <Menu :isMenuOpen="isMenuOpen" :toggleMenu="toggleMenu" @close-menu="closeMenu"/>
  <Login :isModalOpen="isModalOpen" @close-modal="closeModal" />


</template>

<style scoped>
/* Медиа-запрос для адаптивного разрешения */
@media screen and (min-width: 1000px) {
  /* Показываем иконку бургера */
  .icon_burger {
    display: none;
  }
}

@media screen and (max-width: 1000px) {
  /* Устанавливаем высоту для навигационного меню */
  .navbar {
    height: 57px;
  }

  /* Показываем иконку бургера */
  .icon_burger {
    display: block;
    padding-right: 24px;
    fill: #333333;
    cursor: pointer;
  }
  .icon_burger:hover {
    fill: #0056b3;
    cursor: pointer;
  }

  /* Скрываем все пункты меню, кроме иконки бургера */
  .navbar li:not(.icon_burger) {
    display: none;
  }
}




/* ШАПКА */
header {
  font-size: 14px;
  /*background-color: rgb(255 255 255 / 55%); !* Цвет с прозрачностью *!*/
  background-color: white;
  position: relative;
  z-index: 3;
  top: 0;
  width: 100%;
  box-shadow: 0px 19px 40px -19px rgba(95,95,95,0.3);; /* Добавляем тень */
  /*backdrop-filter: blur(20px); !* Размытие *!*/
}
.sticky {
  position: fixed;
}
.navbar {
  display: flex;
  margin: 0;
  padding: 16px 48px;
  justify-content: space-between;
  align-items: center;
  list-style-type: none;
}
.navbar_logo {
  width: 100px;
  height: auto;
  padding-right: 24px;
  margin-right: auto; /* Размещаем логотип слева */
}
nav ul {
  list-style: none;
  display: flex;
  align-items: center;
}
nav li{
  padding-right: 24px;
}

nav ul li a {
  position: relative;  /* Добавлено для позиционирования псевдоэлемента относительно ссылки */
  text-decoration: none;
  color: #333;
  transition: color 0.3s ease-in-out;
}

nav ul li a::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 0;
  width: 0;
  height: 2px;
  background-color: #0056b3;
  transition: width 0.3s ease-in-out;
}

nav ul li a:hover::after {
  width: 100%;  /* Увеличиваем ширину при наведении */
}

nav ul li a:hover {
  color: #0056b3;
}

.action{
  margin-left: auto;
  display: flex;
  justify-content: center; /* Выравнивание по горизонтали */
  align-items: center;
}

.action p{
  font-size: 16px;
}

.login_button {
  background-color: #007bff; /* Цвет фона кнопки */
  border-radius: 5px;
  margin-left: 24px;
  color: #fff; /* Цвет текста кнопки */
  padding: 10px 20px; /* Отступы внутри кнопки */
  font-size: 14px; /* Размер шрифта кнопки */
  border: none; /* Убираем границу кнопки */
  cursor: pointer;
}

.login_button:hover {
  background-color: #0056b3; /* Цвет фона кнопки */
  border: none; /* Убираем границу кнопки */
  cursor: pointer;
}

/* Пример селектора для кнопки в зависимости от места, где она будет использоваться */
/* Например, если кнопка будет внутри блока с классом "header" */
.header .login_button {
  /* дополнительные стили для кнопки в хедере */
  margin-left: 10px; /* отступ слева */
}

</style>