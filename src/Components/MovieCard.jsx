import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import {Rating} from "@material-ui/lab";
import ShareIcon from '@material-ui/icons/Share';
import QueueIcon from '@material-ui/icons/Queue';
import { Link } from 'react-router-dom';

const useStyles = makeStyles({
    root: {
        maxWidth: 245,
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

const MovieCard = ({ movie }) => {
    const classes = useStyles();

    return (
       <Link className={classes.tdNone} to={`/film-detay/${movie._id}`}>
           <Card className={classes.root}>
               <CardActionArea>
                   <CardMedia
                       component="img"
                       alt="Contemplative Reptile"
                       height="320"
                       image={`http://image.tmdb.org/t/p/w185${movie.poster_path}`}
                       title={movie.title}
                   />
                   <CardContent >
                       <Typography variant="h6" component="h2">{movie.title}</Typography>
                       <Rating className={classes.rating} value={(movie.efdb_point / 2)} precision={0.05} readOnly/>
                       <Typography variant="h6" component="h3">{movie.efdb_point} / 10</Typography>
                   </CardContent>
               </CardActionArea>
               <CardActions className={classes.cardActions}>
                   <Button size="small" color="primary">
                       <ShareIcon className={classes.buttonIcon}/>
                       Paylaş
                   </Button>
                   <Button size="small" color="primary">
                       <QueueIcon className={classes.buttonIcon}/>
                       Listeme Ekle
                   </Button>
               </CardActions>
           </Card>
       </Link>
    );
};

export default MovieCard;