import { useEffect, useState } from 'react'
import { Typography, Grid, Button, Paper, Box, Accordion, Avatar } from '@material-ui/core'
import MuiAccordionSummary from '@material-ui/core/AccordionSummary';
import MuiAccordionDetails from '@material-ui/core/AccordionDetails';
import { makeStyles, withStyles} from '@material-ui/core/styles'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import { IMovie, IReview } from '../interfaces/IMovie'

const useStyles = makeStyles((theme) => {
  return {
    image: {
      overflow: 'hidden',
      '& img': {
        display: 'block',
        width: '100%',
        height: '100%'
      }
    },
    contentWrap: {
      display: 'flex',
      flexDirection: 'column'
    },
    accordionWrap: {
      marginTop: theme.spacing(6)
    },
    textIconAlign: {
      display: 'flex',
      marginTop: theme.spacing(2),
      marginBottom: theme.spacing(2)
    },
    logos: {
      display: 'flex',
      flexWrap: 'wrap'
    },
    accDetailWrap: {
      display: 'block',
    },
    logoWrap: {
      maxWidth: '170px',
      widthL: '100%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '2rem',
      margin: '.5rem',

      "& img": {
        display: 'block',
        width: '100%'
      }
    }
  }
})

const AccordionSummary = withStyles({
  root: {
    backgroundColor: 'rgba(0, 0, 0, .03)',
    borderBottom: '1px solid rgba(0, 0, 0, .125)',
    marginBottom: -1,
    minHeight: 56,
    '&$expanded': {
      minHeight: 56,
    },
  },
  content: {
    '&$expanded': {
      margin: '12px 0',
    },
  },
  expanded: {},
})(MuiAccordionSummary);

const AccordionDetails = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiAccordionDetails);

type DetailsParams = {
  id: string | undefined
}

const Details = () => {


  const [details, setDetails] = useState<IMovie | null>(null)
  const [reviews, setReviews] = useState([]) // from movieDB
  // const [nytReviews, setNytReviews] = useState([]) // from New York Times
  const [expanded, setExpanded] = useState<string | boolean>('panel1'); // accordions

  const handleChange = (panel: string) => (event: React.SyntheticEvent<JSX.Element>, newExpanded: string | boolean): void => {
    setExpanded(newExpanded ? panel : false);
  };


  const { id } = useParams<DetailsParams>()

  const classes = useStyles()

  // Question: How to stop useEffect from rendering endlessly even with dependency array?
  useEffect(() => {
    const getMovie = async () => {
      const { data } = await axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`)
      setDetails(data)
    }

    const getReviews = async () => {
      const { data } = await axios.get(`https://api.themoviedb.org/3/movie/${id}/reviews?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=1`)
      setReviews(data.results)
    }

    // const getNYTReviews = async () => {
    //   const { data } = await axios.get(`https://api.nytimes.com/svc/movies/v2/reviews/search.json?query=${encodeURIComponent(details.title)}&api-key=${process.env.REACT_APP_NYT_API_KEY}`)
    //   setNytReviews(data.results)
    // }

    getMovie()
    getReviews()
    // getNYTReviews()

  }, [id])

  console.log("reviews", reviews)
  return (
    <>
      <Grid container spacing={3}>
        <Grid item>
          <Box>
            <Paper className={ classes.image}><img src={`http://image.tmdb.org/t/p/w400/${details?.poster_path}`} alt="" /></Paper>
          </Box>
          </Grid>
        <Grid container item xs={6} className={ classes.contentWrap}>
          <Typography variant="h4">
            <a href={details?.homepage} target="_blank" rel="noreferrer">{details?.title}</a>
          </Typography>
          <Typography variant="h6">{details?.tagline} | {details?.status} {details?.release_date}</Typography>
          <Typography variant="body2">{details?.overview}</Typography>
          <Box className={ classes.accordionWrap}>
            <Accordion square expanded={expanded === 'panel1'} onChange={() => handleChange('panel1')}>
              <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
                <Typography>Production</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Box className={classes.logos}>
                  {details?.production_companies?.length &&
                    details?.production_companies?.map((company: { name: string, id: number, logo_path: string | null }, idx: number) => (
                      <Paper className={classes.logoWrap } key={ idx }>
                        <img src={`http://image.tmdb.org/t/p/w400/${company.logo_path}`} alt={ company.name} />
                      </Paper>
                    ))}
                </Box>
              </AccordionDetails>
            </Accordion>
            <Accordion square expanded={true} onChange={() => handleChange('panel2')}>
              <AccordionSummary aria-controls="panel2d-content" id="panel2d-header">
                <Typography>Genre & Series</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Box>
                {details?.belongs_to_collection &&
                  <>
                    <Paper className={classes.image}>
                      <img
                        src={`http://image.tmdb.org/t/p/w200/${details?.belongs_to_collection.poster_path}`}
                        alt={details?.belongs_to_collection?.name} />
                    </Paper>
                    <Typography className={ classes.textIconAlign}>
                      <ArrowRightIcon />{details?.belongs_to_collection?.name}</Typography>
                    </>}
                </Box>
              </AccordionDetails>
            </Accordion>
            <Accordion square expanded={true} onChange={() =>  handleChange('panel3')}>
              <AccordionSummary aria-controls="panel3d-content" id="panel3d-header">
                <Typography>Reviews</Typography>
              </AccordionSummary>
              <AccordionDetails className={ classes.accDetailWrap }>
                {reviews.length && reviews.map((review: IReview, idx: number) => (
                  <Grid container key={idx} spacing={ 2 }>
                    <Grid item xs={2}>
                      <Avatar alt={review?.author} src={review?.author_details?.avatar_path} />
                    </Grid>
                    <Grid item xs={10}>
                      <Typography variant="h6">{review?.author} { new Date(review?.created_at).toLocaleDateString('en-GB')}</Typography>
                      <Typography variant="body2">{review?.content}</Typography>
                      <Button variant="contained" color="secondary" href={ review.url}>Read more...</Button>
                    </Grid>
                  </Grid>
                ))}
              </AccordionDetails>
            </Accordion>
          </Box>
        </Grid>
      </Grid>
    </>
  )
}

export default Details