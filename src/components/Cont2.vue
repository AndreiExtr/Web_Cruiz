<script>
export default {
  data() {
    return {
      images: ["/src/assets/2.png", "/src/assets/2.png", "/src/assets/3.png"],
      currentIndex: 0,
    };
  },
  methods: {
    nextSlide() {
      this.currentIndex = (this.currentIndex + 1) % this.images.length;
    },
    prevSlide() {
      this.currentIndex = (this.currentIndex - 1 + this.images.length) % this.images.length;
    }
  }
};
</script>




<template>
  <div class="container_2">
    <div class="block">
      <div class="text">
        <h2 class="title">Добро пожаловать в компанию «Тихоход»</h2>
        <h5 class="content">
            Мы - ведущая компания по круизным путешествиям и экспедиционным круизам по России.  С момента своего
          основания мы ставим своей миссией открывать удивительные места нашей прекрасной страны и предлагать
          незабываемые приключения на воде.<br />
            Наша команда состоит из опытных профессионалов, которые разделяют страсть к путешествиям и преданы своей
          работе. Мы постоянно стремимся превзойти ожидания наших гостей и создать атмосферу, где каждый момент на борту
          становится частью незабываемого опыта.<br />
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
          <div class="slides">
            <div v-if="currentIndex === 0" class="slide" >
              <img :src="images[0]" alt="Background Image" class="background-image">
            </div>
            <div v-else-if="currentIndex === 1" class="slide" >
              <img :src="images[1]" alt="Background Image" class="background-image">
            </div>
            <div v-else class="slide">
              <img :src="images[2]" alt="Background Image" class="background-image">
            </div>
          </div>
        </div>
      </div>



    </div>
  </div>
</template>



<style>
.slider-container{
  width: 500px;
  padding: 64px 150px 64px 16px;

}
.slider{
  position: relative;
  width: 500px;
  display: flex;
  justify-content: center; /* Выравнивание по центру по горизонтали */
  align-items: flex-start;
}
.navigation {
  position: absolute;
  bottom: 0;
  width: 300px;
  display: flex;
  justify-content: space-between;
  padding: 8px 8px 16px 8px;
  z-index: 1;
}

.slides {
  border-radius: 24px;
  height: 380px;
  position: relative;
  display: flex; /* Отображение слайдов в виде горизонтального ряда */
  transition: transform 0.5s ease; /* Плавное переключение слайдов */
  overflow: hidden; /* Скрытие выходящих за границы слайдов */
  margin: 0 auto; /* Центрирование слайдера на странице */
}

.slide {
  flex: 0 0 100%; /* Установка ширины слайда на 100% */
  max-width: 100%; /* Максимальная ширина слайда равна ширине контейнера */
  padding-right: 8px;
  border-radius: 24px;
}

.slide img {
  width: 100%;
  height: 100%;
}


.button-prev rect,
.button-next rect{
  fill-opacity: 0.3;
  stroke: #fff;
  stroke-width: 2;
}

.button-next,
.button-prev{
  fill: white;
  cursor: pointer;
}
.button-svg:hover rect,
.button-svg:hover path {
  fill: #274da7;
  stroke: #274da7;
}

</style>



