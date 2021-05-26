import {Paper, TextField} from "@material-ui/core";
import { makeStyles } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import ReCAPTCHA from "react-google-recaptcha";
import {useContext, useReducer} from "react";
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

const Login = () => {

    const context = useContext(EfdbContext);
    const history = useHistory()
    const classes = useStyle();
    const reducer = (state, action) => {
        switch (action.type) {
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
        email: "",
        password: "",
        gCaptcha: "",
    });

    const loginHandle = (e) => {
        e.preventDefault();

        if(state.gCaptcha) {
            const authData = {
                email: state.email,
                password: state.password,
                gCaptcha: state.gCaptcha,
            };

            api.post('/user/login', authData)
                .then(({ data: { token, expire, isAdmin} }) => {
                    auth.create(token, expire, (isAdmin ? 1 : 0));
                    isAdmin && context.setIsAdmin(true);
                    context.setIsLogin(true);
                    history.push('/');
                })
                .catch((err) => {
                    alert(err.response.data.errMsg);
                })
        } else {
            alert("Captcha gerekli!")
        }
    };

    return(
        <Grid container md={4} xs={8} lg={3} className={classes.container}>
            <Grid item xs={12}>
                <Paper component="form" className={classes.loginBox}>
                    <TextField type="email" placeholder="E-Posta" className={classes.inputElement} onChange={(e) => dispatch({type: "email", payload: e.target.value})}/>
                    <TextField type="password" placeholder="Parola" className={classes.inputElement} onChange={(e) => dispatch({type: "password", payload: e.target.value})}/>
                    <ReCAPTCHA
                        sitekey="6LdzaqEaAAAAAI6DdoUXxztWCufwClnxEsMYPIg0"
                        onChange={(key) => dispatch({type: "gCaptcha", payload: key })}
                        className={classes.captcha}
                    />
                    <Button variant="contained" color="primary" onClick={loginHandle} type="submit">Giriş Yap</Button>
                </Paper>
            </Grid>
        </Grid>
    )
};

export default Login;