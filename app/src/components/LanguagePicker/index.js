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


const useStyles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
})

class LanguagePicker extends Component { 
  state = {
    language : "",
    level : "",
    credit : ""
  }

  componentWillReceiveProps(nextProps) {
    const language = nextProps.language;
    const level = nextProps.level;
    const credit = nextProps.credit;
   
    this.setState(
        {
          language: language,
          level: level,
          credit: credit
        }
    );  
  }

  handleChange(){}

  handleClose(){}

  render(){
    const {classes} = this.props;
    return (<div>
      <Dialog disableBackdropClick disableEscapeKeyDown open={this.props.open}>
        <DialogTitle>Input Language</DialogTitle>
        <DialogContent>
          <form className={classes.container}>
            <FormControl className={classes.formControl}>
              <InputLabel htmlFor="demo-dialog-native">Language</InputLabel>
              <Select
                native
                value=""
                onChange={this.handleChange}
                input={<Input id="demo-dialog-native" />}
              >
                <option value="" />
                <option value={10}>Ten</option>
                <option value={20}>Twenty</option>
                <option value={30}>Thirty</option>
              </Select>
            </FormControl>
            <FormControl className={classes.formControl}>
              <InputLabel id="demo-dialog-select-label">Level</InputLabel>
              <Select
                labelId="demo-dialog-select-label"
                id="demo-dialog-select"
                value=""
                onChange={this.handleChange}
                input={<Input />}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {["A1","A2","B1","B2","C1","C2"].map(item => {
                  return <MenuItem key={item} value={item}>{item}</MenuItem>
                  })}
              </Select>
            </FormControl>

            <FormControl className={classes.formControl}>
              <InputLabel id="demo-dialog-select-label">Credit</InputLabel>
              <Select
                labelId="demo-dialog-select-label"
                id="demo-dialog-select"
                value=""
                onChange={this.handleChange}
                input={<Input />}
              >
                <MenuItem value = {0} key = {0}>
                  <em>None</em>
                </MenuItem>
                {[1,2,3,4,5].map(item => {
                  return <MenuItem key={item} value={item}>{item}</MenuItem>
                  })}
                
              </Select>
            </FormControl>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={this.handleClose} color="primary">
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    </div>)
  }
}
export default withStyles(useStyles) (LanguagePicker);