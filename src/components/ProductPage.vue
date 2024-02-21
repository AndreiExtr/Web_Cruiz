<script>
export default {
  data() {
    return {
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
        <div class="icon_nav">
          <!--  ИКОНКА "ПОИСК"-->
          <svg   class = "icon_nav_search" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
            <path d="M21.7104 20.29L18.0004 16.61C19.4405 14.8144 20.1379 12.5353 19.9492 10.2413C19.7605 7.94733 18.7001 5.81281 16.9859 4.27667C15.2718 2.74053 13.0342 1.91954 10.7333 1.9825C8.43243 2.04546 6.24311 2.98759 4.61553 4.61517C2.98795 6.24275 2.04582 8.43207 1.98286 10.7329C1.9199 13.0338 2.7409 15.2714 4.27704 16.9855C5.81318 18.6997 7.94769 19.7601 10.2417 19.9488C12.5357 20.1375 14.8148 19.4401 16.6104 18L20.2904 21.68C20.3834 21.7738 20.494 21.8481 20.6158 21.8989C20.7377 21.9497 20.8684 21.9758 21.0004 21.9758C21.1324 21.9758 21.2631 21.9497 21.385 21.8989C21.5068 21.8481 21.6174 21.7738 21.7104 21.68C21.8906 21.4936 21.9914 21.2444 21.9914 20.985C21.9914 20.7257 21.8906 20.4765 21.7104 20.29V20.29ZM11.0004 18C9.61592 18 8.26255 17.5895 7.1114 16.8203C5.96026 16.0511 5.06305 14.9579 4.53324 13.6788C4.00342 12.3997 3.8648 10.9923 4.1349 9.63439C4.40499 8.27653 5.07168 7.02925 6.05065 6.05028C7.02961 5.07131 8.27689 4.40463 9.63476 4.13453C10.9926 3.86443 12.4001 4.00306 13.6792 4.53287C14.9583 5.06268 16.0515 5.95989 16.8207 7.11103C17.5899 8.26218 18.0004 9.61556 18.0004 11C18.0004 12.8565 17.2629 14.637 15.9501 15.9498C14.6374 17.2625 12.8569 18 11.0004 18V18Z"/>
          </svg>
          <!--  ИКОНКА "ПОЛЬЗОВАТЕЛЬ"-->
          <svg class = "icon_nav_user" width="20" height="20" viewBox="0 0 24 24"  xmlns="http://www.w3.org/2000/svg">
            <path d="M15.7105 12.71C16.6909 11.9387 17.4065 10.8809 17.7577 9.68394C18.109 8.48697 18.0784 7.21027 17.6703 6.03147C17.2621 4.85267 16.4967 3.83039 15.4806 3.10686C14.4644 2.38332 13.2479 1.99451 12.0005 1.99451C10.753 1.99451 9.5366 2.38332 8.52041 3.10686C7.50423 3.83039 6.73883 4.85267 6.3307 6.03147C5.92257 7.21027 5.892 8.48697 6.24325 9.68394C6.59449 10.8809 7.31009 11.9387 8.29048 12.71C6.61056 13.383 5.14477 14.4994 4.04938 15.9399C2.95398 17.3805 2.27005 19.0913 2.07048 20.89C2.05604 21.0213 2.0676 21.1542 2.10451 21.2811C2.14142 21.4079 2.20295 21.5263 2.2856 21.6293C2.4525 21.8375 2.69527 21.9708 2.96049 22C3.2257 22.0292 3.49164 21.9518 3.69981 21.7849C3.90798 21.618 4.04131 21.3752 4.07049 21.11C4.29007 19.1552 5.22217 17.3498 6.6887 16.0388C8.15524 14.7278 10.0534 14.003 12.0205 14.003C13.9876 14.003 15.8857 14.7278 17.3523 16.0388C18.8188 17.3498 19.7509 19.1552 19.9705 21.11C19.9977 21.3557 20.1149 21.5827 20.2996 21.747C20.4843 21.9114 20.7233 22.0015 20.9705 22H21.0805C21.3426 21.9698 21.5822 21.8373 21.747 21.6313C21.9119 21.4252 21.9886 21.1624 21.9605 20.9C21.76 19.0962 21.0724 17.381 19.9713 15.9382C18.8703 14.4954 17.3974 13.3795 15.7105 12.71V12.71ZM12.0005 12C11.2094 12 10.436 11.7654 9.7782 11.3259C9.12041 10.8864 8.60772 10.2616 8.30497 9.53074C8.00222 8.79983 7.923 7.99557 8.07734 7.21964C8.23168 6.44372 8.61265 5.73099 9.17206 5.17158C9.73147 4.61217 10.4442 4.2312 11.2201 4.07686C11.996 3.92252 12.8003 4.00173 13.5312 4.30448C14.2621 4.60724 14.8868 5.11993 15.3264 5.77772C15.7659 6.43552 16.0005 7.20888 16.0005 8C16.0005 9.06087 15.5791 10.0783 14.8289 10.8284C14.0788 11.5786 13.0614 12 12.0005 12Z"/>
          </svg>
        </div>
      </ul>
    </nav>
  </header>
  <div class="block_1">
    <img src="/src/assets/6.jpg" alt="Background Image" class="background-image">
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
    <div class="block1">

      <h2 class="title">Горячие предложения</h2>

      <div class="cards">
        <div class="product-card">
          <div class="img_badge">
            <img src="/src/assets/image%201.png" alt="Product Image">
            <!-- Бейджик со скидкой -->
            <div class="discount-badge">
              <svg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
                <path d="M7.65304 15.2002C6.9447 16.8263 0.522477 18.6563 0.490356 20.4297C0.458233 22.2032 6.80997 24.2645 7.45896 25.9153C8.10795 27.566 4.86074 33.4012 6.09204 34.6779C7.32333 35.9546 13.2723 32.9208 14.8984 33.6292C16.5246 34.3375 18.3545 40.7598 20.128 40.7919C21.9014 40.824 23.9628 34.4723 25.6135 33.8233C27.2642 33.1743 33.0994 36.4215 34.3761 35.1902C35.6529 33.9589 32.6191 28.0099 33.3274 26.3838C34.0358 24.7577 40.458 22.9277 40.4901 21.1542C40.5222 19.3808 34.1705 17.3195 33.5215 15.6687C32.8725 14.018 36.1197 8.18281 34.8884 6.90609C33.6571 5.62937 27.7082 8.66314 26.082 7.9548C24.4559 7.24646 22.6259 0.824237 20.8525 0.792114C19.0791 0.759992 17.0177 7.11174 15.367 7.76073C13.7162 8.40971 7.88105 5.1625 6.60434 6.39379C5.32762 7.62508 8.36138 13.574 7.65304 15.2002Z" />
              </svg>
              <span class="discount-text">10%</span>
            </div>
          </div>

          <h3 class="product-title">Title</h3>
          <p class="product-price">от 58 565 ₽/ чел.</p>
          <p class="product-description">Lorem ipsum dolor sit amet, consectetur adipiscing elit</p>
          <router-link to="/product/:id"  class="btn-details">Подробнее</router-link>

        </div>

        <div class="product-card">

          <div class="img_badge">
            <img src="/src/assets/image%201.png" alt="Product Image">
            <!-- Бейджик со скидкой -->
            <div class="discount-badge">
              <svg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
                <path d="M7.65304 15.2002C6.9447 16.8263 0.522477 18.6563 0.490356 20.4297C0.458233 22.2032 6.80997 24.2645 7.45896 25.9153C8.10795 27.566 4.86074 33.4012 6.09204 34.6779C7.32333 35.9546 13.2723 32.9208 14.8984 33.6292C16.5246 34.3375 18.3545 40.7598 20.128 40.7919C21.9014 40.824 23.9628 34.4723 25.6135 33.8233C27.2642 33.1743 33.0994 36.4215 34.3761 35.1902C35.6529 33.9589 32.6191 28.0099 33.3274 26.3838C34.0358 24.7577 40.458 22.9277 40.4901 21.1542C40.5222 19.3808 34.1705 17.3195 33.5215 15.6687C32.8725 14.018 36.1197 8.18281 34.8884 6.90609C33.6571 5.62937 27.7082 8.66314 26.082 7.9548C24.4559 7.24646 22.6259 0.824237 20.8525 0.792114C19.0791 0.759992 17.0177 7.11174 15.367 7.76073C13.7162 8.40971 7.88105 5.1625 6.60434 6.39379C5.32762 7.62508 8.36138 13.574 7.65304 15.2002Z" />
              </svg>
              <span class="discount-text">8%</span>
            </div>
          </div>

          <h3 class="product-title">Title</h3>
          <p class="product-price">от 58 565 ₽/ чел.</p>
          <p class="product-description">Lorem ipsum dolor sit amet, consectetur adipiscing elit</p>
          <router-link to="/product/:id"  class="btn-details">Подробнее</router-link>
        </div>

        <div class="product-card">

          <div class="img_badge">
            <img src="/src/assets/image%201.png" alt="Product Image">
            <!-- Бейджик со скидкой -->
            <div class="discount-badge">
              <svg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
                <path d="M7.65304 15.2002C6.9447 16.8263 0.522477 18.6563 0.490356 20.4297C0.458233 22.2032 6.80997 24.2645 7.45896 25.9153C8.10795 27.566 4.86074 33.4012 6.09204 34.6779C7.32333 35.9546 13.2723 32.9208 14.8984 33.6292C16.5246 34.3375 18.3545 40.7598 20.128 40.7919C21.9014 40.824 23.9628 34.4723 25.6135 33.8233C27.2642 33.1743 33.0994 36.4215 34.3761 35.1902C35.6529 33.9589 32.6191 28.0099 33.3274 26.3838C34.0358 24.7577 40.458 22.9277 40.4901 21.1542C40.5222 19.3808 34.1705 17.3195 33.5215 15.6687C32.8725 14.018 36.1197 8.18281 34.8884 6.90609C33.6571 5.62937 27.7082 8.66314 26.082 7.9548C24.4559 7.24646 22.6259 0.824237 20.8525 0.792114C19.0791 0.759992 17.0177 7.11174 15.367 7.76073C13.7162 8.40971 7.88105 5.1625 6.60434 6.39379C5.32762 7.62508 8.36138 13.574 7.65304 15.2002Z" />
              </svg>
              <span class="discount-text">15%</span>
            </div>
          </div>

          <h3 class="product-title">Title</h3>
          <p class="product-price">от 58 565 ₽/ чел.</p>
          <p class="product-description">Lorem ipsum dolor sit amet, consectetur adipiscing elit</p>
          <router-link to="/product/:id"  class="btn-details">Подробнее</router-link>
        </div>

        <div class="product-card">

          <div class="img_badge">
            <img src="/src/assets/image%201.png" alt="Product Image">
            <!-- Бейджик со скидкой -->
            <div class="discount-badge">
              <svg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
                <path d="M7.65304 15.2002C6.9447 16.8263 0.522477 18.6563 0.490356 20.4297C0.458233 22.2032 6.80997 24.2645 7.45896 25.9153C8.10795 27.566 4.86074 33.4012 6.09204 34.6779C7.32333 35.9546 13.2723 32.9208 14.8984 33.6292C16.5246 34.3375 18.3545 40.7598 20.128 40.7919C21.9014 40.824 23.9628 34.4723 25.6135 33.8233C27.2642 33.1743 33.0994 36.4215 34.3761 35.1902C35.6529 33.9589 32.6191 28.0099 33.3274 26.3838C34.0358 24.7577 40.458 22.9277 40.4901 21.1542C40.5222 19.3808 34.1705 17.3195 33.5215 15.6687C32.8725 14.018 36.1197 8.18281 34.8884 6.90609C33.6571 5.62937 27.7082 8.66314 26.082 7.9548C24.4559 7.24646 22.6259 0.824237 20.8525 0.792114C19.0791 0.759992 17.0177 7.11174 15.367 7.76073C13.7162 8.40971 7.88105 5.1625 6.60434 6.39379C5.32762 7.62508 8.36138 13.574 7.65304 15.2002Z" />
              </svg>
              <span class="discount-text">10%</span>
            </div>
          </div>

          <h3 class="product-title">Title</h3>
          <p class="product-price">от 58 565 ₽/ чел.</p>
          <p class="product-description">Lorem ipsum dolor sit amet, consectetur adipiscing elit</p>
          <router-link to="/product/:id"  class="btn-details">Подробнее</router-link>
        </div>
      </div>

    </div>
  </div>

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

.block_1{
  position: relative;
  height: 450px;
}
.block_3{
  background-color: #EDF5FF;
}
.background-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: 0;
}
.navbar {
  height: auto;
  display: flex;
  margin: 0;
  padding-left: 48px;
  padding-right: 48px;
  padding-top: 16px;
  padding-bottom: 16px;
  justify-content: space-between;
  align-items: center;
  list-style-type: none;
}

.icon_nav{
  margin-left: auto;
}
.icon_nav_user{
  padding-left: 24px;
  fill: #333333;
}
.icon_nav_user:hover{
  fill: #0056b3;
}
.icon_nav_search{
  padding-left: 24px;
  fill: #333333;
}
.icon_nav_search:hover{
  fill: #0056b3;
}
</style>