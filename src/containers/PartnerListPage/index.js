import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import UserStyleCard from '../../components/UserStyleCard';
import Constants from '../../config_constants';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { ConfirmDialog } from '../../components/AlertView';
import Dialog from '@material-ui/core/Dialog';
import Hidden from '@material-ui/core/Hidden';
import { getApiData, getApiUrl } from '../../helpers/networkRequestHelpers';


const styles = theme => ({
  /*root:
  {
    display: 'inline',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',

    // backgroundColor: theme.palette.background.paper,
  },*/
  expansionPan: {
    backgroundColor: '#f5f5f5',
  },
});

/**
 * Displays the current partners from the
 * match data returned from the server.
 * The user can the choose to unadd the partner,
 * resulting in the match being removed from the server.
 */
class PartnerListPage extends Component {
  constructor(props) {
    super(props);
    this.state =
    {
      partnerList: [],
      isReportFormOpen: false,
      showConfirm: false,
      unmatchId: ""
    };
    this.onUnmatchUser = this.onUnmatchUser.bind(this);
    this.onReportPartner = this.onReportPartner.bind(this);
  }

  getPartnerList() {
    getApiData({
      version: 'v1',
      endpoint: 'usersMatch/getUserActiveMatches',
    }, {
      method: 'GET',
      headers:
      {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      credentials: 'include'
    })
      .then(responseSecond => responseSecond.json())
      .then(jsonResponse => {
        if (jsonResponse.data === undefined) {
          this.setState({ partnerList: [] });
          return;
        }

        const userId = jsonResponse.userId;
        let partners = [];

        /**
         * Loop through all the matches and
         * and extract important data to be displayed.
         */
        for (let i = 0; i < jsonResponse.data.length; i++) {
          let match = jsonResponse.data[i];
          const user = match.requesterUser._id === userId ? match.recipientUser : match.requesterUser;

          let ltt = [];
          let ltl = [];

          user.languagesToTeach.forEach(item => {
            ltt.push(item.language);
          });

          user.languagesToLearn.forEach(item => {
            ltl.push(item.language);
          });

          partners.push({
            firstName: user.firstName,
            lastName: user.lastName,
            _id: i,
            matchId: match._id,
            cities: user.cities,
            teachLanguages: ltt,
            studyLanguages: ltl,
            email: user.email,
            languagesToLearn: user.languagesToLearn,
            descriptionText: user.descriptionText,
            photo_url: getApiUrl({
              version: 'v1',
              endpoint: 'avatar/getAvatar/' + user.email
            }),
          });
        }
        this.setState({ partnerList: partners });
      });
  }

  componentDidMount() {
    this.getPartnerList();
  }

  getPartnersTiles(partnerList, classes) {
    return (
      <div style={{ width: '100%' }}>
        <Hidden smDown>
          <GridList cellHeight="auto" cols={3} >
            {
              partnerList.map((partner, _id) => {
                return (
                  <GridListTile key={_id} >
                    <UserStyleCard 
                      user={partner} 
                      page="partner-list"
                      yesText="Unmatch" 
                      yesFunction={() => { this.setState({ showConfirm: true, unmatchId: partner.matchId }) }} matchId={partner.matchId}
                      noText="Report" 
                      noFunction={this.onReportPartner}>
                    </UserStyleCard>
                  </GridListTile>
                )
              })
            }
          </GridList>
        </Hidden>
        <Hidden mdUp>
          <GridList cellHeight="auto" cols={1} spacing={25} >
            {
              partnerList.map((partner, _id) => {
                return (
                  <GridListTile key={_id}>
                    <UserStyleCard
                      user={partner} 
                      page="partner-list"
                      yesText="Unmatch" 
                      yesFunction={() => { this.setState({ showConfirm: true, unmatchId: partner.matchId }) }} matchId={partner.matchId}
                      noText="Report" 
                      noFunction={this.onReportPartner}>
                    </UserStyleCard>
                  </GridListTile>
                )
              })
            }
          </GridList>
        </Hidden>
      </div>
    )
  }

  getPartnerDiv(list, classes) {
    if (this.state.partnerList.length === 0) return <div />;
    else {
      return (
        <div className={classes.root}>
          <ExpansionPanel defaultExpanded={true} className={classes.expansionPan}>
            <ExpansionPanelSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography variant="h6">
                Your current partner(s)
              </Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              {
                this.getPartnersTiles(this.state.partnerList, classes)
              }
              <br></br>
            </ExpansionPanelDetails>
          </ExpansionPanel>
        </div>
      );
    }
  }

  onUnmatchUser = () => {
    getApiData({
      version: 'v1',
      endpoint: 'usersMatch/removeExistingMatch',
    }, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({ matchId: this.state.unmatchId })
    })
      .then((response) => {
        this.getPartnerList();
        this.setState({ showConfirm: false, unmatchId: "" })
      });
  }

  onReportPartner() {
    this.setState({ isReportFormOpen: true })
  }

  handleReportFormClose = () => {
    this.setState({
      isReportFormOpen: false
    })
  };

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        {this.getPartnerDiv(this.state.partnerList, classes)}
        <Dialog
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={this.state.isReportFormOpen}
          onClose={this.handleReportFormClose}
          maxWidth={'md'}
          fullWidth={true}
        >
          {/* TODO: update it ASAP when getting a correct link from customer */}
          <iframe src="https://docs.google.com/forms/d/e/1FAIpQLSeNpw2ZAAa0gmvlpw1B5KJv2SSr41bNTz9uXAB-eqKD4TvcXA/viewform?embedded=true"
            width="100%" height="1491" >Loading…</iframe>
        </Dialog>
        <ConfirmDialog
          open={this.state.showConfirm}
          onClose={() => { this.setState({ showConfirm: false, unmatchId: "" }) }}
          title="Are you sure you want to unmatch this user?"
          onConfirm={this.onUnmatchUser} 
        />
      </div>
    );
  }

}
PartnerListPage.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PartnerListPage);
