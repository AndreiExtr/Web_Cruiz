<script>
import Footer from "@/components/Footer.vue";
import Login from './Login.vue'; // Импортируем компонент Login.vue

import axios from "axios";
import Head from "@/components/Head.vue";

export default {
  components: {
    Login,
    Footer
  },
  data() {
    return {
      isModalOpen: false, // Инициализируем свойство isModalOpen
      isMenuOpen: false,

      products:[],

      isSticky: false,
      images: [
        { src: "/src/assets/2.png", alt: "Image 1" },
        { src: "/src/assets/2.png", alt: "Image 2" },
        { src: "/src/assets/3.png", alt: "Image 3" },
      ],
      currentIndex: 0,
      slideWidth: 500,
    };
  },
  mounted() {

    axios.get('http://localhost:3000/products')
        .then(response => {
          this.products = response.data;
          const requests = this.products.map(product => {
            return axios.get(`http://localhost:3000/products/${product.id}`);
          });
          axios.all(requests)
              .then(axios.spread((...responses) => {
                responses.forEach((response, index) => {
                  this.products[index].details = response.data;
                });
              }))
              .catch(error => {
                console.error('Ошибка при получении информации о продуктах:', error);
              });
        })
        .catch(error => {
          console.error('Ошибка при загрузке продуктов:', error);
        });


    this.calculateSlideWidth();
    window.addEventListener('scroll', this.handleScroll);
    window.addEventListener('resize', this.calculateSlideWidth);
    this.$nextTick(() => {
      this.images.forEach(image => {
        const img = new Image();
        img.src = image.src;
        img.onload = this.calculateSlideWidth;
      });
    });
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.calculateSlideWidth);
    window.removeEventListener('scroll', this.handleScroll);
  },
  methods: {
    openModal() {
      this.isModalOpen = true; // Открываем модальное окно
    },
    closeModal() {
      this.isModalOpen = false; // Закрываем модальное окно
    },

    goBack() {
      this.$router.go(-1); // Переход на одну страницу назад в истории браузера
    },

    handleScroll() {
      if (window.pageYOffset > 0) {
        this.isSticky = true;
      } else {
        this.isSticky = false;
      }
    },

    calculateSlideWidth() {
      this.slideWidth = this.$refs.slides.offsetWidth;
    },
    prevSlide() {
      if (this.currentIndex > 0) {
        this.currentIndex--;
      } else {
        this.currentIndex = this.images.length - 1;
      }
      this.slideTransition();
    },
    nextSlide() {
      if (this.currentIndex < this.images.length - 1) {
        this.currentIndex++;
      } else {
        this.currentIndex = 0;
      }
      this.slideTransition();
    },
    slideTransition() {
      const offset = -this.slideWidth * this.currentIndex;
      this.$refs.slides.style.transform = `translateX(${offset}px)`;
    },
  },
}
</script>

