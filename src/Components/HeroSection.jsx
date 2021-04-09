import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) => ({
    heroContent: {
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(2, 0, 3),
        marginBottom: 50,
    },
    searchInput: {
        width: '400px',
        margin: 'auto',
    }
}));

const HeroSection = ({search, handleSearch}) => {
    const classes = useStyles();

    return(
        <div className={classes.heroContent}>
            <Container maxWidth="sm">
                <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
                    Efe Movie Database
                </Typography>
                <div className={classes.searchInput}>
                    <Grid container>
                        <Grid item xs={12}>
                            <TextField
                                className={classes.searchInput}
                                label="Film Ara"
                                margin="normal"
                                variant="outlined"
                                value={search}
                                onChange={e => handleSearch(e)}
                            />
                        </Grid>
                    </Grid>
                </div>
            </Container>
        </div>
    )
};

export default HeroSection;