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
            Efe Film Database 2021 <br/>
            Geliştirilmesine destek olmak için. <br />
            <a
                href="https://github.com/hakandemiral/efdb-app"
                target="_blank"
                rel="noreferrer"
            >Front-end repo</a><br />
            <a
                href="https://github.com/hakandemiral/efdb-api"
                target="_blank"
                rel="noreferrer"
            >Back-end repo</a>
        </footer>
    )
};

export default Footer;