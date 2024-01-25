(function () {
    $.widget('ui.autocomplete', $.ui.autocomplete, {
        options: {
            messages: {
                noResults: 'Ничего не найдено.',
                results: function (amount) {
                    var s = app.declOfNum(amount, ['Найдена $count$ запись', 'Найдено $count$ записи', 'Найдено $count$ записей']);
                    s = s.replace('$count$', amount);
                    return s + '. Используйте клавиши вверх и вниз для выбора.';
                }
            }
        }
    });
})();