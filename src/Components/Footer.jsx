import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
    footer: {
        width: "100%",
        padding: "10px 0",
        backgroundColor: "#ddd",
        textAlign: "center",
        marginTop: "30px"
    }
});

const Footer = () => {
    const classes = useStyles();
    return(
        <footer className={classes.footer}>
            Efe Aydal Movie Database 2021 <br/>
            <a
                href="https://github.com/hakandemiral"
                target="_blank"
                rel="noreferrer"
            >Developed by Hakan</a>
        </footer>
    )
};

export default Footer;