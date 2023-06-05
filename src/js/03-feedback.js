'use strict';

import throttle from 'lodash.throttle';

const feedbackForm = document.querySelector('.feedback-form');

// створюємо ключ keyLogin, за яким ми будемо отримувати значення, наш обєкт з поштою та повідомленням
const keyLogin = 'feedback-form-state';

// Дістаємо дані зі сховища і заповнюєио Input, якщо воно непорожнє, тобто true
const data = JSON.parse(localStorage.getItem(keyLogin));

// feedbackForm.addEventListener('input', onFormInput);

if (JSON.parse(localStorage.getItem(keyLogin))) {
  feedbackForm.elements.email.disabled = true;
  feedbackForm.elements.message.disabled = true;

  feedbackForm.elements.email.value = data.email;
  feedbackForm.elements.message.value = data.message;
}
//

// =================================================================
// ДЛЯ INPUT - - - - -
// =================================================================
feedbackForm.addEventListener('input', onFormInput);

function onFormInput(evt) {
  // забороняємо перезавантаження сторінки
  evt.preventDefault();

  // створюємо об'єкт для введених даних з форми
  const dateUser = {
    email: feedbackForm.elements.email.value,
    message: feedbackForm.elements.message.value,
  };

  console.log('dateUser=', dateUser);

  // записуємо дані у сховище
  localStorage.setItem(keyLogin, JSON.stringify(dateUser));

  feedbackForm.elements.email.disabled = true;
  feedbackForm.elements.message.disabled = true;
}

// ===  З Тротлом ==========================================
// let throttled = throttle(onFormInput, 50000);
// feedbackForm.addEventListener('input', throttled);

// function onFormInput(evt) {
//   // забороняємо перезавантаження сторінки
//   evt.preventDefault();

//   // створюємо об'єкт для введених даних з форми
//   const dateUser = {
//     email: feedbackForm.elements.email.value,
//     message: feedbackForm.elements.message.value,
//   };

//   console.log('dateUser=', dateUser);

//   // записуємо дані у сховище
//   localStorage.setItem(keyLogin, JSON.stringify(dateUser));

//   feedbackForm.elements.email.disabled = true;
//   feedbackForm.elements.message.disabled = true;
// }
// ======================================= З Тротлом ====

// =================================================================
// ДЛЯ SUBMIT - - - - - - - - - -
// =================================================================

feedbackForm.addEventListener('submit', onFormSubmit);

function onFormSubmit(evt) {
  // забороняємо перезавантаження сторінки
  evt.preventDefault();

  // беремо дані зі сховища, щоб очистити їх
  if (JSON.parse(localStorage.getItem(keyLogin))) {
    feedbackForm.elements.email.disabled = false;
    feedbackForm.elements.message.disabled = false;

    //   видалити з локального сховища
    localStorage.removeItem(keyLogin);
    //   очистити форму
    feedbackForm.reset();
    return;
  }
}
