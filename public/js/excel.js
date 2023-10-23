'use strict';

let user = JSON.parse(localStorage.getItem('user'));

if (user && user?.name && user?.phone && user?.time) {
    const formData = new FormData();
    formData.append('Ismi', user?.name);
    formData.append('Telefon raqami', user?.phone);
    formData.append(`Ro'yxatdan o'tgan vaqti`, user?.time);

    fetch('https://script.google.com/macros/s/AKfycbyirLuhsgD4t4Uc6tk0F995Rdta7XAmP3uM4kwrM3p-jc7Vo4oZOLjHT8p4JE9bMAxQ/exec', {
        method: 'POST',
        body: formData
    })
        .then(res => res.json())
        .then(res => {
            localStorage.clear();
        })
} else {
    localStorage.clear();
}