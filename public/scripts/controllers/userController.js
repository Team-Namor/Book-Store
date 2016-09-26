import requester from '../utils/jqueryJSONRequester.js' ;

 class UserController {
    constructor(){}
    index() {
      
    }

    get(id) {

    }

    add(userData) {
        requester.post('/register', userData).then(data => console.log(data)).catch(err => console.log(err))
        
        
        //return view

    }

    edit() {

    }

    delete() {

    }
}

export default UserController;
