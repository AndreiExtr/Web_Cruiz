
<template>
  <div class="modal" :class="{ 'open': isModalOpen }">
    <div class="modal-content">

      <div class="head_modal">
        <h2 class="title_modal">Вход</h2>
        <span class="close" @click="closeModal">
          <!--  ИКОНКА "ЗАКРЫТИЕ МЕНЮ"-->
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
            <path d="M13.4099 11.9999L19.7099 5.70994C19.8982 5.52164 20.004 5.26624 20.004 4.99994C20.004 4.73364 19.8982 4.47825 19.7099 4.28994C19.5216 4.10164 19.2662 3.99585 18.9999 3.99585C18.7336 3.99585 18.4782 4.10164 18.2899 4.28994L11.9999 10.5899L5.70994 4.28994C5.52164 4.10164 5.26624 3.99585 4.99994 3.99585C4.73364 3.99585 4.47824 4.10164 4.28994 4.28994C4.10164 4.47825 3.99585 4.73364 3.99585 4.99994C3.99585 5.26624 4.10164 5.52164 4.28994 5.70994L10.5899 11.9999L4.28994 18.2899C4.19621 18.3829 4.12182 18.4935 4.07105 18.6154C4.02028 18.7372 3.99414 18.8679 3.99414 18.9999C3.99414 19.132 4.02028 19.2627 4.07105 19.3845C4.12182 19.5064 4.19621 19.617 4.28994 19.7099C4.3829 19.8037 4.4935 19.8781 4.61536 19.9288C4.73722 19.9796 4.86793 20.0057 4.99994 20.0057C5.13195 20.0057 5.26266 19.9796 5.38452 19.9288C5.50638 19.8781 5.61698 19.8037 5.70994 19.7099L11.9999 13.4099L18.2899 19.7099C18.3829 19.8037 18.4935 19.8781 18.6154 19.9288C18.7372 19.9796 18.8679 20.0057 18.9999 20.0057C19.132 20.0057 19.2627 19.9796 19.3845 19.9288C19.5064 19.8781 19.617 19.8037 19.7099 19.7099C19.8037 19.617 19.8781 19.5064 19.9288 19.3845C19.9796 19.2627 20.0057 19.132 20.0057 18.9999C20.0057 18.8679 19.9796 18.7372 19.9288 18.6154C19.8781 18.4935 19.8037 18.3829 19.7099 18.2899L13.4099 11.9999Z"/>
          </svg>
        </span>
      </div>

      <h5 class="content" v-if="!showAlternativeContent && !showSMSVerification">
        Введите номер телефона, который вы использовали при бронировании круиза
      </h5>

      <h5 class="content" v-else-if="showSMSVerification">
        Введите SMS-код, отправленный на ваш номер телефона:
      </h5>

      <div class="input_button" v-if="showSMSVerification">
        <input class="sms-input" type="text" v-model="smsCode" placeholder="Введите SMS-код">
        <button class="confirm" @click="verifySMS">Подтвердить</button>
      </div>

      <div class="input_button" v-if="!showAlternativeContent && !showSMSVerification">
        <input class="phone-input" type="text" v-model="phoneNumber" placeholder="Введите номер телефона">
        <!-- Отображение текста ошибки -->
        <p class="error" v-if="errorMessage">{{ errorMessage }}</p>

        <button class="next" @click="checkPhoneNumber">Продолжить</button>
      </div>

      <div class="input_button" v-else>
        <button class="change" @click="resetModalState">Изменить номер</button>
      </div>

    </div>
  </div>
</template>

<script>
import axios from "axios";
import {useRouter} from "vue-router";

