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
    create(token, expiration){
        const today = new Date()
        const tomorrow = new Date(today)
        tomorrow.setDate(tomorrow.getDate() + expiration)

        localStorage.setItem('token-expiration', tomorrow.toISOString());
        localStorage.setItem('auth-token', token);

        console.log("auth create")
    },
    clean(){
        localStorage.clear('token-expiration');
        localStorage.clear('auth-token');
    },
    getKey(){
        return localStorage.getItem('auth-token');
    },
};

export default auth;