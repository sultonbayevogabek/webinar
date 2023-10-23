'use strict';

let user = JSON.parse(localStorage.getItem('user'));

if (user && user?.name && user?.phone && user?.time) {
    const formData = new FormData();
    formData.append('Ismi', user?.name);
    formData.append('Telefon raqami', user?.phone);
    formData.append(`Ro'yxatdan o'tgan vaqti`, user?.time);

    fetch('https://script.google.com/macros/s/AKfycbz8tbyAdWWn7YHICJhrn_WQmUPXtUXQW8dPqOq3GtU/dev', {
        method: 'POST',
        body: formData
    })
        .then(res => res.json())
        .then(res => {
            if (res.ok) {
                localStorage.clear();
            }
        })
} else {
    localStorage.clear();
}