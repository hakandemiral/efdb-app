import { Grid } from "@material-ui/core";
import MovieCard from "./MovieCard";
import { makeStyles } from '@material-ui/core/styles';
import {useEffect, useState} from "react";
import api from "../api";

const useStyles = makeStyles({
    list: {
        margin: "auto",
    }
});


const MovieList = ({ search }) => {
    const classes = useStyles();
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        api.get('/movie/getAllMovies')
            .then(({ data }) => {
                setMovies(data);
            })
    }, [])

    return(
        <Grid container xs={12} md={10} spacing={3} justify={"center"} className={classes.list}>
            {movies.filter(item => (item.title.toLowerCase().includes(search.toLowerCase()))).map(movie => (
                    <Grid item>
                        <MovieCard key={movie._id} movie={movie}/>
                    </Grid>
                ))}
        </Grid>
    )
}

export default MovieList;