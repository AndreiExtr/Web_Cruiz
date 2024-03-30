<script>
import Footer from "@/components/Footer.vue";
import Login from './Login.vue';
import axios from "axios";

export default {
  components: {
    Login,
    Footer
  },
  data() {
    return {
      isModalOpen: false,
      isMenuOpen: false,
      products: [],
      selectedProductTitle: '', // Заголовок выбранного круиза
      product: null,
      isSticky: false
    };
  },
  mounted() {

    this.scrollToTop()

    const productId = this.$route.params.id; // Получаем id круиза из параметров маршрута
    axios.get(`http://localhost:3000/products/${productId}`)
        .then(response => {
          this.selectedProductTitle = response.data.title; // Устанавливаем заголовок выбранного круиза
        })
        .catch(error => {
          console.error('Ошибка при загрузке круиза:', error);
        });

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

    window.addEventListener('scroll', this.handleScroll);
    window.addEventListener('resize', this.calculateSlideWidth);
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.calculateSlideWidth);
    window.removeEventListener('scroll', this.handleScroll);
  },


  methods: {
    scrollToTop() {
      window.scrollTo({
        top: 0,
        behavior: "smooth" // делает прокрутку плавной
      });
    },
    openModal() {
      this.isModalOpen = true;
    },
    closeModal() {
      this.isModalOpen = false;
    },
    goBack() {
      this.$router.go(-1);
    },
    handleScroll() {
      if (window.pageYOffset > 0) {
        this.isSticky = true;
      } else {
        this.isSticky = false;
      }
    },
  },
};
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
        <div class="icon_nav">
          <!-- КНОПКА "ВОЙТИ" -->
          <button class="login_button" @click="openModal">Войти</button>
        </div>
      </ul>
    </nav>
  </header>

  <div class="block_1">
    <h3 class="product-title">{{ selectedProductTitle }}</h3>
    <div class="block_1-images">
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
    <div class="block_2-description">
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

      <div class="booking">
        <h2 class="title">Бронирование</h2>
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

.icon_nav{
  margin-left: auto;
  display: flex;
  justify-content: center; /* Выравнивание по горизонтали */
  align-items: center;
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
.block_1-images {
  height: auto; /* Изменено на авто, чтобы блок подстраивался по содержимому */
  padding: 32px 150px 64px 150px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  flex-wrap: nowrap;
}

.product-title {
  font-size: 24px;
  padding: 32px 150px 0px 150px;
  margin: 0;
  color: #333333;
  word-wrap: break-word; /* Добавленное свойство для переноса текста */
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

.block_2-description {
  padding: 64px 150px  64px 150px ;
  display: flex; /* Располагаем дочерние элементы внутри .block горизонтально */
  justify-content: space-between; /* Равномерно распределяем пространство между дочерними элементами */
  flex-wrap: nowrap; /* Разрешаем элементам переноситься на новую строку при нехватке места */
}

.booking{
  background-color: red;
  padding: 8px 16px;
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

  .block_1-images{
    padding: 48px 24px; /* Уменьшаем отступы */
    flex-direction: column; /* Располагаем дочерние элементы в столбец при адаптивном разрешении */
    align-items: center;
  }

  .block_2-description {
    padding: 48px 24px; /* Уменьшаем отступы */
    flex-direction: column; /* Располагаем дочерние элементы в столбец при адаптивном разрешении */
    align-items: center;
  }

  .booking{
    padding: 0 16px; /* Уменьшаем внутренние отступы по горизонтали */
    width: 100%;
    height: auto;
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