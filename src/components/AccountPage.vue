<template>
  <header :class="{ 'sticky': isSticky }">
    <Head :isCruisePage="true" :isAccountPage="false" @logout-success="handleLogoutSuccess"/>
  </header>
  <div class="block0">
    <div class="block01">
      <h2 class="title">Личный кабинет</h2>
      <div class="tab">
        <input checked id="tab-btn-1" name="tab-btn" type="radio" value="">
        <label class="tab-1" for="tab-btn-1">Мои круизы</label>
        <input id="tab-btn-2" name="tab-btn" type="radio" value="">
        <label class="tab-2" for="tab-btn-2">Настройки</label>
        <hr>
        <div class="tab-content" id="content-1">
          <div v-for="user in users" :key="user.id">
            <!-- Отображение информации о круизе -->
            <div class="product-info">
              <p><strong>Название круиза:</strong> {{ user.title }}</p>
              <p><strong>Дата круиза:</strong> {{ user.cruiseDate }}</p>
              <p><strong>Сумма:</strong> {{ user.count }}</p>
              <p><strong>Количество человек:</strong> {{ user.numberOfPeople }}</p>
              <p><strong>Номер каюты:</strong> {{ user.cabinNumber }}</p>
            </div>
          </div>
        </div>
        <div class="tab-content" id="content-2">
          <router-link :to="'/'" class="btn-exit" @click="logout">Выйти из аккаунта</router-link>
        </div>
      </div>
    </div>
  </div>
  <Footer />
</template>

<script>
import Footer from "@/components/Footer.vue";
import Menu from "@/components/Menu.vue";
import Head from "@/components/Head.vue";
import axios from "axios";

export default {
  components: {
    Head,
    Menu,
    Footer
  },
  data() {
    return {
      products: [],
      users: [],
      isSticky: false,
      loggedIn: false
    };
  },
  mounted() {
    // Получаем данные о пользователях
    axios.get('http://localhost:3000/users')
        .then(response => {
          this.users = response.data;

          // Создаем массив промисов для запросов о круизах
          const usersCount = this.users.length;
          let completedRequests = 0; // Переменная для отслеживания завершенных запросов

          this.users.forEach((user, index) => {
            axios.get(`http://localhost:3000/products/${user.productId}`)
                .then(response => {
                  // Проверяем статус ответа
                  if (response.status === 200) {
                    // Если статус успешный, присваиваем данные о круизе пользователю
                    user.title = response.data.title;
                    user.cruiseDate = response.data.cruiseDate;
                    user.count = response.data.count;
                  } else {
                    // Выводим сообщение об ошибке в консоль
                    console.error('Ошибка при загрузке круиза:', response.statusText);
                  }

                  completedRequests++;

                  // После завершения всех запросов обновляем состояние компонента
                  if (completedRequests === usersCount) {
                    this.users = [...this.users]; // Переопределяем состояние для обновления представления
                  }
                })
                .catch(error => {
                  console.error('Ошибка при загрузке круиза:', error);
                  completedRequests++;

                  // После завершения всех запросов обновляем состояние компонента
                  if (completedRequests === usersCount) {
                    this.users = [...this.users]; // Переопределяем состояние для обновления представления
                  }
                });
          });
        })
        .catch(error => {
          console.error('Ошибка при загрузке круизов пользователя:', error);
        });

    window.addEventListener('scroll', this.handleScroll);
  },



  beforeDestroy() {
    window.removeEventListener('scroll', this.handleScroll);
  },
  methods:{
    handleLogoutSuccess() {
      this.loggedIn = false;
    },

    logout() {
      localStorage.removeItem('loggedIn');
      this.$emit('logout-success');
    },

    goToHomePage() {
      this.$router.push('/');
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

span{
  padding-right: 6px;
  padding-left: 6px;
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

.product-info{
  width: 100%;
  height: auto;
  background-color: #f6f6f6;
  padding: 16px;
  border-radius: 4px;
  border: 2px solid #d9d9d9;
  margin-bottom: 16px;
}
</style>