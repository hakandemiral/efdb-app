import { useState } from "react";
import api from "../api";
import {makeStyles, Paper, TextField} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import auth from "../auth";
import MovieAddList from "./MovieAddList";
import {HourglassFull} from "@material-ui/icons";

const useStyle = makeStyles({
    container: {
        margin: "50px auto",
    },
    paper: {
        width: "100%",
        minHeight: "300px",
        padding: "25px"
    },
    form: {
        display: "flex",
        width: "100%",
        justifyContent: "space-between"
    },
    search: {
        width: "80%"
    }
});

const MovieAdd = () => {
    const classes = useStyle();
    const [search, setSearch] = useState("");
    const [results, setResults] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const movieSearch = (e) => {
        e.preventDefault();
        setIsLoading(true);

      api.post('/movie/search', { search },{
              headers: {
                  authToken: auth.getKey(),
              }
          }

      )
          .then(({ data }) => {
              setResults(data);
          })
          .catch((err) => {
              alert(err);
          })
          .finally(() => {
              setIsLoading(false);
          })
    };

    return(
        <Grid container xs={5} className={classes.container}>
            <Paper className={classes.paper}>
                <form className={classes.form}>
                    <TextField placeholder="Film Ara..." onChange={({target: {value}}) => setSearch(value)} className={classes.search}/>
                    <Button type="submit" variant="contained" color="primary" onClick={movieSearch}>Ara</Button>
                </form>
                {isLoading && <HourglassFull/>}
                <MovieAddList movies={results}/>
            </Paper>
        </Grid>
    )
}

export default MovieAdd;