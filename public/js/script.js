'use strict';


// Index page
try {
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

            // await fetch('https://script.google.com/macros/s/AKfycbyirLuhsgD4t4Uc6tk0F995Rdta7XAmP3uM4kwrM3p-jc7Vo4oZOLjHT8p4JE9bMAxQ/exec', {
            //     method: 'POST',
            //     body: formData
            // })

            let response = await fetch('https://webinar-backend-750b6-default-rtdb.firebaseio.com/users.json', {
                method: 'POST',
                body: JSON.stringify({
                    name, phone, time: new Date().toLocaleString()
                })
            })

            if (response.ok) {
                window.location.href = `${ window.location.protocol }//${ window.location.host }/telegram.html`
            }
        }
    })
} catch (e) {}


// Users page

try {
    const tbody = document.querySelector('tbody');
    const refreshButton = document.querySelector('#refresh');
    const usersCount = document.querySelector('#refresh strong');

    async function getUsersList() {
        let response = await fetch('https://webinar-backend-750b6-default-rtdb.firebaseio.com/users.json', {
            method: 'GET'
        })

        let users = await response.json();
        let count = 0;
        tbody.innerHTML = '';
        for (const key in users) {
            count++;
            tbody.innerHTML += `
                <tr>
                    <td>${ count }</td>
                    <td>${ users[key].name }</td>
                    <td style="display: flex; justify-content: space-between">
                        <span>${ users[key].phone }</span>
                        <button style="cursor: pointer; margin-left: auto" data-clipboard>Copy</button>
                    </td>
                    <td>${ users[key].time }</td>
                </tr>
            `
        }
        usersCount.textContent = count;

        document.querySelectorAll('[data-clipboard]').forEach(i => {
            i.addEventListener('click', e => {
                const phone = e.target.parentElement.children[0].textContent;

                navigator.clipboard.writeText(phone);
            })
        })
    }

    getUsersList();

    refreshButton.addEventListener('click', getUsersList);
} catch (e) {
    
}
