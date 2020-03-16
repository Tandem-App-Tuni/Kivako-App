import React, {Component} from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Box from '@material-ui/core/Box';
import Link from '@material-ui/core/Link';
import CardMedia from '@material-ui/core/CardMedia';
import Divider from '@material-ui/core/Divider';
import Rating from '@material-ui/lab/Rating';
import ArrowForwardIos from '@material-ui/icons/ArrowForwardIos';
import ModeComment from '@material-ui/icons/ModeComment';
import Favorite from '@material-ui/icons/Favorite';
import Chip from '@material-ui/core/Chip';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';

// const useStyles = theme => ({
   
//     card: {
//       maxWidth: 400,
//       textAlign: 'left'
//     },
//     leftText:{
//       textAlign: 'left'
//   }
//   });


  const useStyles = theme => ({
    card: {
      display: 'flex',
      padding: "1px",
      borderRadius: 16,
      backgroundColor: "#FAFAFA"
    },
    media: {
      minWidth: '25%',
      maxWidth: '25%',
      flexShrink: 0,
      maxHeight:"200px",
      backgroundColor: "#F4F4F4",
      borderRadius: 15,
      boxShadow: '0 2px 8px 0 #c1c9d7, 0 -2px 8px 0 #cce1e9',
      marginTop:"20px",
      marginRight:"20px"
    },
    content: {
      padding: "0px, 0, 0, 0",
    },
    heading: {
      fontSize: 17,
      fontWeight: 'bold',
      letterSpacing: '0.5px',
      marginBottom: 0,
      marginRight: "1.5em",
      display: 'inline-block',
    },
    body: {
      fontSize: 14,
      wordWrap: "break-word"
    },
    textFooter: {
      fontSize: 14,
    },
    icon: {
      fontSize: '0.8rem',
    },
    chip: {
      marginLeft: "5px"
    },
    button: {
      marginRight: "10px"
    }
  });
  
  class UserStyleCard extends Component 
  {
    render ()
    {
        const { classes } = this.props;

        return(
          <Card className={classes.card} elevation={0}>
          <CardContent className={classes.content}>
            <Box mb={1}>
              <h2 className={classes.heading}>Teemu Pukki</h2>
              <Link
                component={'button'}
              >
                Full profile <ArrowForwardIos className={classes.icon}/>
              </Link>
            </Box>
            <Box mb={1}>
              <h6 className={classes.heading}> Helsinki </h6>
            </Box>
            <p className={classes.body}>
              Lorem ipsum is placeholder text commonly used in the graphic, print,
              credit (www.brighttv.co.th)
            </p>
            <div>
              
            </div>
            <p className={classes.body}> Want to learn   
              <Chip className={classes.chip} color="primary" variant="outlined" size="small" label="English - 1A - 5 credits" />
              <Chip className={classes.chip} color="primary" variant="outlined" size="small" label="Finnish - 1A - 5 credits" />
              <Chip className={classes.chip} color="primary" variant="outlined" size="small" label="Spanish - 1A - 5 credits" />
            </p>
            <p className={classes.body}> 

              <Grid>
                <Button className={classes.button} variant="outlined" size="small" color="primary" >
                  Accept
                </Button>
                <Button className={classes.button} variant="outlined" size="small" color="secondary" >
                  Deny
                </Button>

              </Grid>
            </p>
            {/* <Divider className={classes.divider} light /> */}
            <div className={classes.parent}> 
            </div>
          </CardContent>
          <CardMedia
            className={classes.media}
            image={
              'https://www.thesun.co.uk/wp-content/uploads/2019/08/NINTCHDBPICT000514173333-e1566058275271.jpg'
            }
          />
        </Card>

        );
    }
        
  }


  export default withStyles(useStyles) (UserStyleCard);

