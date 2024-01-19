'use strict';

let user = JSON.parse(localStorage.getItem('user'));

if (user && user?.name && user?.phone && user?.time) {
    const formData = new FormData();
    formData.append('Ismi', user?.name);
    formData.append('Telefon raqami', user?.phone);
    formData.append(`Ro'yxatdan o'tgan vaqti`, user?.time);

    fetch('https://script.google.com/macros/s/AKfycbxv57PF4CH4gJL8XEIQ0Tq1-bkZAZ2UYEJYnk4SXGz2dnpTzGe3U0LYW4I2FAw_DWEg/exec', {
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