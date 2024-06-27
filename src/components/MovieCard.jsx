import * as React from 'react';
import { Card, CardActionArea, CardContent, CardMedia, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useNavigate } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
    margin: theme.spacing(2),
  },
  media: {
    height: 500,
  },
  content: {
    height: 125, // Sabit yükseklik
    overflow: 'hidden', // Taşma durumunda gizle
  },
}));

const MovieCard = ({ title, imageUrl, releaseDate, rating, movieId, description, genreIds, originalLanguage }) => {
  const classes = useStyles();
  let navigate = useNavigate();

  const handleCardClick = (event) => {
    const rect = event.currentTarget.getBoundingClientRect(); 
    const top = rect.top;
    const left = rect.left;

    navigate(`/movie/${movieId}`, {
      state: { title, imageUrl, releaseDate, rating, description, genreIds, originalLanguage, top, left }
    });
  };

  return (
    <Card className={classes.root} onClick={handleCardClick}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={imageUrl}
          title={title}
        />
        <CardContent className={classes.content}>
          <Typography gutterBottom variant="h5" component="div">
            {title}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            Release Date: {releaseDate}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            Rating: {rating}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default MovieCard;
