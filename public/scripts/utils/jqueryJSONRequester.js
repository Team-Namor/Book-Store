import 'jquery'

let requester = {
    get(url){
        return new Promise((resolve, reject) => {
            $.ajax({
                url,
                contentType: 'application/json',
                method: 'GET'
            })
            .done(resolve)
            .fail(reject)
        });
    },

    post(url, data){
                return new Promise((resolve, reject) => {
            $.ajax({
                url,
                contentType: 'application/json',
                method: 'POST',
                data: JSON.stringify(data)
            })
            .done(resolve)
            .fail(err => {
                reject(err)})
        });
    }
}

export default requester;