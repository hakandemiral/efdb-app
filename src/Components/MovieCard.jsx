import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import {Rating} from "@material-ui/lab";
import ShareButton from './ShareButton';
import { Link } from 'react-router-dom';
import AddMovieToWatchListButton from './AddMovieToListButton';

const useStyles = makeStyles({
    root: {
        width: 245,
    },
    buttonIcon: {
        marginRight: "5px",
    },
    cardActions: {
        justifyContent: "space-between",
    },
    tdNone: {
        textDecoration: "none",
        color: "inherit",
    }
});

const MovieCard = ({ movie, isListed }) => {
    const classes = useStyles();

    return (
    <Card className={classes.root}>
       <Link className={classes.tdNone} to={`/film-detay/${movie._id}`}>
               <CardActionArea>
                   <CardMedia
                       component="img"
                       alt="Contemplative Reptile"
                       height="320"
                       image={`https://image.tmdb.org/t/p/w185${movie.poster_path}`}
                       title={movie.title}
                   />
                   <CardContent >
                       <Typography variant="h6" component="h2">{movie.title}</Typography>
                       <Rating className={classes.rating} value={(movie.efdb_point / 2)} precision={0.05} readOnly/>
                       <Typography variant="h6" component="h3">{movie.efdb_point} / 10</Typography>
                   </CardContent>
               </CardActionArea>
               </Link>
               <CardActions className={classes.cardActions}>
                   <ShareButton movie={movie}/>
                   <AddMovieToWatchListButton movie={movie} status={isListed}/>
               </CardActions>
           </Card>
    );
};

export default MovieCard;