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
import {languages} from '../constant/languages';

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
    if  (nextProps.language != null){
    const language = nextProps.language.language;
    const level = nextProps.language.level;
    const credit = nextProps.language.credit;
   
    this.setState(
        {
          language: language,
          level: level,
          credit: credit
        }
    );  
      }
  }

  handleChangeLanguage = (event) => {
    this.setState(
      {language: event.target.value}
    )
  }

  handleChangeLevel = (event) => {
    this.setState(
      {level: event.target.value}
    )
  }

  handleChangeCredit = (event) => {
    this.setState(
      {credit: event.target.value}
    )
  }



  handleDone = () => {
    this.props.onClose(
      {
        language: "English", 
        level: this.state.level,
        credit: this.state.credit
     }
    )
  }

  handleClose = () => {
    this.props.onClose()
  }

  render(){
    const {classes} = this.props;
    var levels = ["C1","C2"];
    if (this.props.type == "study"){
        levels = ["A1","A2","B1","B2","C1","C2"];
    }
    return (<div>
      <Dialog disableBackdropClick disableEscapeKeyDown open={this.props.open}>
        <DialogTitle>Input Language</DialogTitle>    
        <DialogContent>
          <form className={classes.container}>
            <FormControl className={classes.formControl}>
              {/* <InputLabel>Language</InputLabel> */}
              <Autocomplete
                options={languages}
                getOptionLabel={option => option}
                style={{ width: 200}}
                renderInput={params => (
                  <TextField {...params} placeholder = "Language"  fullWidth />
                )}
              />
            </FormControl>
            <FormControl className={classes.formControl}>
              <InputLabel>Level</InputLabel>
              <Select
                value={this.state.level}
                onChange={this.handleChangeLevel}
                input={<Input />}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {levels.map(item => {
                  return <MenuItem key={item} value={item}>{item}</MenuItem>
                  })}
              </Select>
            </FormControl>

           { this.props.type === "study" && <FormControl className={classes.formControl}>
              <InputLabel >Credit</InputLabel>
              <Select
                value={this.state.credit}
                onChange={this.handleChangeCredit}
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
           }
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={this.handleDone} color="primary">
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    </div>)
  }
}
export default withStyles(useStyles) (LanguagePicker);