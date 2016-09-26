class UserController {
    index() {
      
    }

    get(id) {

    }

    add(userData) {
        return new Promise((resolve, reject) => {
            $.ajax({
                url: '/register',
                contentType: 'application/json',
                method: 'POST',
                data: JSON.stringify(userData)
            })
            .done(resolve)
            .fail(reject)
        });
        
        //return view

    }

    edit() {

    }

    delete() {

    }
}

module.exports = UserController;