<template>
  <header :class="{ 'sticky': isSticky }">
    <nav>
      <ul class="navbar">
        <!-- Хлебные крошки -->
        <div class="breadcrumbs">
          <div class="main_page" @click="goBack">Главная</div>
          <span>•</span>
          <p>Круиз</p>
        </div>
        <div class="action">
          <p>+7 (999) 124-23-45</p>
          <!-- КНОПКА "ВОЙТИ" -->
          <button class="login_button" @click="openModal">Войти</button>
        </div>
      </ul>
    </nav>
  </header>
  
  <div class="block_1">
    <div class="block0">
      <div class="image">
        <img src="/src/assets/6.jpg" alt="Background Image" class="background-imag">
      </div>
      <div class="image-grid">
        <img src="/src/assets/2.png" alt="Background Image" class="background-image1">
        <img src="/src/assets/2.png" alt="Background Image" class="background-image1">
        <img src="/src/assets/2.png" alt="Background Image" class="background-image1">
        <img src="/src/assets/2.png" alt="Background Image" class="background-image1">
      </div>
    </div>
  </div>

  <div class="block_2">
    <div class="block">
      <div class="text">
        <h2 class="title">Описание круиза</h2>
        <h5 class="content">
            В нашем путешествии вы посетите 2 стоянки, каждая из которых отличается самобытностью и колоритом.
          У вас будет отличная возможность отдохнуть от городской суеты, оценить гастрономическую концепцию «Родные берега»,
          сделать множество красивых фотографий, попробовать местную кухню и ощутить неповторимый колорит путешествия по реке.<br />
            Елабуга – бывший город Булгарского государства, который успел побывать и частью Казанского царства, и частью Золотой Орды.
          Елабуга – старинный город на территории Татарстана, сумевший сберечь свое культурное достояние и значительную часть историко-архитектурного облика.
          Его смело можно назвать самым самобытным городом Республики. Сегодня здесь можно увидеть знаменитое Елабужское городище – опорный пункт болгар в восточном Предкамье
          в X-XIV веках, дом-музей И.И. Шишкина, музей-усадьбу Н. Дуровой и музей уездной медицины В.М. Бехтерева.
        </h5>
      </div>

      <div class="slider-container">
        <div class="slider">
          <div class="navigation">
            <div class="button-prev" @click="prevSlide">
              <svg class="button-svg" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="-2 -2 36 36">
                <rect xmlns="http://www.w3.org/2000/svg" x="1" y="1" width="32" height="32" rx="16" />
                <path d="M12.9979 17.9976L19.0046 24.0043C19.1363 24.1371 19.293 24.2425 19.4656 24.3144C19.6383 24.3863 19.8234 24.4233 20.0104 24.4233C20.1975 24.4233 20.3826 24.3863 20.5553 24.3144C20.7279 24.2425 20.8846 24.1371 21.0163 24.0043C21.2801 23.7389 21.4282 23.3798 21.4282 23.0055C21.4282 22.6313 21.2801 22.2722 21.0163 22.0068L16.0013 16.9918L21.0163 11.9768C21.2801 11.7114 21.4282 11.3523 21.4282 10.978C21.4282 10.6038 21.2801 10.2447 21.0163 9.97929C20.8839 9.84799 20.7269 9.74412 20.5543 9.67362C20.3817 9.60312 20.1969 9.56738 20.0104 9.56846C19.824 9.56738 19.6392 9.60312 19.4666 9.67362C19.294 9.74412 19.137 9.84799 19.0046 9.97929L12.9979 15.986C12.8652 16.1177 12.7598 16.2743 12.6878 16.447C12.6159 16.6196 12.5789 16.8048 12.5789 16.9918C12.5789 17.1788 12.6159 17.364 12.6878 17.5366C12.7598 17.7092 12.8652 17.8659 12.9979 17.9976Z"></path>
              </svg>
            </div>
            <div class="button-next" @click="nextSlide">
              <svg class="button-svg" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="-2 -2 36 36">
                <rect xmlns="http://www.w3.org/2000/svg" x="1" y="1" width="32" height="32" rx="16" />
                <path d="M21.0091 15.9941L15.0025 9.98741C14.8708 9.85463 14.7141 9.74923 14.5415 9.67731C14.3688 9.60539 14.1837 9.56836 13.9966 9.56836C13.8096 9.56836 13.6245 9.60539 13.4518 9.67731C13.2792 9.74923 13.1225 9.85463 12.9908 9.98741C12.727 10.2528 12.5789 10.6119 12.5789 10.9862C12.5789 11.3604 12.727 11.7195 12.9908 11.9849L18.0058 16.9999L12.9908 22.0149C12.727 22.2803 12.5789 22.6394 12.5789 23.0137C12.5789 23.3879 12.727 23.747 12.9908 24.0124C13.1232 24.1437 13.2802 24.2476 13.4528 24.3181C13.6254 24.3886 13.8102 24.4243 13.9966 24.4232C14.1831 24.4243 14.3679 24.3886 14.5405 24.3181C14.7131 24.2476 14.8701 24.1437 15.0025 24.0124L21.0091 18.0057C21.1419 17.874 21.2473 17.7174 21.3192 17.5447C21.3912 17.3721 21.4282 17.1869 21.4282 16.9999C21.4282 16.8129 21.3912 16.6277 21.3192 16.4551C21.2473 16.2825 21.1419 16.1258 21.0091 15.9941Z"></path>
              </svg>
            </div>
          </div>

          <div class="slides" ref="slides">
            <div class="slide" v-for="(image, index) in images" :key="index">
              <img :src="image.src" :alt="image.alt" class="background-image">
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="block_3">
    <div class="block">

      <h2 class="title">Маршруты</h2>

    </div>
  </div>

  <div class="block_4">
    <div class="block_5">
      <h2 class="title">Похожие предложения</h2>

      <!--   ШАБЛОН КАРТОЧКИ (выброчно похожие круизы от X до X)-->
      <div class="cards">
        <div class="product-card1" v-for="(product, index) in products.slice(4, 6)" :key="product.id">
        <img :src="product.image" alt="Product Image">
        <div class="info-right">
          <div class="product-title-container">
            <h3 class="product-title1">{{ product.title }}</h3>
            <p class="cruise-date">{{ product.cruiseDate }}</p>
          </div>
          <p class="product-price">от {{ product.count }} ₽/ чел.</p>
          <p class="product-description">{{ product.description }}</p>
          <router-link :to="'/product/' + product.id" class="btn-details">Выбрать каюту</router-link>
        </div>
        </div>
      </div>
      <!--   ШАБЛОН КАРТОЧКИ (выброчно похожие круизы от X до X)-->

    </div>
  </div>
  <Footer />
  <Login :isModalOpen="isModalOpen" @close-modal="closeModal" />
