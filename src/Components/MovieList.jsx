import { Grid } from "@material-ui/core";
import MovieCard from "./MovieCard";
import { makeStyles } from '@material-ui/core/styles';
import {useEffect, useState, useContext} from "react";
import api from "../api";
import { EfdbContext } from "../App";

const useStyles = makeStyles({
    list: {
        margin: "auto",
    }
});


const MovieList = ({ search }) => {
    const classes = useStyles();
    const [movies, setMovies] = useState([]);
    const [watchList, setWatchList] = useState([]);
    const context = useContext(EfdbContext);

    useEffect(() => {
        async function fetchDatas(){
            if(context.isLogin){
                await api.get('/user/getUserWatchList')
                .then(({ data }) => {
                    const id = data.map(m => m.movieId);
                    setWatchList(id);
                })
            }
            
            api.get('/movie/getAllMovies')
            .then(({ data }) => {
                setMovies(data);
            })
        };
        fetchDatas();
    }, [])

    return(
        <Grid container xs={12} md={10} spacing={3} justify={"center"} className={classes.list}>
            {movies.filter(item => (item.title.toLowerCase().includes(search.toLowerCase()))).map(movie => {
                const isListed = watchList.includes(movie._id.toString());
                return(
                    <Grid item>
                        <MovieCard key={movie._id} movie={movie} isListed={isListed}/>
                    </Grid>
                )
            })}
        </Grid>
    )
}

export default MovieList;