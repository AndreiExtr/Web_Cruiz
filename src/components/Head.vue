<script>
import Menu from './Menu.vue';
import Login from './Login.vue'; // Импортируем компонент Login.vue

export default {
  name: 'Head',
  props: {
    isCruisePage: {
      type: Boolean,
      default: false
    },
    isAccountPage: {
      type: Boolean,
      default: true
    }
  },
  created() {
    const loggedIn = localStorage.getItem('loggedIn');
    this.loggedIn = loggedIn === 'true';
    if (loggedIn === null) {
      this.loggedIn = false; // Устанавливаем значение loggedIn в false при первом посещении сайта
    }
  },
  computed: {
    hasBreadcrumb() {
      // Проверяем, есть ли метаданные для хлебных крошек
      return !!this.$route.meta.breadcrumbName;
    },
    breadcrumbName() {
      // Получаем наименование хлебных крошек из метаданных текущего маршрута
      return this.$route.meta.breadcrumbName || '';
    }
  },
  components: {
    Menu,
    Login // Регистрируем компонент Login.vue
  },
  data() {
    return {
      isModalOpen: false, // Инициализируем свойство isModalOpen
      isMenuOpen: false,
      isSticky: false,
      loggedIn: false // Добавляем свойство loggedIn, чтобы отслеживать состояние входа пользователя
    };
  },
  mounted() {

    // Проверяем, вошел ли пользователь при загрузке страницы
    if (localStorage.getItem('loggedIn')) {
      this.loggedIn = true;
    }

    window.addEventListener('scroll', this.handleScroll);
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.handleScroll);
  },

  methods: {

    handleLoginSuccess() {
      this.loggedIn = true; // Устанавливаем значение loggedIn в true при успешной аутентификации
      localStorage.setItem('loggedIn', 'true'); // Сохраняем состояние входа в localStorage
      this.closeModal(); // Закрываем модальное окно
    },

    goToAccountPage() {
      this.$router.push('/account'); // Перенаправляем пользователя на страницу личного кабинета
    },

    goBack() {
      this.$router.go(-1);
    },
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
        <li v-if="isAccountPage && !isCruisePage" class="icon_burger" @click="toggleMenu()">
          <svg  xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" >
            <path d="M3 8H21C21.2652 8 21.5196 7.89464 21.7071 7.70711C21.8946 7.51957 22 7.26522 22 7C22 6.73478 21.8946 6.48043 21.7071 6.29289C21.5196 6.10536 21.2652 6 21 6H3C2.73478 6 2.48043 6.10536 2.29289 6.29289C2.10536 6.48043 2 6.73478 2 7C2 7.26522 2.10536 7.51957 2.29289 7.70711C2.48043 7.89464 2.73478 8 3 8ZM21 16H3C2.73478 16 2.48043 16.1054 2.29289 16.2929C2.10536 16.4804 2 16.7348 2 17C2 17.2652 2.10536 17.5196 2.29289 17.7071C2.48043 17.8946 2.73478 18 3 18H21C21.2652 18 21.5196 17.8946 21.7071 17.7071C21.8946 17.5196 22 17.2652 22 17C22 16.7348 21.8946 16.4804 21.7071 16.2929C21.5196 16.1054 21.2652 16 21 16ZM21 11H3C2.73478 11 2.48043 11.1054 2.29289 11.2929C2.10536 11.4804 2 11.7348 2 12C2 12.2652 2.10536 12.5196 2.29289 12.7071C2.48043 12.8946 2.73478 13 3 13H21C21.2652 13 21.5196 12.8946 21.7071 12.7071C21.8946 12.5196 22 12.2652 22 12C22 11.7348 21.8946 11.4804 21.7071 11.2929C21.5196 11.1054 21.2652 11 21 11Z"/>
          </svg>
        </li>
        <!--  ИКОНКА "БУРГЕР"-->

        <!-- Ваш код для логотипа и разделов -->
        <div v-if="!isCruisePage" class="logo_and_sections">
          <div class="navbar_logo"><img alt="Logo" src="/src/assets/logo.svg"></div>
          <li><a href="#">ГЛАВНАЯ</a></li>
          <li><a href="#section1" onclick="scrollToSection(event)">О НАС</a></li>
          <li><a href="#section2" onclick="scrollToSection(event)">КРУИЗЫ</a></li>
          <li><a href="#section3" onclick="scrollToSection(event)">СПЕЦПРЕДЛОЖЕНИЯ</a></li>
          <li><a href="#section4" onclick="scrollToSection(event)">НОВОСТИ</a></li>
          <li><a href="#section5" onclick="scrollToSection(event)">КОНТАКТЫ</a></li>
        </div>
        <!-- Ваш код для логотипа и разделов -->

        <!-- Хлебные крошки на странице просмотра круиза -->
        <div v-if="isCruisePage" class="breadcrumbs">
          <div class="main_page" @click="goBack">Главная</div>
          <span>•</span>
          <p>{{ breadcrumbName }}</p>
        </div>
        <!-- Хлебные крошки на странице просмотра круиза -->

        <div  class="action">
          <svg class="icon_number" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" >
            <path d="M19.4099 13C19.1899 13 18.9599 12.93 18.7399 12.88C18.2948 12.7805 17.857 12.6501 17.4299 12.49C16.966 12.3212 16.4561 12.33 15.9982 12.5146C15.5404 12.6992 15.167 13.0466 14.9499 13.49L14.7299 13.95C13.7587 13.3992 12.8616 12.7271 12.0599 11.95C11.2828 11.1484 10.6107 10.2512 10.0599 9.28L10.5199 9.07C10.9633 8.85292 11.3107 8.47953 11.4953 8.02169C11.6799 7.56385 11.6887 7.05391 11.5199 6.59C11.3611 6.15903 11.2308 5.71808 11.1299 5.27C11.0799 5.05 11.0399 4.82 11.0099 4.6C10.8885 3.89562 10.5196 3.25774 9.96955 2.80124C9.41955 2.34474 8.72462 2.09961 8.00993 2.11H4.99993C4.57717 2.10945 4.15908 2.19825 3.77305 2.37058C3.38701 2.54292 3.04176 2.7949 2.75993 3.11C2.47225 3.43365 2.25804 3.81575 2.13203 4.23004C2.00602 4.64432 1.97119 5.08098 2.02993 5.51C2.57352 9.67214 4.47514 13.5387 7.43993 16.51C10.4113 19.4748 14.2778 21.3764 18.4399 21.92C18.5697 21.9299 18.7001 21.9299 18.8299 21.92C19.5673 21.9211 20.2793 21.6505 20.8299 21.16C21.145 20.8782 21.397 20.5329 21.5693 20.1469C21.7417 19.7609 21.8305 19.3428 21.8299 18.92V15.92C21.8245 15.229 21.5808 14.5611 21.1399 14.0291C20.6989 13.4971 20.0879 13.1336 19.4099 13ZM19.8999 19C19.8996 19.1395 19.8701 19.2775 19.8132 19.4049C19.7564 19.5324 19.6735 19.6465 19.5699 19.74C19.4603 19.8399 19.3299 19.9141 19.1881 19.9573C19.0463 20.0006 18.8966 20.0117 18.7499 19.99C15.0182 19.5026 11.5502 17.802 8.87993 15.15C6.2074 12.4775 4.49196 8.99737 3.99993 5.25C3.9782 5.10333 3.98936 4.95367 4.0326 4.81185C4.07584 4.67003 4.15007 4.5396 4.24993 4.43C4.34455 4.32515 4.46031 4.24154 4.58958 4.18466C4.71885 4.12778 4.8587 4.09892 4.99993 4.1H7.99993C8.23109 4.09435 8.45707 4.16898 8.63939 4.3112C8.82172 4.45341 8.94913 4.65442 8.99993 4.88C8.99993 5.15 9.08993 5.43 9.14993 5.7C9.2655 6.22386 9.41925 6.73857 9.60993 7.24L8.20993 7.9C7.96929 8.01046 7.78229 8.21185 7.68993 8.46C7.58991 8.70346 7.58991 8.97654 7.68993 9.22C9.12913 12.3028 11.6072 14.7808 14.6899 16.22C14.9334 16.32 15.2065 16.32 15.4499 16.22C15.6981 16.1276 15.8995 15.9406 16.0099 15.7L16.6399 14.3C17.1558 14.4881 17.6837 14.6418 18.2199 14.76C18.4799 14.82 18.7599 14.87 19.0299 14.91C19.2555 14.9608 19.4565 15.0882 19.5987 15.2705C19.7409 15.4529 19.8156 15.6788 19.8099 15.91L19.8999 19ZM13.9999 2C13.7699 2 13.5299 2 13.2999 2C13.0347 2.02254 12.7893 2.14952 12.6177 2.353C12.4461 2.55647 12.3624 2.81978 12.3849 3.085C12.4075 3.35022 12.5344 3.59562 12.7379 3.76721C12.9414 3.93881 13.2047 4.02254 13.4699 4H13.9999C15.5912 4 17.1174 4.63214 18.2426 5.75736C19.3678 6.88258 19.9999 8.4087 19.9999 10C19.9999 10.18 19.9999 10.35 19.9999 10.53C19.9778 10.7938 20.0611 11.0556 20.2317 11.2581C20.4023 11.4606 20.6462 11.5871 20.9099 11.61H20.9899C21.2403 11.611 21.4819 11.5181 21.667 11.3496C21.8522 11.1811 21.9674 10.9493 21.9899 10.7C21.9899 10.47 21.9899 10.23 21.9899 10C21.9899 7.88 21.1484 5.84668 19.6503 4.34668C18.1522 2.84667 16.1199 2.00265 13.9999 2ZM15.9999 10C15.9999 10.2652 16.1053 10.5196 16.2928 10.7071C16.4804 10.8946 16.7347 11 16.9999 11C17.2651 11 17.5195 10.8946 17.707 10.7071C17.8946 10.5196 17.9999 10.2652 17.9999 10C17.9999 8.93913 17.5785 7.92172 16.8284 7.17157C16.0782 6.42143 15.0608 6 13.9999 6C13.7347 6 13.4804 6.10536 13.2928 6.29289C13.1053 6.48043 12.9999 6.73478 12.9999 7C12.9999 7.26522 13.1053 7.51957 13.2928 7.70711C13.4804 7.89464 13.7347 8 13.9999 8C14.5304 8 15.0391 8.21071 15.4141 8.58579C15.7892 8.96086 15.9999 9.46957 15.9999 10Z"/>
          </svg>
          <p class="number">+7 (999) 124-23-45</p>

          <!-- Кнопка "Войти" -->
          <button v-if="!loggedIn" class="login_button" @click="openModal">Войти</button>
          <!-- Кнопка "Личный кабинет" -->
          <button v-else class="account_button" @click="goToAccountPage">Личный кабинет</button>

        </div>
      </ul>
    </nav>
  </header>
  <Menu :isMenuOpen="isMenuOpen" :toggleMenu="toggleMenu" @close-menu="closeMenu"/>
  <Login :isModalOpen="isModalOpen" @close-modal="closeModal" @login-success="handleLoginSuccess" />
</template>

<style scoped>
/* Медиа-запрос для адаптивного разрешения */
@media screen and (min-width: 1200px) {
  .icon_burger {
    display: none;
  }

  .icon_number{
    display: none;
  }
}

@media screen and (max-width: 1200px) {
  /* Устанавливаем высоту для навигационного меню */
  .navbar {
    height: 57px;
  }

  .number{
    display: none;
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

  .icon_number {
    display: block;
    padding-right: 24px;
    fill: #333333;
    cursor: pointer;
  }
  .icon_number:hover {
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

.breadcrumbs{
  font-size: 16px;
  font-weight: 400;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}

span{
  padding-right: 6px;
  padding-left: 6px;
}

.navbar {
  display: flex;
  margin: 0;
  padding: 16px 48px;
  justify-content: space-between;
  align-items: center;
  list-style-type: none;
}

.main_page{
  color: #007bff;
  cursor: pointer;
}
.main_page:hover{
  color: #0056b3;
}

.logo_and_sections{
  display: flex;
  justify-content: center;
  align-items: center;
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

.number{
  font-size: 16px;
}

.login_button,
.account_button{
  background-color: #007bff; /* Цвет фона кнопки */
  border-radius: 5px;
  margin-left: 24px;
  color: #fff; /* Цвет текста кнопки */
  padding: 10px 20px; /* Отступы внутри кнопки */
  font-size: 14px; /* Размер шрифта кнопки */
  border: none; /* Убираем границу кнопки */
  cursor: pointer;
}

.login_button:hover,
.account_button:hover{
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