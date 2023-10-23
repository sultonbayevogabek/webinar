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
    const pagination = document.querySelector('#pagination');
    let page = 1;
    let users = [];

    async function getUsersList() {
        let response = await fetch('https://webinar-backend-750b6-default-rtdb.firebaseio.com/users.json', {
            method: 'GET'
        })

        const usersObjects = await response.json()
        users = [];
        let count = 0;
        for (const key in usersObjects) {
            count++;
            users.push({
                id: count,
                ...usersObjects[key]
            })
        }
        usersCount.textContent = count;
        drawList();

        pagination.innerHTML = '';
        for (let i = 0; i < Math.ceil(count / 100); i++) {
            pagination.innerHTML += `
                <button data-paginator-button style="margin: 10px 2px; cursor: pointer">${ i + 1 }</button>
            `
        }

        document.querySelectorAll('[data-paginator-button]')?.forEach(button => {
            button.addEventListener('click', e => {
                page = +e.target.textContent;

                drawList();
            })
        })
    }

    function drawList() {
        tbody.innerHTML = '';
        users.slice((page - 1) * 100, page * 100)?.forEach(user => {
            tbody.innerHTML += `
                <tr>
                    <td>${ user.id }</td>
                    <td>${ user.name }</td>
                    <td>
                        <div style="display: flex; justify-content: space-between">
                            <span>${ user.phone }</span>
                            <button style="cursor: pointer; margin-left: auto" data-clipboard>Copy</button>
                        </div>
                    </td>
                    <td>${ user.time }</td>
                </tr>
            `
        })
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
