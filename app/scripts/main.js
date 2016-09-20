'use strinct';
import 'jquery';

function getItem() {
    return new Promise(function (resolve, reject) {
        $.ajax({
            url: 'items',
            method: 'GET',
            contentType: 'application/json',
        }).done((data) => resolve(data))
            .fail((err) => reject(err));
    });
}


function addItem() {
    return new Promise(function (resolve, reject) {
        let item = $('#input').val();
        let body = { item };
        $.ajax({
            method: 'POST',
            url: '/items',
            data: JSON.stringify(body),
            contentType: 'application/json',
        }).done((data) => resolve(data))
            .fail((err) => reject(err));
    });
}

$('#add-btn').on('click', function () {
    addItem();
});

$('#list-btn').on('click', function () {
    getItem().then((items) => {
        $('#list').html('');
        items.forEach(x => $('<li />').html(x.item).appendTo($('#list')));
    });
});