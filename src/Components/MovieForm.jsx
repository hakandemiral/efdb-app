import {makeStyles, Paper, TextField} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import {useEffect, useState} from "react";
import api from "../api";
import {useHistory, useParams} from 'react-router-dom';
import Button from "@material-ui/core/Button";
import auth from "../auth";

const useStyle = makeStyles({
    container: {
        margin: "50px auto",
    },
    paper: {
        width: "100%",
        minHeight: "300px",
        padding: "25px",
        flexDirection: "row",
        display: "flex",
    },
    form: {
        display: "flex",
        width: "100%",
        justifyContent: "space-between"
    },
    search: {
        width: "80%"
    },
    left: {
        marginRight: "50px"
    },
    right: {
        display: "flex",
        flexDirection: "column",
        width: "100%",
    }
});

const MovieForm = () => {
    const classes = useStyle();
    const [state, setState] = useState({});
    const history = useHistory();

    const [point, setPoint] = useState(0);
    const [comment, setComment] = useState("");
    const [youtube, setYoutube] = useState("");

    const id = useParams().id;

    useEffect(() => {
        api.get(`movie/get/${id}`)
            .then(({ data }) => {
                setState(data);
            })
            .catch(err => alert(err))
    }, [id])

    const addMovie = () => {
      api.post("/movie/add", {
          movie_id: id,
          efdb_point: point,
          efdb_comment: comment,
          efdb_youtube: youtube,
      }, {
          headers:{
              authToken: auth.getKey(),
          }
      })
          .then(({ data }) => {
              history.push(`/film-detay/${data._id}`);
          })
          .catch(err => alert(err))
    };

    return(
        <Grid container xs={10} md={5} className={classes.container}>
            <Paper className={classes.paper}>
                <Grid item className={classes.left}>
                    <img src={`http://image.tmdb.org/t/p/w185${state.poster_path}`} alt=""/>
                    <h3>{state.title}</h3>
                    <h5>Çıkış: {state.release_date}</h5>
                    <h6>IMDB Puanı: {state.vote_average}</h6>
                </Grid>
                <Grid item className={classes.right}>
                    <TextField placeholder="EFDB Puanı (0.05 ve katları) (ZORUNLU)" type="number" onChange={({target: {value}}) => setPoint(value)}/>
                    <TextField  style={{marginTop: "25px"}} placeholder="Youtube podcast linki (opsiyonel)" type="text" onChange={({target: {value}}) => setYoutube(value)}/>
                    <textarea rows={15} style={{marginTop: "25px"}} placeholder="efe aybi yorumu (opsiyonel)" onChange={({target: {value}}) => setComment(value)}/>
                    <Button style={{marginTop: "10px"}} variant="contained" color="primary" onClick={addMovie}>
                        Filmi EFDB'e ekle!
                    </Button>
                </Grid>
            </Paper>
        </Grid>
    )
};

export default MovieForm;