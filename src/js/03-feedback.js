'use strict';

import throttle from 'lodash.throttle';
// var throttled = require('lodash.throttle');

// створюємо ключ keyLogin, за яким ми будемо отримувати значення, наш обєкт з поштою та повідомленням
const keyLogin = 'feedback-form-state';

// Дістаємо дані зі сховища і заповнюєио Input, якщо воно непорожнє, тобто true
const dataStorage = JSON.parse(localStorage.getItem(keyLogin));

const feedbackForm = document.querySelector('.feedback-form');

feedbackForm.addEventListener('input', throttle(onFormInput, 500));

if (dataStorage) {
  feedbackForm.elements.email.value = dataStorage.email;
  feedbackForm.elements.message.value = dataStorage.message;
}

// ДЛЯ INPUT - - - - -----------

function onFormInput() {
  const form = {
    email: feedbackForm.elements.email.value,
    message: feedbackForm.elements.message.value,
  };

  // створюємо об'єкт для введених даних з форми
  const dataUser = {
    email: form.email,
    message: form.message,
  };

  // записуємо дані у сховище
  localStorage.setItem(keyLogin, JSON.stringify(dataUser));
}

// ДЛЯ SUBMIT - - - - - - - - - -

feedbackForm.addEventListener('submit', onFormSubmit);

function onFormSubmit(evt) {
  // забороняємо перезавантаження сторінки
  evt.preventDefault();

  console.log(JSON.parse(localStorage.getItem(keyLogin)));

  // беремо дані зі сховища, щоб очистити їх
  if (JSON.parse(localStorage.getItem(keyLogin))) {
    JSON.parse(localStorage.getItem(keyLogin)).email = '';
    JSON.parse(localStorage.getItem(keyLogin)).message = '';

    //   видалити з локального сховища
    localStorage.removeItem(keyLogin);

    //   очистити форму
    feedbackForm.reset();
    return;
  }
}
