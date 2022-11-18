const GET_URL = 'https://27.javascript.pages.academy/kekstagram/data';
const POST_URL = 'https://27.javascript.pages.academy/kekstagram';

const getData = (onSuccess, onFail) => {
  fetch(GET_URL)
    .then((response) => response.json())
    .then((images) => {
      onSuccess(images);
    })
    .catch(() => {
      onFail();
    });
};

const sendData = (onSuccess, onFail, body) => {
  fetch(POST_URL,
    {
      method: 'POST',
      body,
    },
  )
    .then((response) => {
      if (response.ok) {
        onSuccess();
      } else {
        onFail('Не удалось опубликовать изображение. Попробуйте ещё раз');
      }
    })
    .catch(() => {
      onFail('Не удалось опубликовать изображение. Попробуйте ещё раз');
    });
};

export {getData, sendData};
