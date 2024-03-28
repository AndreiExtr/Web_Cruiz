
<template>
  <header :class="{ 'sticky': isSticky }">
    <nav>
      <ul class="navbar">
        <!-- Хлебные крошки -->
        <div class="breadcrumbs_acc">
          <div class="main_page" @click="goToHomePage">Главная</div>
          <span>•</span>
          <p>Личный кабинет</p>
        </div>
      </ul>
    </nav>
  </header>
  <div class="block0">
    <div class="block01">
      <h2 class="title">Личный кабинет</h2>
      <div class="tab">
        <input checked id="tab-btn-1" name="tab-btn" type="radio" value="">
        <label class="tab-1" for="tab-btn-1">Мои заказы</label>
        <input id="tab-btn-2" name="tab-btn" type="radio" value="">
        <label class="tab-2" for="tab-btn-2">Настройки</label>
        <hr>
        <div class="tab-content" id="content-1">
          Содержимое 1...
        </div>
        <div class="tab-content" id="content-2">
          <router-link :to="'/'" class="btn-exit">Выйти из аккаунта</router-link>
        </div>
      </div>

    </div>

  </div>
  <Footer />
</template>

<script>
import Footer from "@/components/Footer.vue";

export default {
  components: {
    Footer
  },
  data() {
    return {
      isSticky: false,
    };
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll);
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.handleScroll);
  },
  methods:{
    goToHomePage() {
      this.$router.push('/'); // Переход на главную страницу
    },
    handleScroll() {
      if (window.pageYOffset > 0) {
        this.isSticky = true;
      } else {
        this.isSticky = false;
      }
    },
  }
}
</script>


<style scoped>
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

.navbar {
  height: auto;
  display: flex;
  margin: 0;
  padding: 16px 48px;
  justify-content: space-between;
  align-items: center;
  list-style-type: none;
}

.main_page{
  color: #007bff;  /* Цвет фона текста */
  cursor: pointer;
}

.main_page:hover{
  color: #0056b3; /* Цвет фона кнопки */
}

span{
  padding-right: 6px;
  padding-left: 6px;
}

.breadcrumbs_acc{
  font-size: 16px;
  font-weight: 400;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* БЛОК 1 */
.block0 {
  height: 700px; /* Изменено на авто, чтобы блок подстраивался по содержимому */
  padding: 32px 150px 64px 150px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  flex-wrap: nowrap;
}

.block01{
  width: 100%;
  justify-content: space-between;
  flex-wrap: nowrap;
  text-align: left;
  margin-top: 20px;
}

.btn-exit {
  background-color: #ff0000;
  font-size: 14px;
  color: #fff;
  border: none;
  padding: 8px 20px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
  text-decoration: none;
}

.btn-exit:hover {
  background-color: #b30000;
}

/* ТАБЫ */
.tab{
  margin: 24px 0;
}

.tab > input[type="radio"] {
  display: none;
}

hr{
  width: 100%;
}

.tab-1,
.tab-2{
  padding: 8px 16px;
  cursor: pointer;
}

.tab-1:hover,
.tab-2:hover{
  color: #0056b3;
}

.tab-content {
  display: none;
  margin: 16px 0;
}

#tab-btn-1:checked~#content-1,
#tab-btn-2:checked~#content-2{
  display: block;
}

.tab > input[type="radio"]:checked + label {
  color: #007bff;
}
</style>