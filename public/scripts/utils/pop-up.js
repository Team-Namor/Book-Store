import 'jquery';

let popUpDiv = $('<div/>');

popUpDiv.css({
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    display: 'none',
    'text-align': 'center',
    padding: '10px'
})



let popUp = {
    info(text) {
        $('body').append(popUpDiv);
        popUpDiv.text(text);
        popUpDiv.css('background-color', 'green')
        popUpDiv.show(500)

        setTimeout(() => {popUpDiv.hide(1000)},2000);
    },
    alert(text){
        $('body').append(popUpDiv);
        popUpDiv.text(text);
        popUpDiv.css('background-color', 'red')
        popUpDiv.show(500)

        setTimeout(() => {popUpDiv.hide(1000)},2000);
    }
}

export default popUp;