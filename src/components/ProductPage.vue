<script>
import Footer from "@/components/Footer.vue";
import Login from './Login.vue';
import axios from "axios";
import Head from '@/components/Head.vue';

export default {
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
      title: '',
      cruiseDate: '',
      count: '',
      product: null,
      isSticky: false,

      formData: {
        productId: '',
        cabinNumber: '',
        numberOfPeople: '1',
        surName: '',
        firstName: '',
        middleName: '',
        phoneNumber: ''
      }
    };
  },
  methods: {

    submitForm() {
      this.formData.productId = this.$route.params.id; // Присваиваем productId текущего круиза из параметров маршрута

      // Отправка данных круиза на сервер
      axios.post('http://localhost:3000/users', this.formData)
          .then(response => {
            // Логирование ответа от сервера в консоль
            console.log(response);

            this.$router.push('/account');
          })
          .catch(error => {
            // Логирование ошибки в консоль
            console.error('Ошибка при бронировании круиза:', error);
          });
    },


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
    handleScroll() {
      if (window.pageYOffset > 0) {
        this.isSticky = true;
      } else {
        this.isSticky = false;
      }
    },
  },
  mounted() {
    this.scrollToTop()

    const productId = this.$route.params.id; // Получаем id круиза из параметров маршрута
    axios.get(`http://localhost:3000/products/${productId}`)
        .then(response => {
          this.title = response.data.title;
          this.cruiseDate = response.data.cruiseDate;
          this.count = response.data.count;
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
};
</script>

<template>
  <header :class="{ 'sticky': isSticky }">
    <Head :isCruisePage="true" />
  </header>

  <div class="block_1">
    <div class="info-content">
      <h3 class="product-title">{{ title }}</h3>
      <h3 class="product-date">{{ cruiseDate }}</h3>
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
      <div class="block_2-text">
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
        <h3 class="booking_product-price">от {{ count }} ₽/ чел.</h3>
        <button  class="btn-forms">Выбрать каюту</button>
      </div>
    </div>
  </div>

  <div class="block_3">
    <div class="block_3-route">
      <h2 class="title">Маршруты</h2>
    </div>
  </div>

  <div class="block_4">
    <div class="block_4-choice">
      <h2 class="title">Выбор каюты</h2>
      <div class="block_4-booking">
        <div class="block_4-image">
          <img src="/src/assets/Схема%20палубы.png" alt="Background Image" class="background-imag">
        </div>

          <form @submit.prevent="submitForm">
            <div class="form-row">
              <label for="cabin">Номер каюты:</label>
              <input type="text" v-model="formData.cabinNumber" id="cabin" name="cabin">

              <label for="quantity">Количество человек:</label>
              <select v-model="formData.numberOfPeople" id="quantity" name="quantity">
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
              </select>
            </div>

            <div class="form-row">
              <label for="surname">Фамилия:</label>
              <input type="text" v-model="formData.surName" id="surname" name="surname">

              <label for="name">Имя:</label>
              <input type="text" v-model="formData.firstName" id="name" name="name">

              <label for="patronymic">Отчество:</label>
              <input type="text" v-model="formData.middleName" id="patronymic" name="patronymic">
            </div>

            <div class="form-row">
              <label for="phone">Номер телефона:</label>
              <input type="tel" v-model="formData.phoneNumber" id="phone" name="phone" pattern="[0-9]{11}">
            </div>

            <button type="submit" class="btn-forms">Забронировать</button>
          </form>

      </div>
    </div>
  </div>

  <div class="block_5">
    <div class="block_5-offers">
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
<!--          <form @submit.prevent="submitForm">-->
<!--            <div class="form-row">-->
<!--              <label for="cabin">Номер каюты:</label>-->
<!--              <input type="text" v-model="cabinNumber" id="cabin" name="cabin">-->

<!--              <label for="quantity">Количество человек:</label>-->
<!--              <select v-model="numberOfPeople" id="quantity" name="quantity">-->
<!--                <option value="1">1</option>-->
<!--                <option value="2">2</option>-->
<!--                <option value="3">3</option>-->
<!--              </select>-->
<!--            </div>-->

<!--            <div class="form-row">-->
<!--              <label for="surname">Фамилия:</label>-->
<!--              <input type="text" v-model="surName" id="surname" name="surname">-->

<!--              <label for="name">Имя:</label>-->
<!--              <input type="text" v-model="firstName" id="name" name="name">-->

<!--              <label for="patronymic">Отчество:</label>-->
<!--              <input type="text" v-model="middleName" id="patronymic" name="patronymic">-->
<!--            </div>-->

<!--            <div class="form-row">-->
<!--              <label for="phone">Номер телефона:</label>-->
<!--              <input type="tel" v-model="phoneNumber" id="phone" name="phone" pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}">-->
<!--            </div>-->

<!--            <button type="submit" class="btn-forms">Забронировать</button>-->
<!--          </form>-->
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

.block_2-text{
  width: 100%;
  margin-right: 32px;
}

.booking{
  width: 200px;
  background-color: #ffffff;
  padding: 16px;
  height: max-content;
}

.booking_product-price {
  width: max-content;
  font-size: 20px;
  font-weight: bold;
  color: #333333;
  margin-top: 5px;
}

.btn-forms{
  width: 100%;
  background-color: #007bff;
  font-size: 14px;
  color: #fff;
  border: none;
  padding: 8px 20px;
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
  background-color: #EDF5FF;
}

.block_3-route {
  padding: 0 150px  64px 150px ;
  display: flex; /* Располагаем дочерние элементы внутри .block горизонтально */
  justify-content: space-between; /* Равномерно распределяем пространство между дочерними элементами */
  flex-wrap: nowrap; /* Разрешаем элементам переноситься на новую строку при нехватке места */
}
/* БЛОК 3 */

/* БЛОК 4 */
.block_4{
  background-color: #ffffff;
}

.block_4-choice {
  padding: 64px 150px  64px 150px ;
}

.block_4-image {
  margin-right: 32px;
}

.block_4-image img {
  width: 100%; /* Ширина изображения займет всю доступную ширину */
  height: auto; /* Автоматическая высота для сохранения пропорций */
}

.block_4-booking{
  display: flex;
  gap: 24px;
}

/* Стили для формы выбора каюты */
.block_4-choice form {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #EDF5FF;
  border-radius: 4px;
  width: 400px;
  padding: 16px;
}

.form-row {
  width: 100%; /* Добавляем ширину для полного заполнения контейнера */
  margin-bottom: 10px;
}

.form-row label {
  width: auto; /* Задаем фиксированную ширину для меток */
}

.form-row input,
.form-row select {
  flex: 1;
  margin-bottom: 8px; /* Добавляем небольшое расстояние между элементами */
}

.block_4-choice form label {
  font-size: 16px;
  display: block;
  margin-bottom: 6px;
}

.block_4-choice form select,
.block_4-choice form input[type="text"],
.block_4-choice form input[type="tel"] {
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
}


/* БЛОК 4 */

/* БЛОК 5 */
.block_5{
  position: relative;
  background-color: #EDF5FF;
  height: auto;
}
.block_5-offers {
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

  .block_2-text{
    width: auto;
    margin: 0;
  }

  .booking{
    padding: 0 16px; /* Уменьшаем внутренние отступы по горизонтали */
    width: 300px;
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
