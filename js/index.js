var BACKEND_ROOT_URL = 'http://localhost:3001';
var list = document.querySelector('#todolist');
var input = document.querySelector('#newtodo');
input.disabled = true;
fetch(BACKEND_ROOT_URL)
    .then(function (response) { return response.json(); })
    .then(function (response) {
    response.forEach(function (node) {
        renderTask(node.description);
    });
    input.disabled = false;
}, function (error) {
    alert(error);
});
input.addEventListener('keypress', function (event) {
    if (event.key === "Enter") {
        event.preventDefault();
        var text = input.value.trim();
        if (text !== '') {
            var list_item = document.createElement('li');
            list_item.setAttribute('class', 'list-group-item');
            list_item.innerHTML = text;
            list.append(list_item);
            input.value = '';
        }
    }
});
input.addEventListener('keypress', function (event) {
    if (event.key === "Enter") {
        event.preventDefault();
        var text = input.value.trim();
        if (text !== '') {
            renderTask(text);
            input.value = '';
        }
    }
});
var renderTask = function (text) {
    var list_item = document.createElement('li');
    list_item.setAttribute('class', 'list-group-item');
    list_item.innerHTML = text;
    list.append(list_item);
};
