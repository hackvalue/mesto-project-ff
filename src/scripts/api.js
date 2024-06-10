// Связь с сервером

const config = {
  baseUrl: "https://nomoreparties.co/v1/wff-cohort-15",
  headers: {
    authorization: "e09901b2-60e7-4999-a1ed-10c0f9bbfd57",
    "Content-Type": "application/json",
  },
};

function callAPI(config, link, options) {
  return fetch(`${config.baseUrl}/` + link, options).then(checkResponse);
}

function checkResponse(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(res.status);
}

// Исходные карточки

export const getCardsData = () => {
  return callAPI(config, "cards", {
    method: "GET",
    headers: config.headers,
  });
};

// Профиль получить/отправить

export const getProfileData = () => {
  return callAPI(config, "users/me", {
    method: "GET",
    headers: config.headers,
  });
};

export const updateProfileData = (dataProfileName, dataProfileJob) => {
  return callAPI(config, "users/me", {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      name: dataProfileName,
      about: dataProfileJob,
    }),
  });
};

export const postNewCard = (dataCardName, dataCardLink) => {
  return callAPI(config, "cards", {
    method: "POST",
    headers: config.headers,
    body: JSON.stringify({
      name: dataCardName,
      link: dataCardLink,
    }),
  });
};

export const deleteOneCard = (cardId) => {
  return callAPI(config, "cards/" + cardId, {
    method: "DELETE",
    headers: config.headers,
  });
};

export const addLike = (cardId) => {
  return callAPI(config, "cards/likes/" + cardId, {
    method: "PUT",
    headers: config.headers,
  });
};

export const deleteLike = (cardId) => {
  return callAPI(config, "cards/likes/" + cardId, {
    method: "DELETE",
    headers: config.headers,
  });
};

export const editProfileAvatar = (inputAvatarValue) => {
  return callAPI(config, 'users/me/avatar', {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      avatar: inputAvatarValue
    })
  })
};