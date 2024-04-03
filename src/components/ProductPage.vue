<script>
import Footer from "@/components/Footer.vue";
import Login from './Login.vue';
import axios from "axios";
import Head from '@/components/Head.vue';

export default {
  name: 'CruisePage',
  props: {
    isAccountPage: {
      type: Boolean,
      default: true
    }
  },
  components: {
    Login,
    Head,
    Footer
  },
  data() {
    return {
      isModalOpen: false,
      isMenuOpen: false,
      products: [],
      productTitle: '', // Заголовок выбранного круиза
      productDate: '',
      product: null,
      isSticky: false
    };
  },
  mounted() {
    this.scrollToTop()

    const productId = this.$route.params.id; // Получаем id круиза из параметров маршрута
    axios.get(`http://localhost:3000/products/${productId}`)
        .then(response => {
          this.productTitle = response.data.title;
          this.productDate = response.data.cruiseDate;
          this.productCount = response.data.count;
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
    // goBack() {
    //   this.$router.go(-1);
    // },
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
    <Head :isCruisePage="true" />
  </header>

  <div class="block_1">
    <div class="info-content">
      <h3 class="product-title">{{ productTitle }}</h3>
      <h3 class="product-date">{{ productDate }}</h3>
    </div>

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
        <h3 class="product-price">от {{ productCount }} ₽/ чел.</h3>
        <button  class="btn-forms">Выбрать каюту</button>
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
            <router-link :to="'/product/' + product.id" class="btn-details">Выбор каюты</router-link>
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

.product-title{
  font-size: 24px;
  padding: 32px 150px 0px 150px;
  margin: 0;
  color: #333333;
  word-wrap: break-word; /* Добавленное свойство для переноса текста */
}

.product-date{
  font-size: 24px;
  font-weight: normal;
  padding: 32px 150px 0px 150px;
  margin: 0;
  color: #333333;
}

.info-content{
  display: flex;
  justify-content: space-between;
  align-items: center;
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
  height: 150px;
  width: auto;
  background-color: #ffffff;
  padding: 8px 16px;
}

.btn-forms{
  width: 100%;
  background-color: #007bff;
  font-size: 14px;
  color: #fff;
  border: none;
  padding: 8px 20px;
  margin-bottom: 16px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
  text-decoration: none; /* Убираем подчеркивание */
}

.btn-forms:hover {
  background-color: #0056b3;
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

<!--    <nav>-->
<!--      <ul class="navbar">-->

<!--        &lt;!&ndash; Хлебные крошки &ndash;&gt;-->
<!--&lt;!&ndash;        <div class="breadcrumbs">&ndash;&gt;-->
<!--&lt;!&ndash;          <div class="main_page" @click="goBack">Главная</div>&ndash;&gt;-->
<!--&lt;!&ndash;          <span>•</span>&ndash;&gt;-->
<!--&lt;!&ndash;          <p>Круиз</p>&ndash;&gt;-->
<!--&lt;!&ndash;        </div>&ndash;&gt;-->
<!--        -->
<!--        &lt;!&ndash; Хлебные крошки &ndash;&gt;-->

<!--        <div class="icon_nav">-->
<!--          <svg class="icon_number" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" >-->
<!--            <path d="M19.4099 13C19.1899 13 18.9599 12.93 18.7399 12.88C18.2948 12.7805 17.857 12.6501 17.4299 12.49C16.966 12.3212 16.4561 12.33 15.9982 12.5146C15.5404 12.6992 15.167 13.0466 14.9499 13.49L14.7299 13.95C13.7587 13.3992 12.8616 12.7271 12.0599 11.95C11.2828 11.1484 10.6107 10.2512 10.0599 9.28L10.5199 9.07C10.9633 8.85292 11.3107 8.47953 11.4953 8.02169C11.6799 7.56385 11.6887 7.05391 11.5199 6.59C11.3611 6.15903 11.2308 5.71808 11.1299 5.27C11.0799 5.05 11.0399 4.82 11.0099 4.6C10.8885 3.89562 10.5196 3.25774 9.96955 2.80124C9.41955 2.34474 8.72462 2.09961 8.00993 2.11H4.99993C4.57717 2.10945 4.15908 2.19825 3.77305 2.37058C3.38701 2.54292 3.04176 2.7949 2.75993 3.11C2.47225 3.43365 2.25804 3.81575 2.13203 4.23004C2.00602 4.64432 1.97119 5.08098 2.02993 5.51C2.57352 9.67214 4.47514 13.5387 7.43993 16.51C10.4113 19.4748 14.2778 21.3764 18.4399 21.92C18.5697 21.9299 18.7001 21.9299 18.8299 21.92C19.5673 21.9211 20.2793 21.6505 20.8299 21.16C21.145 20.8782 21.397 20.5329 21.5693 20.1469C21.7417 19.7609 21.8305 19.3428 21.8299 18.92V15.92C21.8245 15.229 21.5808 14.5611 21.1399 14.0291C20.6989 13.4971 20.0879 13.1336 19.4099 13ZM19.8999 19C19.8996 19.1395 19.8701 19.2775 19.8132 19.4049C19.7564 19.5324 19.6735 19.6465 19.5699 19.74C19.4603 19.8399 19.3299 19.9141 19.1881 19.9573C19.0463 20.0006 18.8966 20.0117 18.7499 19.99C15.0182 19.5026 11.5502 17.802 8.87993 15.15C6.2074 12.4775 4.49196 8.99737 3.99993 5.25C3.9782 5.10333 3.98936 4.95367 4.0326 4.81185C4.07584 4.67003 4.15007 4.5396 4.24993 4.43C4.34455 4.32515 4.46031 4.24154 4.58958 4.18466C4.71885 4.12778 4.8587 4.09892 4.99993 4.1H7.99993C8.23109 4.09435 8.45707 4.16898 8.63939 4.3112C8.82172 4.45341 8.94913 4.65442 8.99993 4.88C8.99993 5.15 9.08993 5.43 9.14993 5.7C9.2655 6.22386 9.41925 6.73857 9.60993 7.24L8.20993 7.9C7.96929 8.01046 7.78229 8.21185 7.68993 8.46C7.58991 8.70346 7.58991 8.97654 7.68993 9.22C9.12913 12.3028 11.6072 14.7808 14.6899 16.22C14.9334 16.32 15.2065 16.32 15.4499 16.22C15.6981 16.1276 15.8995 15.9406 16.0099 15.7L16.6399 14.3C17.1558 14.4881 17.6837 14.6418 18.2199 14.76C18.4799 14.82 18.7599 14.87 19.0299 14.91C19.2555 14.9608 19.4565 15.0882 19.5987 15.2705C19.7409 15.4529 19.8156 15.6788 19.8099 15.91L19.8999 19ZM13.9999 2C13.7699 2 13.5299 2 13.2999 2C13.0347 2.02254 12.7893 2.14952 12.6177 2.353C12.4461 2.55647 12.3624 2.81978 12.3849 3.085C12.4075 3.35022 12.5344 3.59562 12.7379 3.76721C12.9414 3.93881 13.2047 4.02254 13.4699 4H13.9999C15.5912 4 17.1174 4.63214 18.2426 5.75736C19.3678 6.88258 19.9999 8.4087 19.9999 10C19.9999 10.18 19.9999 10.35 19.9999 10.53C19.9778 10.7938 20.0611 11.0556 20.2317 11.2581C20.4023 11.4606 20.6462 11.5871 20.9099 11.61H20.9899C21.2403 11.611 21.4819 11.5181 21.667 11.3496C21.8522 11.1811 21.9674 10.9493 21.9899 10.7C21.9899 10.47 21.9899 10.23 21.9899 10C21.9899 7.88 21.1484 5.84668 19.6503 4.34668C18.1522 2.84667 16.1199 2.00265 13.9999 2ZM15.9999 10C15.9999 10.2652 16.1053 10.5196 16.2928 10.7071C16.4804 10.8946 16.7347 11 16.9999 11C17.2651 11 17.5195 10.8946 17.707 10.7071C17.8946 10.5196 17.9999 10.2652 17.9999 10C17.9999 8.93913 17.5785 7.92172 16.8284 7.17157C16.0782 6.42143 15.0608 6 13.9999 6C13.7347 6 13.4804 6.10536 13.2928 6.29289C13.1053 6.48043 12.9999 6.73478 12.9999 7C12.9999 7.26522 13.1053 7.51957 13.2928 7.70711C13.4804 7.89464 13.7347 8 13.9999 8C14.5304 8 15.0391 8.21071 15.4141 8.58579C15.7892 8.96086 15.9999 9.46957 15.9999 10Z"/>-->
<!--          </svg>-->
<!--          <p class="number">+7 (999) 124-23-45</p>-->
<!--          &lt;!&ndash; КНОПКА "ВОЙТИ" &ndash;&gt;-->
<!--          <button class="login_button" @click="openModal">Войти</button>-->

<!--          &lt;!&ndash; Кнопка "Личный кабинет" &ndash;&gt;-->
<!--&lt;!&ndash;          <router-link :to="'/account/'" v-else class="personal_cabinet_button">Личный кабинет</router-link>&ndash;&gt;-->


<!--        </div>-->
<!--      </ul>-->
<!--    </nav>-->