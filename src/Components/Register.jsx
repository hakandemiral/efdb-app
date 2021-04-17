import {Paper, TextField} from "@material-ui/core";
import { makeStyles } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import ReCAPTCHA from "react-google-recaptcha";
import {useContext, useEffect, useReducer} from "react";
import Button from "@material-ui/core/Button";
import api from "../api";
import auth from "../auth";
import { useHistory } from 'react-router-dom';
import { EfdbContext } from "../App";

const useStyle = makeStyles({
    container: {
        margin: "auto",
        marginTop: "35px",
    },
    loginBox: {
        minHeight: "350px",
        padding: "20px 20px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between"
    },
    captcha: {
      alignSelf: "center"
    },
});

const Register = () => {

    const context = useContext(EfdbContext);
    const history = useHistory()
    const classes = useStyle();
    const reducer = (state, action) => {
        switch (action.type) {
            case 'userName':
                return {...state, userName: action.payload}
            case 'email':
                return {...state, email: action.payload};
            case 'password':
                return {...state, password: action.payload};
            case 'gCaptcha':
                return {...state, gCaptcha: action.payload};
            default:
                return state;
        }
    };

    const [state, dispatch] = useReducer(reducer, {
        userName: "",
        email: "",
        password: "",
        gCaptcha: "",
    });

    useEffect(() => {
        if(context.isLogin){
            history.push('/');
        }
    })

    const registerHandle = (e) => {
        e.preventDefault();

        if(state.gCaptcha) {
            const authData = {
                userName: state.userName,
                email: state.email,
                password: state.password,
                gCaptcha: state.gCaptcha,
            };
            console.log(authData);

            api.post('/user/register', authData)
                .then(({ data: { token, expire} }) => {
                    auth.create(token, expire);
                    context.setIsLogin(true);
                    history.push('/');
                })
                .catch((err) => {
                    alert(JSON.stringify(err.response.data));
                })
        } else {
            alert("Captcha gerekli!")
        }
    };

    return(
        <Grid container md={4} xs={8} lg={3} className={classes.container}>
            <Grid item xs={12}>
                <Paper component="form" className={classes.loginBox}>
                    <TextField type="text" placeholder="Kullanıcı Adı" className={classes.inputElement} onChange={(e) => dispatch({type: "userName", payload: e.target.value})}/>
                    <TextField type="email" placeholder="E-Posta" className={classes.inputElement} onChange={(e) => dispatch({type: "email", payload: e.target.value})}/>
                    <TextField type="password" placeholder="Parola" className={classes.inputElement} onChange={(e) => dispatch({type: "password", payload: e.target.value})}/>
                    <ReCAPTCHA
                        sitekey="6LdzaqEaAAAAAI6DdoUXxztWCufwClnxEsMYPIg0"
                        onChange={(key) => dispatch({type: "gCaptcha", payload: key })}
                        className={classes.captcha}
                    />
                    <Button variant="contained" color="primary" onClick={registerHandle} type="submit">Kayıt Ol!</Button>
                </Paper>
            </Grid>
        </Grid>
    )
};

export default Register;