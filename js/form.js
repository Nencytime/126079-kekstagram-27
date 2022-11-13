import {isEscapeKey, showAlert} from './util.js';
import {addValidator, pristineReset, pristineValidate} from './form-validate.js';
import {activateScale, deactivateScale} from './scale-image.js';
import {changeEffect, resetFilter} from './effects-image.js';
import {sendData} from './api.js';

const form = document.querySelector('.img-upload__form');
const overlay = document.querySelector('.img-upload__overlay');
const cancelButton = document.querySelector('#upload-cancel');
const fileField = document.querySelector('#upload-file');
const hashtagField = document.querySelector('.text__hashtags');
const commentField = document.querySelector('.text__description');
const effectsListElement = document.querySelector('.effects__list');
const body = document.querySelector('body');

const submitButton = document.querySelector('.img-upload__submit');

const showModal = () => {
  overlay.classList.remove('hidden');
  body.classList.add('modal-open');
  document.addEventListener('keydown', onEscKeydown);
  cancelButton.addEventListener('click', onCancelButtonClick);
  effectsListElement.addEventListener('change', changeEffect);
  activateScale();
};

const hideModal = () => {
  form.reset();
  pristineReset();
  resetFilter();
  overlay.classList.add('hidden');
  body.classList.remove('modal-open');
  document.removeEventListener('keydown', onEscKeydown);
  cancelButton.removeEventListener('click', onCancelButtonClick);
  effectsListElement.removeEventListener('change', changeEffect);
  deactivateScale();
};

function onCancelButtonClick () {
  hideModal();
}

const isTextFieldFocus = () => document.activeElement === hashtagField || document.activeElement === commentField;

function onEscKeydown (evt) {
  if (isEscapeKey(evt) && !isTextFieldFocus()) {
    evt.preventDefault();
    hideModal();
  }
}

const onFileInputChange = () => {
  showModal();
};

const blockSubmitButton = () => {
  submitButton.disabled = true;
  submitButton.textContent = 'Загружаю...';
};

const unblockSubmitButton = () => {
  submitButton.disabled = false;
  submitButton.textContent = 'Опубликовать';
};

const setUserFormSubmit = (onSuccess) => {

  form.addEventListener('submit', (evt) => {
    evt.preventDefault();

    if (pristineValidate()) {
      blockSubmitButton();
      sendData(
        () => {
          onSuccess();
          unblockSubmitButton();
        },
        () => {
          showAlert('Не удалось опубликовать изображение. Попробуйте ещё раз');
          unblockSubmitButton();
        },
        new FormData(evt.target),
      );
    }
  });
};

const addAddFormAction = () => {
  addValidator();
  fileField.addEventListener('change', onFileInputChange);
};

export {setUserFormSubmit, addAddFormAction};


/* const onSubmitForm = (evt) => {
  if (!pristineValidate()) {
    evt.preventDefault();
  }
};

const addAddFormAction = () => {
  addValidator();
  fileField.addEventListener('change', onFileInputChange);
  form.addEventListener('submit', onSubmitForm);
}; */

