import { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Checkbox from '@material-ui/core/Checkbox';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import api from '../api';
import { Link } from '@material-ui/core';
import { useHistory } from 'react-router';
import TheatersIcon from '@material-ui/icons/Theaters';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 560,
    backgroundColor: theme.palette.background.paper,
    margin: '50px auto',
  },
}));

const WatchList = () => {
  const classes = useStyles();
  const [watchList, setWatchList] = useState([]);
  const history = useHistory();

  useEffect(() => {
    api.get('/user/getUserWatchList')
    .then(({ data }) => {
        setWatchList(data);
    })
  }, [])

  const handleStatusToggle = (status, movieId) => {
    api.post('/user/toggleIsWatchedFromWatchList', {
      status,
      movieId
    })
    .then(() => {
      const newList = watchList.map(w => {
        if(w.movieId === movieId){
          w.isWatched = status;
        }
        return w;
      })
      setWatchList(newList);   
    })
    .catch(() => alert('Hata!'))
  }

  const handleLink = (target) => {
    history.push('/film-detay/' + target)
  }

  const removeMovieFromWatchList = (movieId) => {
    api.post('/user/removeMovieFromWatchList', {
        movieId,
    })
    .then(() => {
      const newList = watchList.filter(w => w.movieId !== movieId);
      setWatchList(newList);
    })
  }

  return (
    <List dense className={classes.root}>
      {
        watchList.map(m => {

          return(
            <ListItem button onClick={() => handleLink(m.movieId)}>
            <ListItemAvatar>
              <Avatar><TheatersIcon/></Avatar>
            </ListItemAvatar>
            <ListItemText id={m._id} primary={m.movieTitle} />
            <ListItemSecondaryAction>
              İzlendi
              <Checkbox
                onChange={() => {handleStatusToggle(!(m.isWatched), m.movieId)}}
                checked={m.isWatched}
              />
              <Button onClick={() => removeMovieFromWatchList(m.movieId)} style={{marginLeft: 15}} variant="contained" color="secondary">Sil</Button>
            </ListItemSecondaryAction>
          </ListItem>
          )
        })
      }
    </List>
  );
}

export default WatchList;