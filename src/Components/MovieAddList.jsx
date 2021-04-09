import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import {Link} from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
        marginTop: "10px"
    },
}));

const MovieAddList = ({movies}) => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <List component="nav">
                {
                    movies.map(movie => {
                        console.log(movie);
                        const year = new Date(movie.release_date).getFullYear();

                        return(
                            <Link to={`/film-duzenle/${movie.id}`}>
                                <ListItem button>
                                    <ListItemText primary={movie.title} secondary={year}/>
                                </ListItem>
                            </Link>
                        )
                    })
                }
            </List>
        </div>
    )
};

export default MovieAddList;