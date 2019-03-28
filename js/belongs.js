var count = 0;

$(function () {
    $('p.check').on('click', function () {
        if ((count++ % 2) === 0) return;

        $checkbox = $(this).prev();
        id = $(this).children('input').attr('id');
        const isChecked = $('#' + id).prop('outerHTML').indexOf('checked') != -1;
        localStorage.setItem(id, !isChecked);
        // HTMLにcheckedが入っていることでチェック入った状態でページが捲れる
        if (isChecked) {
            $('#' + id).replaceWith('<input type="checkbox" id="' + id + '" />');
            $checkbox.prop('checked', false);
        } else {
            $('#' + id).replaceWith('<input type="checkbox" id="' + id + '" checked />');
            $checkbox.prop('checked', true);
        }

    });
});

function belongsInit() {
    $('input[type=checkbox]').map(function () {
        let id = $(this).attr('id');
        let checked = localStorage.getItem(id);
        if (checked === 'true') {
            $('#' + id).replaceWith('<input type="checkbox" id="' + id + '" checked />');
            $(this).prop('checked', true);
        }
    });
}