import React, {Component} from 'react';
import { withStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Box from '@material-ui/core/Box';
import Link from '@material-ui/core/Link';
import CardMedia from '@material-ui/core/CardMedia';
import ArrowForwardIos from '@material-ui/icons/ArrowForwardIos';

import NewsDetails from '../../containers/NewsDetails'
import ConstantsList from '../../config_constants';


  const useStyles = theme => ({
    card: {
      display: 'flex',
      flexDirection: "column",
      textAlign: "center",
      borderRadius: 16,
      backgroundColor: "#FAFAFA",
      width: "100%",
      height: "250px",
      [theme.breakpoints.down('md')]: {
        height: "185px",
      },
      [theme.breakpoints.down('sm')]: {
        height: "160px",
      },
      [theme.breakpoints.down('xs')]: {
        height: "120px",
      },
    },
    media: {
      flexShrink: 0,
      marginRight:"auto",
      marginLeft: "auto",
      width: '10rem',
      height: '10rem',
      [theme.breakpoints.between('lg','xl')]: {
        width: '9rem',
        height: '9rem',
      },
      [theme.breakpoints.down('lg')]: {
        width: '8rem',
        height: '8rem',
      },
      [theme.breakpoints.down('1462')]: {
        width: '7rem',
        height: '7rem',
      },
      [theme.breakpoints.down('1346')]: {
        height: '5rem',
        width: '5rem'
      },
      [theme.breakpoints.down('xs')]: {
        display: "none"
      },
    },
    content: {
      padding: "0px, 0, 0, 0",
    },
    titleText: {
      fontSize: 23,
      wordWrap: "break-word",
      marginTop: "15px",
      minWidth: "220px",
      maxWidth: "220px",
      [theme.breakpoints.down('lg')]: {
        minWidth: "220px",
        maxWidth: "220px"
      },
      [theme.breakpoints.down('1346')]: {
        minWidth: "180px",
        maxWidth: "180px"
      },
      [theme.breakpoints.down('md')]: {
        fontSize: 18,
        minWidth: "auto",
        maxWidth: "auto",
        minHeight: "auto"
      },
      [theme.breakpoints.down('sm')]: {
        fontSize: 15,
        margin: "0px",
        minWidth: "auto",
        maxWidth: "auto",
        minHeight: "auto",
        textAlign:"center"
      }
    }
  });

  class NewsCard extends Component
  {
    constructor(props) {
      super(props);

      this.state =
      {
        newsDetailsOpen: false,
      };
    }

    handleNewsDetailsOpen = () => {
      this.setState({
        newsDetailsOpen: true
      })
    }
    handleClose = () => {
      this.setState({
        newsDetailsOpen: false
      })
    };



    render ()
    {
        const { classes, news } = this.props;
        const {title, content, author, updatedAt} = news;
        const trimedTitle = (title && title.length > 70) ? title.substring(0,70) + "..." : title

        return(
          <div>
            <Card className={classes.card} elevation={0}>
              <CardContent className={classes.content}>
                  <CardMedia
                      className={classes.media}
                      component="img"
                      image={window.location.origin + '/news-thumbnail.png'}/>
                  <Box mb={1}>
                      <h4 className={classes.fullWidth}>
                        <Link
                          component={'button'}
                          onClick={this.handleNewsDetailsOpen}
                          className={classes.titleText}
                          >
                          {trimedTitle}
                        </Link>
                      </h4>
                  </Box>
              </CardContent>
            </Card>
            <Dialog
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
                open={this.state.newsDetailsOpen}
                onClose={this.handleClose}
                maxWidth={'md'}
                fullWidth={true}>
              <NewsDetails
                newsTitle={title}
                newsContent={content}
                newsAuthor={author}
                newsUpdateDate={updatedAt}
                newsImage={window.location.origin + '/news-thumbnail.png'}/>
            </Dialog>
        </div>
        );
    }

  }


  export default withStyles(useStyles) (NewsCard);

