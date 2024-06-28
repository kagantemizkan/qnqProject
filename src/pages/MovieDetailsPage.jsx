import React, { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import Header from '../components/Header';
import movieTrailer from 'movie-trailer';
import YoutubeEmbed from '../components/YoutubeEmbed';
import { useMovieContext } from '../../MovieContext';
import { Container, Grid, Typography, Card, CardContent, CardMedia, TextField, Button } from '@mui/material';
import { styled } from '@mui/system';
import { db } from '../../firebaseConfig';
import { collection, addDoc, query, where, getDocs } from 'firebase/firestore';

const MotionDiv = styled(motion.div)({
  height: '500px',
  width: '100%',
  borderRadius: '8px',
  overflow: 'hidden',
});

const MovieDetailsPage = () => {
  const { id } = useParams();
  const { state } = useLocation();
  const { title, imageUrl, releaseDate, rating, description, genreIds, originalLanguage, top, left } = state;
  const [videoLink, setVideoLink] = useState('');
  const { fetchGenres } = useMovieContext();
  const [genres, setGenres] = useState([]);
  const [userName, setUserName] = useState('');
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const fetchMovieGenres = async () => {
      try {
        const genresData = await fetchGenres();
        setGenres(genresData);
      } catch (error) {
        console.error('Error fetching genres:', error);
      }
    };

    fetchMovieGenres();
  }, [fetchGenres]);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const q = query(collection(db, 'comments'), where('movieId', '==', id));
        const querySnapshot = await getDocs(q);
        const commentsData = querySnapshot.docs.map(doc => doc.data());
        setComments(commentsData);
      } catch (error) {
        console.error('Error fetching comments:', error);
      }
    };

    fetchComments();
  }, [id]);

  const getGenreNames = () => {
    return genreIds.map(id => {
      const genre = genres.find(genre => genre.id === id);
      return genre ? genre.name : '';
    }).join(', ');
  };

  useEffect(() => {
    movieTrailer(null, { tmdbId: id, id: true })
      .then(response => {
        setVideoLink(response);
      })
      .catch(error => {
        console.error('Error fetching trailer:', error);
        setVideoLink(''); // Handle error, set videoLink to empty string or default trailer
      });
  }, [id]);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (userName && comment) {
      try {
        await addDoc(collection(db, 'comments'), {
          movieId: id,
          userName,
          comment,
          timestamp: new Date()
        });
        setComments([...comments, { userName, comment, timestamp: new Date() }]);
        setUserName('');
        setComment('');
      } catch (error) {
        console.error('Error adding comment:', error);
      }
    }
  };

  return (
    <>
      <Header />
      <Container>
        <Grid marginTop={3} marginBottom={2} container direction="column">
          <Grid item xs={12}>
            <Typography color={"white"} fontWeight={700} variant='h4' component='h2' gutterBottom>
              {title}
            </Typography>
          </Grid>
          <Grid container spacing={2} alignItems="flex-start">
            <Grid item xs={12} md={4}>
              <MotionDiv
                initial={{ top, left, position: 'absolute' }}
                animate={{ top: 0, left: 0, position: 'relative', scale: 1, opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <CardMedia
                  component='img'
                  image={`https://image.tmdb.org/t/p/w500${imageUrl}`}
                  alt={title}
                  sx={{ height: '100%', width: '100%' }}
                />
              </MotionDiv>
            </Grid>

            <Grid item xs={12} md={7}>
              {videoLink ? (
                <YoutubeEmbed embedId={videoLink} />
              ) : (
                <Typography variant='body1' gutterBottom>
                  Film fragmanı bulunamadı.
                </Typography>
              )}
            </Grid>

            <Grid item xs={12}>
              <Card>
                <CardContent>
                  <Typography variant='body1' gutterBottom>
                    <strong>Release Date:</strong> {releaseDate}
                  </Typography>
                  <Typography variant='body1' gutterBottom>
                    <strong>Rating:</strong> {rating}
                  </Typography>
                  <Typography variant='body1' gutterBottom>
                    <strong>Description:</strong> {description}
                  </Typography>
                  <Typography variant='body1' gutterBottom>
                    <strong>Genres:</strong> {getGenreNames()}
                  </Typography>
                  <Typography variant='body1' gutterBottom>
                    <strong>Original Language:</strong> {originalLanguage}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12}>
              <form onSubmit={handleCommentSubmit}>
                <TextField
                  label="User Name"
                  variant="outlined"
                  fullWidth
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  sx={{ mb: 2 }}
                />
                <TextField
                  label="Comment"
                  variant="outlined"
                  fullWidth
                  multiline
                  rows={4}
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  sx={{ mb: 2 }}
                />
                <Button variant="contained" color="primary" type="submit">
                  Submit Comment
                </Button>
              </form>
              <div>
                <Card className='p-5 mb-3 mt-3'>
                <h1>Yorumlar: </h1>
                {comments.map((comment, index) => (
                  <div key={index}>
                    <Typography variant='body2'>
                      <strong>{comment.userName}:</strong> {comment.comment}
                    </Typography>
                  </div>
                ))}
                </Card>
              </div>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

export default MovieDetailsPage;