import React from 'react';
import { Card, CardActionArea, CardContent, Skeleton } from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 375,
    margin: theme.spacing(2),
  },
  media: {
    paddingBottom: 500,
  },
  content: {
    height: 85, // Sabit yükseklik
    overflow: 'hidden', // Taşma durumunda gizle
  },
}));

const MovieCardSkeleton = () => {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <Skeleton variant="rectangular" className={classes.media} />
        <CardContent className={classes.content}>
          <Skeleton variant="text" width="60%" />
          <Skeleton variant="text" width="40%" />
          <Skeleton variant="text" width="40%" />
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default MovieCardSkeleton;
