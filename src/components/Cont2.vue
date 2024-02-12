<script>
export default {
  data() {
    return {
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

          <div class="slides" ref="slides">
            <div class="slide" v-for="(image, index) in images" :key="index">
              <img :src="image.src" :alt="image.alt" class="background-image">
            </div>
          </div>
        </div>
      </div>



    </div>
  </div>
</template>



<style>

/* Медиа-запрос для адаптивного разрешения */
@media screen and (max-width: 1200px) {
  .block {
    flex-direction: column; /* Располагаем дочерние элементы в столбец при адаптивном разрешении */
    align-items: center;
  }

  .text {
    padding: 24px 16px; /* Уменьшаем внутренние отступы по горизонтали */
    margin-right: 0 !important; /* Устанавливаем отступ справа равным нулю */
  }

  .slider-container{
    padding: 0 16px; /* Уменьшаем внутренние отступы по горизонтали */
  }

}

/* БЛОК 2*/
.container_2 {
  position: relative;
  width: 100%;
  height: 500px;
  box-sizing: border-box; /* Учитываем padding внутри ширины контейнера */
}
.block {
  padding: 64px 150px  64px 150px ;
  background-color: #f1f1f1;
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
.content{
  font-weight: lighter;
  font-size: 16px;
  color: #333333;
}

.slider-container{
/*  width: 100%;*/
  /*padding: 64px 150px 64px 64px;*/
}


.slider{
  border-radius: 24px;
  position: relative;
  width: 500px;
  display: flex;
  justify-content: center; /* Выравнивание по центру по горизонтали */
  overflow: hidden; /* Скрытие выходящих за границы слайдов */
  box-shadow: 0 10px 30px rgba(102, 153, 183, 0.6); /* Добавляем тень */
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
  border-radius: 8px;
  overflow: hidden; /* Обрезаем изображение по границам слайда */
  padding: 16px 16px 16px 16px; /* Добавляем внутренний отступ для изображения */
}

.slide img {
  width: 100%;
  border-radius: 8px; /* Радиус скругления для изображения */
  object-fit: cover; /* Растягиваем картинку на всю ширину и высоту, сохраняя пропорции */
}


.button-prev rect,
.button-next rect{
  fill-opacity: 0;
  stroke: #333333;
  stroke-width: 2;
}

.button-next,
.button-prev{
  fill: #333333;
  cursor: pointer;
}
.button-svg:hover rect,
.button-svg:hover path {
  fill: #274da7;
  stroke: #274da7;
}


</style>



