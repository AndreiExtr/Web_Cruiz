<script>
import Head from "@/components/Head.vue";
import Footer from "@/components/Footer.vue";
import axios from "axios";

export default {
  components: {
    Head,
    Footer
  },
  data() {
    return {
      products: [], // Ваш массив с продуктами
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

    // Вызов метода для определения ширины слайдера при загрузке и при изменении размеров окна
    this.calculateSlideWidth();
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
  },
  methods: {
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
};
</script>


<template>
  <div id="app">
    <Head />
    <!--  БЛОК №1-->
    <div class="container_1">
        <div class="title_button">
          <h1>Выберите свой <br> вариант путешествия</h1>
          <button class="select-cruise-button">Выбрать круиз</button>
        </div>

        <div class="overlay"></div>
        <img src="/src/assets/1.jpg" alt="Background Image" class="background-image">
    </div>

    <!--  БЛОК №2-->
    <div class="container_2" id="section1">
      <div class="block">
        <div class="text">
          <h2 class="title">Добро пожаловать в компанию «Тихоход»</h2>
          <h5 class="content">
              Мы - ведущая компания по круизным путешествиям и экспедиционным круизам по России.  С момента своего
            основания мы ставим своей миссией открывать удивительные места нашей прекрасной страны и предлагать
            незабываемые приключения на воде.<br />
              Наши круизы дарят возможность насладиться красотой российских рек и водных путей, позволяя
            путешественникам погрузиться в богатую историю, потрясающую культуру и запоминающиеся пейзажи нашей родины. Мы
            предлагаем экспедиции в самые удивительные уголки России, от морских побережий до глубин Сибири, от Черного
            моря до Белого моря.
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

    <!--  БЛОК №3-->
    <div class="container_3" id="section2">
      <div class="block1">

        <h2 class="title">Популярные круизы</h2>
        <div class="cards1">

          <!--   ШАБЛОН КАРТОЧКИ (популярные круизы)-->
          <div v-for="product in products" :key="product.id" class="product-card1">
            <img :src="product.image" alt="Product Image">
            <div class="info-right">
              <div class="product-title-container">
                <h3 class="product-title1">{{ product.title }}</h3>
                <p class="cruise-date">{{ product.cruiseDate }}</p>
              </div>
              <p class="product-price">от {{ product.count }} ₽/ чел.</p>
              <p class="product-description">{{ product.description }}</p>
              <router-link :to="'/product/' + product.id" class="btn-details">Выбар каюты</router-link>
            </div>
          </div>
          <!--   ШАБЛОН КАРТОЧКИ (популярные круизы)-->


  <!--
          <div v-if="product2" class="product-card1">
            <img :src="product2.image" alt="Product Image">
            <h3 class="product-title">{{ product2.title }}</h3>
            <p class="product-price" >от {{ product2.count }} ₽/ чел.</p>
            <p class="product-description">{{ product2.description }}</p>
            <router-link :to="'/product/' + product2.id" class="btn-details">Подробнее</router-link>
          </div>
  -->



            <!--КАРТОЧКА БЕЗ JS-->
  <!--        <div class="product-card">
            <img src="/src/assets/image%201.png" alt="Product Image">
            <h3 class="product-title">Title</h3>
            <p class="product-price">от 58 565 ₽/ чел.</p>
            <p class="product-description">Lorem ipsum dolor sit amet, consectetur adipiscing elit</p>
            <router-link to="/product/:id"  class="btn-details">Подробнее</router-link>
          </div>-->

        </div>
      </div>
    </div>

    <!--  БЛОК №4-->
<!--    <div class="container_4" id="section3">-->
<!--      <div class="block1">-->

<!--        <h2 class="title">Горячие предложения</h2>-->

<!--        <div class="cards1">-->
<!--          <div class="product-card1">-->
<!--            <div class="img_badge">-->
<!--              <img src="/src/assets/image%201.png" alt="Product Image">-->
<!--              &lt;!&ndash; Бейджик со скидкой &ndash;&gt;-->
<!--              <div class="discount-badge">-->
<!--                <svg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">-->
<!--                  <path d="M7.65304 15.2002C6.9447 16.8263 0.522477 18.6563 0.490356 20.4297C0.458233 22.2032 6.80997 24.2645 7.45896 25.9153C8.10795 27.566 4.86074 33.4012 6.09204 34.6779C7.32333 35.9546 13.2723 32.9208 14.8984 33.6292C16.5246 34.3375 18.3545 40.7598 20.128 40.7919C21.9014 40.824 23.9628 34.4723 25.6135 33.8233C27.2642 33.1743 33.0994 36.4215 34.3761 35.1902C35.6529 33.9589 32.6191 28.0099 33.3274 26.3838C34.0358 24.7577 40.458 22.9277 40.4901 21.1542C40.5222 19.3808 34.1705 17.3195 33.5215 15.6687C32.8725 14.018 36.1197 8.18281 34.8884 6.90609C33.6571 5.62937 27.7082 8.66314 26.082 7.9548C24.4559 7.24646 22.6259 0.824237 20.8525 0.792114C19.0791 0.759992 17.0177 7.11174 15.367 7.76073C13.7162 8.40971 7.88105 5.1625 6.60434 6.39379C5.32762 7.62508 8.36138 13.574 7.65304 15.2002Z" />-->
<!--                </svg>-->
<!--                <span class="discount-text">10%</span>-->
<!--              </div>-->
<!--            </div>-->
<!--            <div class="info-right">-->
<!--              <h3 class="product-title1">Title</h3>-->
<!--              <p class="product-price">от 58 565 ₽/ чел.</p>-->
<!--              <p class="product-description">Lorem ipsum dolor sit amet, consectetur adipiscing elit</p>-->
<!--              <router-link to="/product/:id"  class="btn-details">Выбрать каюту</router-link>-->
<!--            </div>-->
<!--          </div>-->

<!--          <div class="product-card1">-->
<!--            <div class="img_badge">-->
<!--              <img src="/src/assets/image%201.png" alt="Product Image">-->
<!--              &lt;!&ndash; Бейджик со скидкой &ndash;&gt;-->
<!--              <div class="discount-badge">-->
<!--                <svg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">-->
<!--                  <path d="M7.65304 15.2002C6.9447 16.8263 0.522477 18.6563 0.490356 20.4297C0.458233 22.2032 6.80997 24.2645 7.45896 25.9153C8.10795 27.566 4.86074 33.4012 6.09204 34.6779C7.32333 35.9546 13.2723 32.9208 14.8984 33.6292C16.5246 34.3375 18.3545 40.7598 20.128 40.7919C21.9014 40.824 23.9628 34.4723 25.6135 33.8233C27.2642 33.1743 33.0994 36.4215 34.3761 35.1902C35.6529 33.9589 32.6191 28.0099 33.3274 26.3838C34.0358 24.7577 40.458 22.9277 40.4901 21.1542C40.5222 19.3808 34.1705 17.3195 33.5215 15.6687C32.8725 14.018 36.1197 8.18281 34.8884 6.90609C33.6571 5.62937 27.7082 8.66314 26.082 7.9548C24.4559 7.24646 22.6259 0.824237 20.8525 0.792114C19.0791 0.759992 17.0177 7.11174 15.367 7.76073C13.7162 8.40971 7.88105 5.1625 6.60434 6.39379C5.32762 7.62508 8.36138 13.574 7.65304 15.2002Z" />-->
<!--                </svg>-->
<!--                <span class="discount-text">10%</span>-->
<!--              </div>-->
<!--            </div>-->
<!--            <div class="info-right">-->
<!--              <h3 class="product-title1">Title</h3>-->
<!--              <p class="product-price">от 58 565 ₽/ чел.</p>-->
<!--              <p class="product-description">Lorem ipsum dolor sit amet, consectetur adipiscing elit</p>-->
<!--              <router-link to="/product/:id"  class="btn-details">Выбрать каюту</router-link>-->
<!--            </div>-->
<!--          </div>-->

<!--          <div class="product-card1">-->
<!--            <div class="img_badge">-->
<!--              <img src="/src/assets/image%201.png" alt="Product Image">-->
<!--              &lt;!&ndash; Бейджик со скидкой &ndash;&gt;-->
<!--              <div class="discount-badge">-->
<!--                <svg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">-->
<!--                  <path d="M7.65304 15.2002C6.9447 16.8263 0.522477 18.6563 0.490356 20.4297C0.458233 22.2032 6.80997 24.2645 7.45896 25.9153C8.10795 27.566 4.86074 33.4012 6.09204 34.6779C7.32333 35.9546 13.2723 32.9208 14.8984 33.6292C16.5246 34.3375 18.3545 40.7598 20.128 40.7919C21.9014 40.824 23.9628 34.4723 25.6135 33.8233C27.2642 33.1743 33.0994 36.4215 34.3761 35.1902C35.6529 33.9589 32.6191 28.0099 33.3274 26.3838C34.0358 24.7577 40.458 22.9277 40.4901 21.1542C40.5222 19.3808 34.1705 17.3195 33.5215 15.6687C32.8725 14.018 36.1197 8.18281 34.8884 6.90609C33.6571 5.62937 27.7082 8.66314 26.082 7.9548C24.4559 7.24646 22.6259 0.824237 20.8525 0.792114C19.0791 0.759992 17.0177 7.11174 15.367 7.76073C13.7162 8.40971 7.88105 5.1625 6.60434 6.39379C5.32762 7.62508 8.36138 13.574 7.65304 15.2002Z" />-->
<!--                </svg>-->
<!--                <span class="discount-text">10%</span>-->
<!--              </div>-->
<!--            </div>-->
<!--            <div class="info-right">-->
<!--              <h3 class="product-title1">Title</h3>-->
<!--              <p class="product-price">от 58 565 ₽/ чел.</p>-->
<!--              <p class="product-description">Lorem ipsum dolor sit amet, consectetur adipiscing elit</p>-->
<!--              <router-link to="/product/:id"  class="btn-details">Выбрать каюту</router-link>-->
<!--            </div>-->
<!--          </div>-->

<!--        </div>-->

<!--      </div>-->
<!--    </div>-->

    <!--  БЛОК №5-->
    <div class="container_5" id="section4">
      <div class="block1">
        <h2 class="title">Новости</h2>

        <div class="blocks">
          <div class="background">
            <img src="/src/assets/3.png" alt="Background Image" class="background-image">
            <div class="info-badge">
              <div class="inf5">
                <p class="date1">
                  15 июля 2023
                </p>
                <p class="articl">
                  Круизы от «Тихоход» рекомендованы Русским географическим обществом.
                </p>
              </div>
            </div>
          </div>

          <div class="articles">
            <div class="inf1">
              <p class="date">
                15 июля 2023
              </p>
              <p class="articl">
                В ресторанах, барах и кафе каждого круизного лайнера работает опытный шеф-повар.
                Вы можете выбрать речной круиз с полноценным трехразовым питанием или частичным пансионом.
                Меню в ресторане представлено в нескольких вариантах, в кафе и барах – разнообразные десерты, винная карта.
              </p>
            </div>

            <div class="inf2">
              <p class="date">
                15 июля 2023
              </p>
              <p class="articl">
                В ресторанах, барах и кафе каждого круизного лайнера работает опытный шеф-повар.
                Вы можете выбрать речной круиз с полноценным трехразовым питанием или частичным пансионом.
                Меню в ресторане представлено в нескольких вариантах, в кафе и барах – разнообразные десерты, винная карта.
              </p>
            </div>

            <div class="inf3">
              <p class="date">
                15 июля 2023
              </p>
              <p class="articl">
                В ресторанах, барах и кафе каждого круизного лайнера работает опытный шеф-повар.
                Вы можете выбрать речной круиз с полноценным трехразовым питанием или частичным пансионом.
                Меню в ресторане представлено в нескольких вариантах, в кафе и барах – разнообразные десерты, винная карта.
              </p>
            </div>

            <div class="inf4">
              <p class="date">
                15 июля 2023
              </p>
              <p class="articl">
                В ресторанах, барах и кафе каждого круизного лайнера работает опытный шеф-повар.
                Вы можете выбрать речной круиз с полноценным трехразовым питанием или частичным пансионом.
                Меню в ресторане представлено в нескольких вариантах, в кафе и барах – разнообразные десерты, винная карта.
              </p>
            </div>

          </div>
        </div>
      </div>
    </div>
  </div>
  <Footer />
</template>


<style>
/* БЛОК 1*/
.container_1 {
  position: relative;
  padding-top: 0;
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
  font-size: 56px; /* Размер шрифта для заголовка */
}

.select-cruise-button {
  background-color: #007bff; /* Цвет фона кнопки */
  border-radius: 5px;
  color: #fff; /* Цвет текста кнопки */
  padding: 10px 20px; /* Отступы внутри кнопки */
  margin-top: 16px;
  font-size: 14px; /* Размер шрифта кнопки */
  border: none; /* Убираем границу кнопки */
  cursor: pointer;
}
.select-cruise-button:hover {
  background-color: #0056b3; /* Цвет фона кнопки */
  border: none; /* Убираем границу кнопки */
  cursor: pointer;
}

@media screen and (max-width: 900px) {
  h1 {
    font-size: 40px; /* Уменьшенный размер шрифта для заголовка на более узких экранах */
  }
}
/* БЛОК 1*/

/* БЛОК 2*/
.container_2 {
  position: relative;
  width: 100%;
  height: auto;
  background-color: #f8f8f8;
  box-sizing: border-box; /* Учитываем padding внутри ширины контейнера */
}

.block {
  padding: 64px 150px  64px 150px ;
  display: flex; /* Располагаем дочерние элементы внутри .block горизонтально */
  justify-content: space-between; /* Равномерно распределяем пространство между дочерними элементами */
  flex-wrap: nowrap; /* Разрешаем элементам переноситься на новую строку при нехватке места */
}

.text{
  margin-right: 64px;
}

.title{
  font-weight: lighter;
  font-size: 20px;
  color: #333333;
  text-transform: uppercase; /* Добавляем это свойство */
}
.content {
  font-weight: lighter;
  font-size: 16px;
  color: #333333;
  line-height: 1.5; /* Устанавливаем высоту строки в 1.5 раза больше размера шрифта */
}

.slider{
  border-radius: 5px;
  position: relative;
  width: 500px;
  display: flex;
  justify-content: center; /* Выравнивание по центру по горизонтали */
  overflow: hidden; /* Скрытие выходящих за границы слайдов */
  box-shadow: -1px 24px 36px -21px rgba(0,86,179,0.43); /* Добавляем тень */
}
.navigation {
  position: absolute;
  bottom: 0;
  width: 300px;
  display: flex;
  justify-content: space-between;
  padding: 0 8px 8px 8px;
  z-index: 1;
}

.slides {
  transition: transform 0.5s ease-in-out;
  height: 380px;
  position: relative;
  display: flex; /* Отображение слайдов в виде горизонтального ряда */

}

.slide {
  flex: 0 0 calc(100% - 32px); /* Устанавливаем ширину слайда с учетом отступа */
  height: 300px; /* Убираем фиксированную высоту */
  border-radius: 5px;
  overflow: hidden; /* Обрезаем изображение по границам слайда */
  padding: 16px 16px 16px 16px; /* Добавляем внутренний отступ для изображения */
}

.slide img {
  width: 100%;
  /*
  border-radius: 5px; !* Радиус скругления для изображения *!
  */
  object-fit: cover; /* Растягиваем картинку на всю ширину и высоту, сохраняя пропорции */
}


.button-prev rect,
.button-next rect{
  fill-opacity: 0;
  stroke: #9f9f9f;
  stroke-width: 2;
}

.button-next,
.button-prev{
  fill: #9F9F9F;
  cursor: pointer;
}
.button-svg:hover rect,
.button-svg:hover path {
  fill: #0056b3;
  stroke: #0056b3;
}

/* Медиа-запрос для адаптивного разрешения */
@media screen and (max-width: 1200px) {
  .container_2{
    height: auto;
  }
  .block {
    padding: 48px 24px; /* Уменьшаем отступы */
    flex-direction: column; /* Располагаем дочерние элементы в столбец при адаптивном разрешении */
    align-items: center;
  }
  .text {
    /*padding: 24px 16px; !* Уменьшаем внутренние отступы по горизонтали *!*/
    margin-right: 0 !important; /* Устанавливаем отступ справа равным нулю */
  }
  .slider-container{
    padding: 0 16px; /* Уменьшаем внутренние отступы по горизонтали */
  }
}
/* БЛОК 2*/

/* БЛОК 3*/
.container_3 {
  width: 100%;
  height: auto;
  background-color: #EDF5FF;
}
.block1 {
  padding: 64px 150px  64px 150px ;
  justify-content: space-between;
  flex-wrap: nowrap;
}

.cards1 {
  display: flex;
  flex-wrap: wrap; /* Позволяет карточкам переноситься на новую строку */
  justify-content: space-between; /* Равномерно распределяет пространство между карточками по горизонтали */
}

/* КАРТОЧКИ*/
.product-card1 {
  display: flex;
  align-items: flex-start; /* Выравнивание по верхнему краю */
  margin-bottom: 20px; /* Отступ между карточками */
  background: white;
  border-radius: 5px;
  padding: 16px;
  justify-content: flex-start; /* Выравнивание по левому краю по горизонтали */
  cursor: pointer;
  width: 100%; /* Растягиваем карточку по ширине контейнера */
}

.product-card1:hover {
  box-shadow: 16px 16px 36px -21px rgba(0, 86, 179, 0.43); /* Добавляем тень при наведении */
}

.info-right {
  width: 100%;
  height: auto;
  margin-left: 20px; /* Отступ между изображением и текстом справа */
}

.product-card1 img {
  max-width: 300px; /* Максимальная ширина изображения равна ширине родительского элемента */
  max-height: 100%; /* Максимальная высота изображения равна высоте родительского элемента */
  width: auto; /* Автоматическое определение ширины для сохранения пропорций */
  height: auto; /* Автоматическое определение высоты для сохранения пропорций */
}



.product-title1 {
  font-size: 18px;
  margin: 0;
  color: #333333;
  word-wrap: break-word; /* Добавленное свойство для переноса текста */
}
.product-title-container {
  width: 100%;
  display: flex;
  justify-content: space-between;
}

.cruise-date {
  font-weight: bold;
  text-align: right;
  margin: 0;
}
.product-price {
  font-weight: bold;
  color: #007bff;
  margin-top: 5px;
}
.product-description {
  font-size: 14px;
  margin-top: 10px;
  margin-bottom: 16px;
  word-wrap: break-word; /* Добавленное свойство для переноса текста */
}


.btn-details {
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

.btn-details:hover {
  background-color: #0056b3;
}

/* КНОПКА "ПОСМОТРЕТЬ ВСЕ" */
.button_all {
  font-size: 14px;
  text-align: center; /* Выравниваем по центру */
  margin-top: 20px; /* Отступ сверху */
  padding-bottom: 16px;
  padding-top: 16px;
}

.btn-see {
  background-color: #007bff;
  color: #fff;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.btn-see:hover {
  background-color: #0056b3;
}


/* Медиа-запрос для адаптивного разрешения */
@media screen and (max-width: 1200px) {
  .container_3{
    height: auto;
  }

  .block1 {
    padding: 48px 24px; /* Уменьшаем отступы */
    flex-direction: column; /* Располагаем дочерние элементы в столбец при адаптивном разрешении */
    align-items: center;
  }
}
/* БЛОК 3*/

/* БЛОК 4*/
.container_4 {
  width: 100%;
  height: auto;
  background-color: #f8f8f8;
}

/* КАРТОЧКИ*/
.img_badge {
  position: relative;
}
.discount-badge {
  position: absolute;
  top: -15px;
  right: -15px;
  display: flex;
  align-items: center;
  fill: #ff0101;
}

.discount-text {
  font-size: 12px;
  position: absolute; /* Абсолютное позиционирование для текста */
  top: 50%; /* Располагаем текст по вертикали по центру */
  left: 50%; /* Располагаем текст по горизонтали по центру */
  transform: translate(-50%, -50%); /* Центрируем текст по центру бейджика */
  color: #ffffff; /* Цвет текста */
}


/* БЛОК 5*/
.container_5 {
  width: 100%;
  height: auto;
  background-color: #f8f8f8;
}
.blocks {
  display: flex; /* Делаем контейнер flex-контейнером */
  justify-content: space-between;
  flex-wrap: nowrap;
}
.background{
  position: relative;
  margin-right: 16px;
}
.background img {
  max-width: none; /* Отключает максимальную ширину изображения */
  width: 550px; /* Автоматическая ширина для поддержки изначального размера */
  height: auto; /* Автоматическая высота для поддержки пропорций */
}
.info-badge {
  position: absolute;
  bottom: 5px; /* Расстояние от нижнего края родительского блока */
  background-color: rgba(0, 0, 0, 0.5); /* Прозрачный черный цвет фона */
  color: white; /* Белый цвет текста */
  padding: 10px; /* Внутренний отступ */
}

.articles{
  font-weight: normal;
  font-size: 16px;
  color: #333333;
}
.inf1:hover .date,
.inf1:hover .articl,
.inf2:hover .date,
.inf2:hover .articl,
.inf3:hover .date,
.inf3:hover .articl,
.inf4:hover .date,
.inf4:hover .articl {
  color: #0056b3;
  cursor: pointer;
}
.inf5:hover .date1,
.inf5:hover .articl{
  color: #0f83fd;
  cursor: pointer;
}

.articl{
  margin-top: 2px;
  overflow: hidden; /* Скрываем все, что не помещается в контейнер */
  display: -webkit-box; /* Включаем поддержку для старых версий Safari и iOS */
  -webkit-box-orient: vertical; /* Устанавливаем ориентацию блока в вертикальное положение */
  -webkit-line-clamp: 3; /* Устанавливаем количество отображаемых строк */
  /* Добавляем префиксы для других браузеров */
  display: -moz-box;
  -moz-box-orient: vertical;
  -moz-line-clamp: 3;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
}
.date{
  font-weight: normal;
  font-size: 12px;
  color: #333333;
  margin-bottom: 0;
}
.date1{
  font-weight: normal;
  font-size: 12px;
  color: #ffffff;
  margin-bottom: 0;
}


/* Медиа-запрос для адаптивного разрешения */
@media screen and (max-width: 1200px) {
  .container_4{
    height: auto;
  }
  .container_5{
    height: auto;
  }
  .blocks {
    padding: 48px 24px; /* Уменьшаем отступы */
    flex-direction: column; /* Располагаем дочерние элементы в столбец при адаптивном разрешении */
    align-items: center;
  }
  .block1 {
    padding: 48px 24px; /* Уменьшаем отступы */
    flex-direction: column; /* Располагаем дочерние элементы в столбец при адаптивном разрешении */
    align-items: center;
  }
}

</style>