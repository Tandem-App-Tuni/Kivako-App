import React, {Component} from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Box from '@material-ui/core/Box';
import {withStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import CardMedia from '@material-ui/core/CardMedia';

const useStyles = theme => ({
  '@global': {
    body: {
      backgroundColor: theme.palette.common.white,
    },
  },
  media: {
    flexShrink: 0,
    backgroundColor: "#F4F4F4",
    borderRadius: "80%",
    boxShadow: '0 2px 8px 0 #c1c9d7, 0 -2px 8px 0 #cce1e9',
    marginTop:"2%",
    marginLeft: "33%",
    width: '33%',
    height: '33%',
    
  },
  cardMedia:  {
    minHeight: '300px'
  }
});



class NewsDetails extends Component {

    constructor(props) {
      super(props);
  }
    
  render() 
  {
    const { classes, newsTitle, newsContent, newsImage } = this.props;
    
    return  (
      <div>
        <Container component="main" maxWidth="sm">
          <CssBaseline />
          <CardMedia
            className={classes.media}
            component="img"
            image={newsImage}
            />
            <Box mb={1}>
                <h3>{newsTitle}</h3>
            </Box>
            <p className={classes.descriptionText}>
                {newsContent}     
            </p>
        </Container>
      </div> 
    );
  }


}

export default withStyles(useStyles)(NewsDetails);
