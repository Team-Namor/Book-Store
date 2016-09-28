export default function loadEvents(con) {
    function activateSearchButtonEvent(con) {
        $('#search-btn').on('click', function () {
            let searchedQuery = $('#search-value').val();
            if (searchedQuery !== '') {
                con.redirect(`#search/${searchedQuery}`);
            }
        });
    }

    function activateSingleBookEvent(con) {
        $('.book-cover').on('click', function (ev) {
            let element = $(ev.target);
            let parent = element.parent();
            let bookId = $(parent).attr('id');
            con.redirect(`#books/${bookId}`);
        });
    }

    activateSearchButtonEvent(con);
    activateSingleBookEvent(con);
}