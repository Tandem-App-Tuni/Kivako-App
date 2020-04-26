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
      padding: "1px",
      borderRadius: 16,
      backgroundColor: "#FAFAFA",
      width: "250px",
      height: "250px",
      [theme.breakpoints.down('md')]: {
        width: "185px",
      height: "185px",
      },
      [theme.breakpoints.down('sm')]: {
        width: "160px",
      height: "160px",
      },
      [theme.breakpoints.down('xs')]: {
        width: "120px",
      height: "120px",
      },
      
      },
    media: {
      flexShrink: 0,
      backgroundColor: "#F4F4F4",
      borderRadius: "80%",
      boxShadow: '0 2px 8px 0 #c1c9d7, 0 -2px 8px 0 #cce1e9',
      marginRight:"2%",
      marginLeft: "11%",
      width: '10rem',
      height: '10rem',
      [theme.breakpoints.between('lg','xl')]: {
        width: '10rem',
        height: '10rem',
        marginTop:"20px",
        marginRight: "5%",
      },
      [theme.breakpoints.down('lg')]: {
        width: '10rem',
        height: '10rem',
        marginRight: "5px",
        borderRadius: "50%",
      },
      [theme.breakpoints.down('1462')]: {
        width: '10rem',
        height: '10rem',
        marginRight: "5px",
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
        //display: "none",
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
        const { classes, newsTitle, newsContent, newsImage } = this.props;
        const trimedTitle = (newsTitle && newsTitle.length > 28) ? newsTitle.substring(0,28) + "..." : newsTitle

        return(
          <div>
            <Card className={classes.card} elevation={0}>
              <CardContent className={classes.content}>
                  <CardMedia
                      className={classes.media}
                      component="img"
                      image={newsImage}
                  />

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
                fullWidth={true}
            >
              <NewsDetails
                newsTitle={newsTitle}
                newsContent={newsContent}
                newsImage={newsImage}
              ></NewsDetails>
            </Dialog>
        </div>
        );
    }
        
  }


  export default withStyles(useStyles) (NewsCard);

