import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from "@material-ui/core/Button";
import { EfdbContext } from "../App";
import HomeIcon from '@material-ui/icons/Home';

import { useContext } from "react";
import {Link} from "react-router-dom";
import auth from "../auth";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    title: {
        flexGrow: 1,
    },
    link: {
      color: "#fff",
        textDecoration: "none",
        alignItems: "center",
        display: "flex",
    },
    button: {
      marginRight: "20px",
        textDecoration: "none",
    },
}));

const Header = () => {
    const classes = useStyles();
    const context = useContext(EfdbContext);

    const handleLogout = () => {
        auth.clean();
        context.setIsLogin(false);
    };

    return(
        <>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" className={classes.title}>
                        <Typography variant="h6" className={classes.title}>
                            <Link to="/" className={classes.link}>
                                <HomeIcon/> EFDB Alpha 0.1
                            </Link>
                        </Typography>
                    </Typography>
                    {
                        context.isLogin
                            ?
                            <>
                                <Button className={classes.button} onClick={handleLogout} variant="contained" color="secondary">
                                    Çıkış
                                </Button>
                                {context.isAdmin 
                                && 
                                <Button className={classes.button} variant="contained" color="secondary">
                                    <Link to="/film-ekle">Film Ekle</Link>
                                </Button>}
                            </>
                            :
                            <>
                                <Link to="/giris">
                                    <Button variant="contained" color="secondary" className={classes.button}>
                                        Giriş Yap
                                    </Button>
                                </Link>
                                <Link to="/kayit">
                                    <Button variant="contained" color="secondary" className={classes.button}>
                                        Kayıt Ol
                                    </Button>
                                </Link>
                            </>
                    }
                </Toolbar>
            </AppBar>
        </>
    )
}

export default Header;