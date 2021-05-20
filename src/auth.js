const auth = {
    control(){
        const tokenExpiration = localStorage.getItem('token-expiration');
        const now = Date();

        if(tokenExpiration <= now) {
            return true;
        }else {
            this.clean();
            return false;
        }
    },
    create(token, expiration, isAdmin){
        const today = new Date()
        const tomorrow = new Date(today)
        tomorrow.setDate(tomorrow.getDate() + expiration)

        localStorage.setItem('token-expiration', tomorrow.toISOString());
        localStorage.setItem('auth-token', token);
        localStorage.setItem('is-admin', isAdmin);

        console.log("auth create")
    },
    clean(){
        localStorage.clear('token-expiration');
        localStorage.clear('auth-token');
        localStorage.clear('isAdmin')
    },
    getKey(){
        return localStorage.getItem('auth-token');
    },
    isAdmin(){
        const isAdmin = Boolean(localStorage.getItem('is-admin'));
        console.log("admin check", isAdmin, localStorage.getItem('is-admin'))

        return isAdmin;
    },
};

export default auth;