</template>

<style scoped>
/* ШАПКА */
header {
  height: 85px;
  background-color: white;
  position: relative;
  z-index: 3;
  top: 0;
  width: 100%;
  box-shadow: 0 19px 40px -19px rgba(95,95,95,0.3);; /* Добавляем тень */
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
.main_page{
  color: #007bff;  /* Цвет фона текста */
  cursor: pointer;
}
.main_page:hover{
  color: #0056b3; /* Цвет фона кнопки */
}
.navbar {
  height: auto;
  display: flex;
  margin: 0;
  padding: 16px 48px;
  justify-content: space-between;
  align-items: center;
  list-style-type: none;
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
/* ШАПКА */

/* БЛОК 1 */
.block0 {
  height: auto; /* Изменено на авто, чтобы блок подстраивался по содержимому */
  padding: 32px 150px 64px 150px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  flex-wrap: nowrap;
}
.image {
  margin-right: 8px;
  flex: 2;
  height: auto; /* Автоматическая высота для левой картинки */
}
.background-image1 {
  width: 100%;
  height: auto;
  border-radius: 5px;
}
.background-imag {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 5px;
}
.image-grid {
  flex: 1; /* Чтобы занимал оставшееся пространство справа */
  display: grid;
  grid-template-columns: repeat(2, 1fr); /* Два столбца */
  grid-template-rows: repeat(2, auto); /* Две строки */
  grid-gap: 8px;
}
.image-grid img {
  width: 100%; /* Заполнение всей доступной ширины в колонке */
  height: 100%; /* Заполнение всей доступной высоты в строке */
  object-fit: cover; /* Сохранение пропорций и обрезка изображений по размерам */
}
/* БЛОК 1 */

/* БЛОК 2 */
.block_2{
  background-color: #EDF5FF;
}
/* БЛОК 2 */

/* БЛОК 3 */
.block_3{
  background-color: #f8f8f8;
}
/* БЛОК 3 */

/* БЛОК 4 */
.block_4{
  position: relative;
  background-color: #EDF5FF;
  height: auto;
}
.block_5 {
  padding: 64px 150px  64px 150px ;
  justify-content: space-between;
  flex-wrap: nowrap;
}
.cards {
  display: flex;
  flex-wrap: wrap; /* Позволяет карточкам переноситься на новую строку */
  justify-content: space-between; /* Равномерно распределяет пространство между карточками по горизонтали */
}
/* БЛОК 4 */

/* Медиа-запрос для адаптивного разрешения */
@media screen and (max-width: 1200px) {
  .block_5 {
    padding: 48px 24px; /* Уменьшаем отступы */
    flex-direction: column; /* Располагаем дочерние элементы в столбец при адаптивном разрешении */
    align-items: center;
  }
  .block0{
    height: auto;
    padding: 48px 24px;
    flex-direction: column;
    align-items: center;
  }
  .background-imag {
    width: 100%;
    height: 100%;
    margin-top: 8px;
    object-fit: cover;
  }
  .image{
    height: auto;
    margin-right: 0;
    margin-bottom: 8px;
  }
}

</style>