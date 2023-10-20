'use strict';

const registerButton = document.querySelector('.webinar-main-button');
const modalBackdrop = document.querySelector('.modal-backdrop');
const modalCloserElements = document.querySelectorAll('[data-modal-close]');
const form = document.querySelector('.form');

registerButton.addEventListener('click', () => {
    modalBackdrop.classList.add('modal-backdrop--open')
})

function closeModal() {
    modalBackdrop.classList.remove('modal-backdrop--open');
}

window.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
        closeModal();
    }
})

modalCloserElements.forEach(el => {
    el.addEventListener('click', e => {
        if (e.target.hasAttribute('data-modal-close')) {
            closeModal();
        }
    })
})

form.addEventListener('submit', async e => {
    e.preventDefault();

    const submitButton = e.target.querySelector('.form-button');
    const name = e.target.querySelector('#name').value.trim();
    const phone = e.target.querySelector('#phone').value?.replace(/[^0-9]/g, '');

    if (name.length && phone?.length === 12) {
        submitButton.setAttribute('disabled', true);
        submitButton.textContent = 'Yuborilmoqda...'

        const formData = new FormData();
        formData.append('Ismi', name);
        formData.append('Telefon raqami', phone);
        formData.append(`Ro'yxatdan o'tgan vaqti`, new Date().toLocaleString());

        let response = await fetch('https://script.google.com/macros/s/AKfycbyirLuhsgD4t4Uc6tk0F995Rdta7XAmP3uM4kwrM3p-jc7Vo4oZOLjHT8p4JE9bMAxQ/exec', {
            method: 'POST',
            body: formData
        })

        if (response.ok) {
            window.location.href = `${ window.location.protocol }//${ window.location.host }/telegram.html`
        }
    }
})
