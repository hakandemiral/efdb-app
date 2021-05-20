import {useEffect, useState} from "react";
import api from "../api";
import {useParams} from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import {Rating} from "@material-ui/lab";
import currencyFormatter from 'currency-formatter'
import ShareButton from "./ShareButton";

const useStyles = makeStyles({
    container: {
        margin: "50px auto"
    },
    detail: {
        marginLeft: "35px"
    },
    ratingGrid: {
        marginTop: "15px",
        display: "flex",
        justifyContent: "space-between",
    },
});

const MovieDetail = () => {
    const classes = useStyles();
    const { id } = useParams();
    const [isLoading, setIsLoading] = useState(true);
    const [movie, setMovie] = useState({});

    useEffect(() => {
        api.get(`/movie/get/local/${id}`)
            .then(({data}) => {
                setMovie(data[0]);
                console.log(data);
            })
            .catch(err => alert(err))
            .finally(() => setIsLoading(false));
    }, [id])

    const year = new Date(movie.release_date).getFullYear();

  return(
      <Grid className={classes.container} container md={8}>

          {isLoading && <div>Loading...</div>}

          <Grid item md={3}>
              <img src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`} alt=""/>
          </Grid>

          <Grid item md={7}>
              <Typography variant="h3">{movie.title}</Typography>
              <Typography variant="h4">{movie.original_title}</Typography>
              <Typography variant="h5">{year}</Typography>

              <Grid item md={6} className={classes.ratingGrid}>
                  <Grid item>
                      <Typography variant="h4">EFDB</Typography>
                      <Typography variant="h4">{movie.efdb_point}/10</Typography>
                      <Rating value={(movie.efdb_point / 2)} precision={0.05} readOnly/>
                  </Grid>
                  <Grid item>
                      <Typography variant="h4">IMDB</Typography>
                      <Typography variant="h4">{movie.vote_average}/10</Typography>
                      <Rating value={(movie.vote_average / 2)} precision={0.1} readOnly/>
                  </Grid>
              </Grid>

              <Grid item md={10}>
                  <Typography>{movie.overview}</Typography>
              </Grid>

          </Grid>

          <Grid item md={2}>
              <Typography variant="h5">Bütçe</Typography>
              <Typography variant="h6">{movie.budget ? currencyFormatter.format(movie.budget, { code: 'USD', precision: 0}) : "Veri yok"}</Typography>

              <Typography variant="h5">Hasılat</Typography>
              <Typography variant="h6">{movie.revenue ? currencyFormatter.format(movie.revenue, { code: 'USD', precision: 0}) : "Veri yok"}</Typography>

              <Typography variant="h5">Uzunluk</Typography>
              <Typography variant="h6">{movie.runtime ? `${Math.floor(movie.runtime / 60)} Saat ${(movie.runtime % 60)} Dakika` : "Veri yok"}</Typography>

              <Typography variant="h5">Dil</Typography>
              <Typography variant="h6">{movie.language ? <img width="25" src={`https://unpkg.com/language-icons/icons/${movie.language}.svg`} alt="Flag"/> : "Veri yok"}</Typography>

              <Typography variant="h5">Ülke</Typography>
              <Typography variant="p">{movie.production_countries ? movie.production_countries.map(c => `${c.name}`) : "Veri yok"}</Typography>

              <Typography variant="h5">Yapımcılar</Typography>
              <Typography variant="p">{movie.production_companies ? movie.production_companies.map(c => <div>{c.name}<br/></div>) : "Veri yok"}</Typography>

              <ShareButton movie={movie}/>

          </Grid>
      </Grid>
  )
};

export default MovieDetail;