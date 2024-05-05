export function openModal(modal){
    modal.classList.add('popup_is-opened');
    document.addEventListener('keydown', handleKey);
}

export function closeModal(modal) {
    modal.classList.remove('popup_is-opened');
    document.removeEventListener('keydown', handleKey);
}

export function handleKey(evt) {
    if (evt.key === 'Escape'){
        closeModal(document.querySelector('.popup_is-opened'))
    };
}

export function popupClose(popup) {
        popup.addEventListener('click', (evt) => {
          if(evt.target.classList.contains('popup__close') || evt.target.classList.contains('popup')) {
            closeModal(popup);
            };
        });
}