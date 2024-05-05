export function openModal(modal){
    modal.classList.add('popup_is-opened');
    document.addEventListener('keydown', handleEscape);
}

export function closeModal(modal) {
    modal.classList.remove('popup_is-opened');
    document.removeEventListener('keydown', handleEscape);
}

function handleEscape(evt) {
    if (evt.key === 'Escape'){
        closeModal(document.querySelector('.popup_is-opened'))
    };
}

export function handlePopupClose(popup) {
        popup.addEventListener('click', (evt) => {
          if(evt.target.classList.contains('popup__close') || evt.target.classList.contains('popup')) {
            closeModal(popup);
            };
        });
}