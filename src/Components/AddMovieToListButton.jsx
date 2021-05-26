import Button from '@material-ui/core/Button';
import QueueIcon from '@material-ui/icons/Queue';
import LibraryAddCheckIcon from '@material-ui/icons/LibraryAddCheck';
import { useState, useEffect } from 'react';
import api from '../api';
import auth from "../auth";

const AddMovieToListWatchButton = ({ movie, status }) => {
    const [isListed, setIsListed] = useState(status || false);

    const addToList = () => {
        api.post('/user/addMovieToWatchList', {
            movieId: movie._id,
            movieTitle: movie.title
        }, {
            headers: {
                authToken: auth.getKey()
            }
        })
        .then(() => {
            setIsListed(true);
        })
        .catch(err => {
            console.log(err)
        })
    }

    const removeMovieFromWatchList = () => {
        api.post('/user/removeMovieFromWatchList', {
            movieId: movie._id,
        }, {
            headers: {
                authToken: auth.getKey()
            }
        })
        .then(() => {
            setIsListed(false);
        })
        .catch(err => {
            alert(err);
        })
    }

    return(
        isListed
        ?
            <Button size="small" color="primary" onClick={removeMovieFromWatchList}>
                <LibraryAddCheckIcon/>
                Listende
            </Button>
        :
            <Button size="small" color="primary" onClick={addToList}>
                <QueueIcon/>
                Listeme Ekle
            </Button>

    );
};

export default AddMovieToListWatchButton;