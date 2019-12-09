import React, { Component } from 'react';
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


import { languages } from '../constant/languages';

const useStyles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    // margin: theme.spacing(1),
    minWidth: 120,
  },
})

class LanguagePicker extends Component {
  state = {
    language: "",
    level: "",
    credit: "",
    errorStr: "",
    excludedLanguages: []
  }

  componentWillReceiveProps(nextProps) {
    var language = "";
    var level = "";
    var credit = "";
    var excludedLanguages = [];
    if (nextProps.language != null) {
      language = nextProps.language.language;
      level = nextProps.language.level;
      credit = nextProps.language.credit;
      excludedLanguages = nextProps.language.excludedLanguages;
    }

    this.setState(
      {
        language: language,
        level: level,
        credit: credit,
        errorStr: ""
      }
    );

  }

  handleTypeLanguage = (event, value) => {
    if (value != "") {
      this.setState(
        { language: "" }
      )
    }
  }

  handleChangeLanguage = (event, value) => {
    var language = value
    if (value === null) {
      language = ""
    }
    this.setState(
      { language: language }
    )
  }

  handleChangeLevel = (event) => {
    this.setState(
      { level: event.target.value }
    )
  }

  handleChangeCredit = (event) => {
    this.setState(
      { credit: event.target.value }
    )
  }



  handleDone = () => {
    if (this.state.language == "" || this.state.level == "" || (this.props.type === "learn" && this.state.credit == "")) {
      this.setState(
        { errorStr: "Please fill in all data" }
      )
      return
    }
    this.props.onClose(
      {
        language: this.state.language,
        level: this.state.level,
        credit: this.state.credit
      }
    )
  }

  handleClose = () => {
    this.props.onClose()
  }

  render() {
    const { classNamees } = this.props;
    var levels = ["C1", "C2"];
    if (this.props.type == "learn") {
      levels = ["A1", "A2", "B1", "B2", "C1", "C2"];
    }

    const excludedLanguages = this.props.excludedLanguages;
    const filteredLanguages = languages.filter(function (x) {
      return excludedLanguages.indexOf(x) < 0;
    });

    return (<div>
      <Dialog disableBackdropClick disableEscapeKeyDown open={this.props.open}>
        <DialogTitle>Input Language</DialogTitle>
        <DialogContent>
          <Autocomplete
            options={filteredLanguages}
            getOptionLabel={option => option}
            style={{ width: 300 }}
            onChange={(event, value) => this.handleChangeLanguage(event, value)}
            onInputChange={(event, value) => this.handleTypeLanguage(event, value)}
            renderInput={params => (
              <TextField {...params}
                placeholder="Language"
                fullWidth
                label={this.state.language}
              />
            )}
          />

          <FormControl classNameName={classNamees.formControl}>
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

          {this.props.type === "learn" && <FormControl classNameName={classNamees.formControl}>
            <InputLabel >Credit</InputLabel>
            <Select
              value={this.state.credit}
              onChange={this.handleChangeCredit}
              input={<Input />}
            >
              <MenuItem value={0} key={0}>
                <em>None</em>
              </MenuItem>
              {[1, 2, 3, 4, 5].map(item => {
                return <MenuItem key={item} value={item}>{item}</MenuItem>
              })}

            </Select>
          </FormControl>
          }
          {
            this.state.errorStr != "" && <Typography variant="body2" color="secondary" gutterBottom>
              {this.state.errorStr}
            </Typography>

          }
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
export default withStyles(useStyles)(LanguagePicker);