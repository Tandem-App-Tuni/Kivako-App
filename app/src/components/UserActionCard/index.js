import React, {Component} from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';

const useStyles = theme => ({
   
    card: {
      maxWidth: 400,
    },
  });
  
  class UserActionCard extends Component {

    render (){
        const { classes } = this.props;
        return(
            <Dialog className={classes.container}  open={this.props.open}>
         <Card className={classes.card}>
        <CardActionArea>
          <CardMedia
            component="img"
            height="200"
            image={this.props.data.user.photo_url}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
            {this.props.data.user.name}
            </Typography>
            <Typography gutterBottom variant="subtitle2" color="textSecondary">
            {this.props.data.user.city.join(", ")}
            </Typography>
            <Typography gutterBottom variant="body2" color="textSecondary">
            Teach: {this.props.data.user.teachLanguages.join(", ")}. 
            Learn: {this.props.data.user.studyLanguages.join(", ")}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
            {this.props.data.user.intro}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
        {this.props.type === "invite" && <Button size="small" color="primary" onClick = {() => this.props.onClose("invite")}>
            Invite
          </Button>}

          {this.props.type === "partner" &&
          (<div>
            <Button size="small" color="primary" onClick = {() => this.props.onClose("chat")}>
            Chat
          </Button>
          <Button size="small" color="secondary" onClick = {() => this.props.onClose("unmatch")}>
            Unmatch
          </Button>
          </div>)
          }
          <Button size="small" color="secondary" onClick = {() => this.props.onClose()}>
            Close
          </Button>
        </CardActions>
      </Card>
      </Dialog>
        );
    }
        
  }


  export default withStyles(useStyles) (UserActionCard);

