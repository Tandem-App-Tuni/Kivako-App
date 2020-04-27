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
      backgroundColor: "#F4F4F4",
      borderRadius: "80%",
      boxShadow: '0 2px 8px 0 #c1c9d7, 0 -2px 8px 0 #cce1e9',
      marginRight:"auto",
      marginLeft: "auto",
      width: '10rem',
      height: '10rem',
      [theme.breakpoints.between('lg','xl')]: {
        width: '10rem',
        height: '10rem',
        marginTop:"20px",
      },
      [theme.breakpoints.down('lg')]: {
        width: '10rem',
        height: '10rem',
        borderRadius: "50%",
      },
      [theme.breakpoints.down('1462')]: {
        width: '10rem',
        height: '10rem',
        borderRadius: "60%",
      },
      [theme.breakpoints.down('1346')]: {
        height: '7rem',
        width: '7rem'
      },
      [theme.breakpoints.down('md')]: {
        height: '5rem',
        width: '5rem'
      },
      [theme.breakpoints.down('sm')]: {
        height: '4rem',
        width: '4rem'
      },
      [theme.breakpoints.down('xs')]: {
        height: '3rem',
        width: '3rem'
      },
    },
    content: {
      padding: "0px, 0, 0, 0",
    },
    titleText: {
      fontSize: 17,
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
        minWidth: "auto",
        maxWidth: "auto",
        minHeight: "auto"
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
        portOption:ConstantsList.PORT_IN_USE,
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
        const { classes, newsImage, news } = this.props;
        const {title, content, author, updatedAt} = news;
        const trimedTitle = (title && title.length > 28) ? title.substring(0,28) + "..." : title

        return(
          <div>
            <Card className={classes.card} elevation={0}>
              <CardContent className={classes.content}>
                  <CardMedia
                      className={classes.media}
                      component="img"
                      image={newsImage}/>
                  <Box mb={1}>
                      <h4>
                        <Link
                          component={'button'}
                          onClick={this.handleNewsDetailsOpen}
                          className={classes.titleText}
                          >
                          {trimedTitle} <ArrowForwardIos className={classes.icon}/>
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
                newsImage={newsImage}/>
            </Dialog>
        </div>
        );
    }
        
  }


  export default withStyles(useStyles) (NewsCard);