export default {
  props: {
    isModalOpen: Boolean
  },
  data() {
    return {
      phoneNumber: '', // Номер телефона должен быть строкой
      showAlternativeContent: false, // Флаг для отображения альтернативного контента
      errorMessage: '', // Переменная для хранения сообщения об ошибке
      smsCode: '', // Переменная для хранения введенного SMS-кода
      showSMSVerification: false, // Флаг для отображения поля ввода SMS-кода
      expectedSMSCode: '1234' // Пример ожидаемого SMS-кода
    };
  },
  methods: {
    async checkPhoneNumber() {
      const phoneRegex = /^(?:\+7|8)\s?\d{3}\s?\d{3}\s?\d{2}\s?\d{2}$/;

      if (!phoneRegex.test(this.phoneNumber)) {
        this.errorMessage = 'Пожалуйста, введите корректный формат номера телефона "+7XXXXXXXXXX" или "8XXXXXXXXXX"';
      } else {
        try {
          // Отправляем POST запрос на маршрут '/users'
          const response = await axios.post(`http://localhost:3000/users`, { phoneNumber: this.phoneNumber });

          // Получаем данные из ответа
          const isValidPhoneNumber = response.data.isValid;

          if (isValidPhoneNumber) {
            // Пользователь существует, значит, круиз был забронирован
            this.errorMessage = '';
            this.showSMSVerification = true;
          } else {
            // Пользователь не найден
            this.errorMessage = 'Вы не забронировали круиз.';
          }
        } catch (error) {
          // Обработка ошибок при выполнении запроса
          console.error('Ошибка при выполнении запроса:', error);
          this.errorMessage = error.response?.data?.message ?? ''
        }
      }
    },

    smsCodeIsValid() {
      return this.smsCode === this.expectedSMSCode; // Проверяем совпадение введенного и ожидаемого кода
    },
    verifySMS() {
      if (this.smsCodeIsValid()) {
        // Сохраняем информацию о входе пользователя в localStorage
        localStorage.setItem('loggedIn', 'true');
        this.$router.push('/account');
      } else {
        // Выводим сообщение об ошибке, если код неверный
      }
    },

    resetModalState() {
      this.showAlternativeContent = false; // Установка флага в true для отображения альтернативного контента
      this.showSMSVerification = false; // Установка флага в false для скрытия поля ввода SMS-кода
    },
    closeModal() {
      this.$emit('close-modal');
    }
  }
};
</script>


<style>
/* МОДАЛЬНОЕ ОКНО "ВХОД" */
.modal {
  display: none; /* По умолчанию модальное окно скрыто */
  position: fixed;
  z-index: 5;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0,0,0,0.5); /* Черный цвет с прозрачностью */
}

.modal.open {
  overflow: hidden;
  display: block; /* Отображаем модальное окно, когда isModalOpen равно true */
}

.modal-content {
  border-radius: 5px;
  background-color: #fefefe;
  margin: 15% auto;
  padding: 20px;
  border: 1px solid #888;
  width: 320px;
}
.head_modal {
  justify-content: space-between;
  display: flex; /* Располагаем элементы заголовка в строку */
  align-items: center; /* Выравниваем элементы по вертикали */
}

.close {
  fill: #333333;
  float: right;
}

.close:hover{
  fill: #274da7;
  cursor: pointer;
}
.title_modal {
  margin: 0; /* Убираем внешние отступы заголовка */
}
.input_button {
  margin-top: 24px;
  display: flex; /* Располагаем элементы в строку */
  flex-direction: column; /* Выравниваем элементы в колонку */
  align-items: center; /* Выравниваем элементы по центру */
}
.error{
  font-size: 12px;
  color: red;
}

.phone-input,.sms-input {
  width: 100%;
  height: 32px;
  border-radius: 5px;
  border: 1px solid #333333; /* добавляем контур */
  background-color: #f2f2f2; /* добавляем фон */
  padding: 16px 20px; /* добавляем небольшой отступ внутри текстового поля */
  font-size: 14px; /* Размер шрифта кнопки */
  box-sizing: border-box; /* учитываем ширину границы и отступа внутри элемента */
}


.phone-input,.sms-input:focus {
  border: 1px solid #274da7; /* при фокусе граница становится синей */
  background-color: #ebf3ff; /* при фокусе фон становится светло-синим */
}


.next, .confirm {
  width: 100%; /* Делаем кнопку на всю ширину */
  background-color: #007bff; /* Цвет фона кнопки */
  border-radius: 5px;
  color: #fff; /* Цвет текста кнопки */
  padding: 10px 20px; /* Отступы внутри кнопки */
  margin-top: 10px;
  border: none; /* Убираем границу кнопки */
  font-size: 14px; /* Размер шрифта кнопки */
  cursor: pointer;
}
.next, .confirm:hover {
  background-color: #0056b3; /* Цвет фона кнопки */
  border: none; /* Убираем границу кнопки */
  cursor: pointer;
}
.change {
  width: 100%; /* Делаем кнопку на всю ширину */
  border-radius: 5px;
  background-color: #ffffff;
  color: #007bff; /* Цвет текста кнопки */
  padding: 10px 20px; /* Отступы внутри кнопки */
  border: none; /* Убираем границу кнопки */
  font-size: 14px; /* Размер шрифта кнопки */
  cursor: pointer;
}
.change:hover {
  background-color: #e9f2ff;
  cursor: pointer;
}
/* МОДАЛЬНОЕ ОКНО "ВХОД" */
</style>
