import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const DialogTitle = withStyles(styles)(props => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles(theme => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles(theme => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

export default function TermsEnglishDialog() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
        <div>
            <Button variant="outlined"  onClick={handleClickOpen} fullWidth={true}>
                Open terms
            </Button>
        </div>

      <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
            UNITANDEM PRIVACY POLICY
        </DialogTitle>
        <DialogContent dividers>
            <br></br>
            <Typography variant='subtitle1' align='left' gutterBottom> <b>Name of the service</b></Typography>
            <Typography variant='body' gutterBottom align='left'> UniTandem website </Typography>
            <br></br>
            <Typography variant='subtitle1' align='left' gutterBottom> <b>Description of the service</b> </Typography>
            <Typography variant='body' gutterBottom lign='justify'> A website for tandem language and culture learning aimed at Finnish university students.  </Typography>
            <br></br>
            <Typography variant='subtitle1' align='left' gutterBottom> <b>Data controllers and contact persons</b> </Typography>
            <Typography variant='body' gutterBottom> 
              Tampere universities<br></br>
              Henri Annala, Emmanuel Abruquah<br></br>
              info (at) unitandem.fi<br></br>
              http://www.tuni.fi/en <br></br>
              Tampere University,Kalevantie 4, 33014 Tampere,  tel. +358 (0) 294 5211 
            </Typography>
            <br></br> 

            <Typography variant='subtitle1' align='left' gutterBottom> <b>Jurisdiction</b> </Typography>
            <Typography variant='body' gutterBottom> FI – Finland </Typography>
            <br></br>
            <Typography variant='subtitle1' align='left' gutterBottom> <b>Personal data processed </b> </Typography>
            <Typography variant='body' gutterBottom align='justify'>
              Data in the log files of the server is used for technical maintenance, service security and collecting general statistics. 
              <br></br>
              The website stores and processes the following personal data: name, municipality of residence and study, email address, university, photo of user
            </Typography>
            <br></br>
            <Typography variant='subtitle1' align='left' gutterBottom> <b>Third parties to whom personal data is disclosed </b> </Typography>
            <Typography variant='body' gutterBottom> Personal data is not disclosed to third parties. </Typography>
            <br></br>
            <Typography variant='subtitle1' align='left' gutterBottom> <b>How to access, rectify or delete personal data </b> </Typography>
            <Typography variant='body' gutterBottom> Contact the data controller. </Typography>
            <br></br>
            <Typography variant='subtitle1' align='left' gutterBottom> <b>Data retention </b> </Typography>
            <Typography variant='body' gutterBottom> Logged data is removed after the user has not logged in to the service for a year. </Typography>
            <br></br>
            <Typography variant='subtitle1' align='left' gutterBottom> <b>Data Protection Code of Conduct </b> </Typography>
            <Typography variant='body' gutterBottom>Personal data is protected according to the Code of Conduct for Service Providers (http://www.geant.net/uri/dataprotection-code-of-conduct/v1/Pages/default.aspx), a common standard for the research and higher education sector to protect privacy.  </Typography>
            <br></br>
            <Typography variant='subtitle1' align='left' gutterBottom> <b>Statistics </b> </Typography>
            <Typography variant='body' gutterBottom>UniTandem uses first-party cookies for collecting usage data of its website. The data is used for improving the functionality of services and it is not disclosed to third parties.  </Typography>
            <br></br>
            <br></br>
            <p><strong><span data-contrast="auto">TERMS OF USE OF UNITANDEM</span></strong><span data-ccp-props="{&quot;201341983&quot;:0,&quot;335559739&quot;:160,&quot;335559740&quot;:259}">&nbsp;</span></p>
            <p><span data-ccp-props="{&quot;201341983&quot;:0,&quot;335559739&quot;:160,&quot;335559740&quot;:259}">&nbsp;</span></p>
            <p><strong><span data-contrast="auto">1 Scope</span></strong><span data-ccp-props="{&quot;201341983&quot;:0,&quot;335559739&quot;:160,&quot;335559740&quot;:259}">&nbsp;</span></p>
            <p><span data-ccp-props="{&quot;201341983&quot;:0,&quot;335559739&quot;:160,&quot;335559740&quot;:259}">&nbsp;</span></p>
            <p><strong><span data-contrast="auto">1.1 To whom do these Terms of Use apply?</span></strong><span data-ccp-props="{&quot;201341983&quot;:0,&quot;335559739&quot;:160,&quot;335559740&quot;:259}">&nbsp;</span></p>
            <p><span data-contrast="auto">The Terms of Use apply to and bind all&nbsp;</span><span data-contrast="auto">users of the&nbsp;</span><span data-contrast="auto">UniTandem</span><span data-contrast="auto">&nbsp;website</span><span data-contrast="auto">&nbsp;(hereinafter &ldquo;Service&rdquo;)</span><span data-contrast="auto">.</span><span data-contrast="auto">&nbsp;</span><span data-contrast="auto">Any use of the Service by means of&nbsp;</span><span data-contrast="auto">a Finnish university or university of applied sciences email address</span><span data-contrast="auto">&nbsp;also signifies the&nbsp;</span><span data-contrast="auto">u</span><span data-contrast="auto">ser</span><span data-contrast="auto">&rsquo;</span><span data-contrast="auto">s acceptance of the Terms of Use and the&nbsp;</span><span data-contrast="auto">u</span><span data-contrast="auto">ser&rsquo;s agreement to be bound by them.</span><span data-ccp-props="{&quot;201341983&quot;:0,&quot;335559739&quot;:160,&quot;335559740&quot;:259}">&nbsp;</span></p>
            <p><span data-ccp-props="{&quot;201341983&quot;:0,&quot;335559739&quot;:160,&quot;335559740&quot;:259}">&nbsp;</span></p>
            <p><strong><span data-contrast="auto">1.2 Other norms applied to usage</span></strong><span data-ccp-props="{&quot;201341983&quot;:0,&quot;335559739&quot;:160,&quot;335559740&quot;:259}">&nbsp;</span></p>
            <p><span data-contrast="auto">In addition to these Terms of Use, the following norms must be complied with:</span><span data-ccp-props="{&quot;201341983&quot;:0,&quot;335559739&quot;:160,&quot;335559740&quot;:259}">&nbsp;</span></p>
            <ul>
            <li data-leveltext="" data-font="Symbol" data-listid="1" data-aria-posinset="1" data-aria-level="1"><span data-contrast="auto">legislation in force in Finland at each time</span><span data-ccp-props="{&quot;134233279&quot;:true,&quot;201341983&quot;:0,&quot;335559739&quot;:160,&quot;335559740&quot;:259}">&nbsp;</span></li>
            </ul>
            <ul>
            <li data-leveltext="" data-font="Symbol" data-listid="1" data-aria-posinset="1" data-aria-level="1"><span data-contrast="auto">the&nbsp;</span><span data-contrast="auto">Privacy Policy of&nbsp;</span><span data-contrast="auto">UniTandem</span><span data-contrast="auto">&nbsp;and any other policies that are applied to the use of the services</span><span data-ccp-props="{&quot;134233279&quot;:true,&quot;201341983&quot;:0,&quot;335559739&quot;:160,&quot;335559740&quot;:259}">&nbsp;</span></li>
            <li data-leveltext="" data-font="Symbol" data-listid="1" data-aria-posinset="2" data-aria-level="1"><span data-contrast="auto">any general and service-specific terms and conditions and rules that complement these Terms of Use</span><span data-ccp-props="{&quot;134233279&quot;:true,&quot;201341983&quot;:0,&quot;335559739&quot;:160,&quot;335559740&quot;:259}">&nbsp;</span></li>
            </ul>
            <p><span data-ccp-props="{&quot;201341983&quot;:0,&quot;335559739&quot;:160,&quot;335559740&quot;:259}">&nbsp;</span></p>
            <p><strong><span data-contrast="auto">2 Authorisation</span></strong><span data-ccp-props="{&quot;201341983&quot;:0,&quot;335559739&quot;:160,&quot;335559740&quot;:259}">&nbsp;</span></p>
            <p><span data-ccp-props="{&quot;201341983&quot;:0,&quot;335559739&quot;:160,&quot;335559740&quot;:259}">&nbsp;</span></p>
            <p><strong><span data-contrast="auto">2.1 What is an authorisation?</span></strong><span data-ccp-props="{&quot;201341983&quot;:0,&quot;335559739&quot;:160,&quot;335559740&quot;:259}">&nbsp;</span></p>
            <p><span data-contrast="auto">If a service is public and available for use on the Internet, all Internet users are authorised to use it. Other services are intended for a limited user group, and a duly granted user identification and authorisation is required in order to use them.</span><span data-ccp-props="{&quot;201341983&quot;:0,&quot;335559739&quot;:160,&quot;335559740&quot;:259}">&nbsp;</span></p>
            <p><span data-contrast="auto">Authorisation means</span><span data-contrast="auto">&nbsp;in this case</span><span data-contrast="auto">&nbsp;the right to use&nbsp;</span><span data-contrast="auto">the S</span><span data-contrast="auto">ervice. The term &ldquo;user right&rdquo; is often used when talking about authorisation.</span><span data-ccp-props="{&quot;201341983&quot;:0,&quot;335559739&quot;:160,&quot;335559740&quot;:259}">&nbsp;</span></p>
            <p><span data-contrast="auto">The period of&nbsp;</span><span data-contrast="auto">authorisation&nbsp;</span><span data-contrast="auto">is&nbsp;</span><span data-contrast="auto">the same as the user&rsquo;s period of study right.</span><span data-ccp-props="{&quot;201341983&quot;:0,&quot;335559739&quot;:160,&quot;335559740&quot;:259}">&nbsp;</span></p>
            <p><span data-contrast="auto">An authorisation is personal.</span><span data-ccp-props="{&quot;201341983&quot;:0,&quot;335559739&quot;:160,&quot;335559740&quot;:259}">&nbsp;</span></p>
            <p><span data-ccp-props="{&quot;201341983&quot;:0,&quot;335559739&quot;:160,&quot;335559740&quot;:259}">&nbsp;</span></p>
            <p><strong><span data-contrast="auto">2.2 On which grounds is authorisation granted?</span></strong><span data-ccp-props="{&quot;201341983&quot;:0,&quot;335559739&quot;:160,&quot;335559740&quot;:259}">&nbsp;</span></p>
            <p><span data-contrast="auto">An authorisation is&nbsp;</span><span data-contrast="auto">automatically&nbsp;</span><span data-contrast="auto">granted</span><span data-contrast="auto">&nbsp;</span><span data-contrast="auto">if the user has a Finnish university&nbsp;</span><span data-contrast="auto">user id.</span><span data-ccp-props="{&quot;201341983&quot;:0,&quot;335559739&quot;:160,&quot;335559740&quot;:259}">&nbsp;</span></p>
            <p><span data-ccp-props="{&quot;201341983&quot;:0,&quot;335559739&quot;:160,&quot;335559740&quot;:259}">&nbsp;</span></p>
            <p><strong><span data-contrast="auto">2.3 Restricted authorisation</span></strong><span data-ccp-props="{&quot;201341983&quot;:0,&quot;335559739&quot;:160,&quot;335559740&quot;:259}">&nbsp;</span></p>
            <p><span data-contrast="auto">It is possible to restrict a user&rsquo;s authorisation if there is a good reason to suspect that compromised information security or abuse is taking place.</span><span data-ccp-props="{&quot;201341983&quot;:0,&quot;335559739&quot;:160,&quot;335559740&quot;:259}">&nbsp;</span></p>
            <p><span data-ccp-props="{&quot;201341983&quot;:0,&quot;335559739&quot;:160,&quot;335559740&quot;:259}">&nbsp;</span></p>
            <p><strong><span data-contrast="auto">2.4 Beginning of authorisation</span></strong><span data-ccp-props="{&quot;201341983&quot;:0,&quot;335559739&quot;:160,&quot;335559740&quot;:259}">&nbsp;</span></p>
            <p><span data-contrast="auto">Authorisation begins when the&nbsp;</span><span data-contrast="auto">user receives a Finnish university user id.</span><span data-ccp-props="{&quot;201341983&quot;:0,&quot;335559739&quot;:160,&quot;335559740&quot;:259}">&nbsp;</span></p>
            <p><span data-ccp-props="{&quot;201341983&quot;:0,&quot;335559739&quot;:160,&quot;335559740&quot;:259}">&nbsp;</span></p>
            <p><strong><span data-contrast="auto">2.5 Expiry of authorisation</span></strong><span data-ccp-props="{&quot;201341983&quot;:0,&quot;335559739&quot;:160,&quot;335559740&quot;:259}">&nbsp;</span></p>
            <p><span data-contrast="auto">The authorisation ends&nbsp;</span><span data-contrast="auto">when the users&rsquo;&nbsp;</span><span data-contrast="auto">studies&nbsp;</span><span data-contrast="auto">at a Finnish university&nbsp;</span><span data-contrast="auto">end</span><span data-contrast="auto">.</span><span data-ccp-props="{&quot;201341983&quot;:0,&quot;335559739&quot;:160,&quot;335559740&quot;:259}">&nbsp;</span></p>
            <p><span data-ccp-props="{&quot;201341983&quot;:0,&quot;335559739&quot;:160,&quot;335559740&quot;:259}">&nbsp;</span></p>
            <p><strong><span data-contrast="auto">2.6 The responsibilities of a user in the event of the expiry of an authorisation</span></strong><span data-ccp-props="{&quot;201341983&quot;:0,&quot;335559739&quot;:160,&quot;335559740&quot;:259}">&nbsp;</span></p>
            <p><span data-contrast="auto">The user must store any personal information they will need</span><span data-contrast="auto">&nbsp;(e.g. chat history)</span><span data-contrast="auto">&nbsp;before their username for the service expires.&nbsp;</span><span data-ccp-props="{&quot;201341983&quot;:0,&quot;335559739&quot;:160,&quot;335559740&quot;:259}">&nbsp;</span></p>
            <p><span data-ccp-props="{&quot;201341983&quot;:0,&quot;335559739&quot;:160,&quot;335559740&quot;:259}">&nbsp;</span></p>
            <p><strong><span data-contrast="auto">3 Username</span></strong><span data-ccp-props="{&quot;201341983&quot;:0,&quot;335559739&quot;:160,&quot;335559740&quot;:259}">&nbsp;</span></p>
            <p><span data-ccp-props="{&quot;201341983&quot;:0,&quot;335559739&quot;:160,&quot;335559740&quot;:259}">&nbsp;</span></p>
            <p><strong><span data-contrast="auto">3.1 What is a username and why is one needed?</span></strong><span data-ccp-props="{&quot;201341983&quot;:0,&quot;335559739&quot;:160,&quot;335559740&quot;:259}">&nbsp;</span></p>
            <p><span data-contrast="auto">The username is used to identify and authenticate a user.</span><span data-contrast="auto">&nbsp;</span><span data-contrast="auto">In order to carry out authorisation, each user must have an identifier with which they can be identified</span><span data-contrast="auto">.</span><span data-ccp-props="{&quot;201341983&quot;:0,&quot;335559739&quot;:160,&quot;335559740&quot;:259}">&nbsp;</span></p>
            <p><span data-ccp-props="{&quot;201341983&quot;:0,&quot;335559739&quot;:160,&quot;335559740&quot;:259}">&nbsp;</span></p>
            <p><strong><span data-contrast="auto">3.</span></strong><strong><span data-contrast="auto">2</span></strong><strong><span data-contrast="auto">&nbsp;User responsibility</span></strong><span data-ccp-props="{&quot;201341983&quot;:0,&quot;335559739&quot;:160,&quot;335559740&quot;:259}">&nbsp;</span></p>
            <p><span data-contrast="auto">A user bears liability for damages and criminal responsibility for any harm or damage resulting from the use of the username. The responsibility also applies to situations where the username is used by a party that received the necessary information and tools from the user, whether on purpose or by negligence.</span><span data-ccp-props="{&quot;201341983&quot;:0,&quot;335559739&quot;:160,&quot;335559740&quot;:259}">&nbsp;</span></p>
            <p><span data-ccp-props="{&quot;201341983&quot;:0,&quot;335559739&quot;:160,&quot;335559740&quot;:259}">&nbsp;</span></p>
            <p><strong><span data-contrast="auto">3.</span></strong><strong><span data-contrast="auto">3</span></strong><strong><span data-contrast="auto">&nbsp;Prohibition of disclosure and usage</span></strong><span data-ccp-props="{&quot;201341983&quot;:0,&quot;335559739&quot;:160,&quot;335559740&quot;:259}">&nbsp;</span></p>
            <p><span data-contrast="auto">It is prohibited to disclose one&rsquo;s username to another person or to use someone else&rsquo;s username.</span><span data-ccp-props="{&quot;201341983&quot;:0,&quot;335559739&quot;:160,&quot;335559740&quot;:259}">&nbsp;</span></p>
            <p><span data-ccp-props="{&quot;201341983&quot;:0,&quot;335559739&quot;:160,&quot;335559740&quot;:259}">&nbsp;</span></p>
            <p><strong><span data-contrast="auto">4 Rights and responsibilities of&nbsp;</span></strong><strong><span data-contrast="auto">Service users</span></strong><span data-ccp-props="{&quot;201341983&quot;:0,&quot;335559739&quot;:160,&quot;335559740&quot;:259}">&nbsp;</span></p>
            <p><span data-ccp-props="{&quot;201341983&quot;:0,&quot;335559739&quot;:160,&quot;335559740&quot;:259}">&nbsp;</span></p>
            <p><strong><span data-contrast="auto">4.1 Primary purposes of use</span></strong><span data-ccp-props="{&quot;201341983&quot;:0,&quot;335559739&quot;:160,&quot;335559740&quot;:259}">&nbsp;</span></p>
            <p><span data-contrast="auto">The Service is aimed a</span><span data-contrast="auto">t studying languages and cultures through the&nbsp;</span><span data-contrast="auto">joint&nbsp;</span><span data-contrast="auto">UniTandem</span><span data-contrast="auto">&nbsp;course&nbsp;</span><span data-contrast="auto">of all Finnish universities. The Services is used for finding a study partner and for contacting him/her.</span><span data-contrast="auto">&nbsp;The course is completed according to the instructions in&nbsp;</span><span data-contrast="auto">DigiCampus</span><span data-contrast="auto">&nbsp;Moodle.</span><span data-ccp-props="{&quot;201341983&quot;:0,&quot;335559739&quot;:160,&quot;335559740&quot;:259}">&nbsp;</span></p>
            <p><span data-ccp-props="{&quot;201341983&quot;:0,&quot;335559739&quot;:160,&quot;335559740&quot;:259}">&nbsp;</span></p>
            <p><strong><span data-contrast="auto">4.</span></strong><strong><span data-contrast="auto">2</span></strong><strong><span data-contrast="auto">&nbsp;Prohibited purposes of use</span></strong><span data-ccp-props="{&quot;201341983&quot;:0,&quot;335559739&quot;:160,&quot;335559740&quot;:259}">&nbsp;</span></p>
            <p><span data-contrast="auto">Users must&nbsp;</span><span data-contrast="auto">be respectful</span><span data-contrast="auto">&nbsp;towards other users. The Service is&nbsp;</span><span data-contrast="auto">not for dating</span><span data-contrast="auto">&nbsp;purposes.&nbsp;</span><span data-contrast="auto">Spamming is prohibited.</span><span data-ccp-props="{&quot;201341983&quot;:0,&quot;335559739&quot;:160,&quot;335559740&quot;:259}">&nbsp;</span></p>
            <p><span data-contrast="auto">It is not allowed to use the Service for non-study purposes (i.e. not completing the&nbsp;</span><span data-contrast="auto">UniTandem</span><span data-contrast="auto">&nbsp;course).</span><span data-ccp-props="{&quot;201341983&quot;:0,&quot;335559739&quot;:160,&quot;335559740&quot;:259}">&nbsp;</span></p>
            <p><span data-contrast="auto">Storing, publishing, transmitting or distributing material that is unlawful or against good practice is prohibited.</span><span data-ccp-props="{&quot;201341983&quot;:0,&quot;335559739&quot;:160,&quot;335559740&quot;:259}">&nbsp;</span></p>
            <p><span data-contrast="auto">Use for agitation of all types is prohibited.</span><span data-ccp-props="{&quot;201341983&quot;:0,&quot;335559739&quot;:160,&quot;335559740&quot;:259}">&nbsp;</span></p>
            <p><span data-contrast="auto">Usage authorisations must never be used for any illegal or forbidden activities, such as searching for vulnerabilities in information security, unauthorised decryption of data, copying or modifying network communications, or unauthorised access to&nbsp;</span><span data-contrast="auto">the Service</span><span data-contrast="auto">&nbsp;or preparations thereof.</span><span data-ccp-props="{&quot;201341983&quot;:0,&quot;335559739&quot;:160,&quot;335559740&quot;:259}">&nbsp;</span></p>
            <p><span data-contrast="auto">Parts and features of&nbsp;</span><span data-contrast="auto">the Service</span><span data-contrast="auto">&nbsp;that are not clearly made available for public use must not be used. Such parts and features include tools intended for administration or functions that have been disabled in the system settings.</span><span data-ccp-props="{&quot;201341983&quot;:0,&quot;335559739&quot;:160,&quot;335559740&quot;:259}">&nbsp;</span></p>
            <p><span data-contrast="auto">Unnecessary usage and loading of resources are prohibited.</span><span data-ccp-props="{&quot;201341983&quot;:0,&quot;335559739&quot;:160,&quot;335559740&quot;:259}">&nbsp;</span></p>
            <p><span data-ccp-props="{&quot;201341983&quot;:0,&quot;335559739&quot;:160,&quot;335559740&quot;:259}">&nbsp;</span></p>
            <p><strong><span data-contrast="auto">4.</span></strong><strong><span data-contrast="auto">3</span></strong><strong><span data-contrast="auto">&nbsp;Reporting duty</span></strong><span data-ccp-props="{&quot;201341983&quot;:0,&quot;335559739&quot;:160,&quot;335559740&quot;:259}">&nbsp;</span></p>
            <p><span data-contrast="auto">A report must be made immediately if a breach of information security or data protection is detected or suspected. The report must be submitted to:</span><span data-contrast="auto">&nbsp;info (at) unitandem.fi</span><span data-contrast="auto">.</span><span data-ccp-props="{&quot;201341983&quot;:0,&quot;335559739&quot;:160,&quot;335559740&quot;:259}">&nbsp;</span></p>
            <p><span data-ccp-props="{&quot;201341983&quot;:0,&quot;335559739&quot;:160,&quot;335559740&quot;:259}">&nbsp;</span></p>
            <p><strong><span data-contrast="auto">4.4</span></strong><span data-contrast="auto">&nbsp;</span><strong><span data-contrast="auto">Prohibition of phishing</span></strong><span data-ccp-props="{&quot;201341983&quot;:0,&quot;335559739&quot;:160,&quot;335559740&quot;:259}">&nbsp;</span></p>
            <p><span data-contrast="auto">Phishing, abuse, copying and distribution of other users' private information is forbidden.</span><span data-ccp-props="{&quot;201341983&quot;:0,&quot;335559739&quot;:160,&quot;335559740&quot;:259}">&nbsp;</span></p>
            <p><span data-ccp-props="{&quot;201341983&quot;:0,&quot;335559739&quot;:160,&quot;335559740&quot;:259}">&nbsp;</span></p>
            <p><strong><span data-contrast="auto">4.</span></strong><strong><span data-contrast="auto">5</span></strong><strong><span data-contrast="auto">&nbsp;Safe storage and use of passwords</span></strong><span data-ccp-props="{&quot;201341983&quot;:0,&quot;335559739&quot;:160,&quot;335559740&quot;:259}">&nbsp;</span></p>
            <p><span data-contrast="auto">Each user is under an obligation to keep their username and the connected password safe and use it in such a manner that they do not come to anyone else&rsquo;s knowledge. You must never disclose your password to anyone.</span><span data-ccp-props="{&quot;201341983&quot;:0,&quot;335559739&quot;:160,&quot;335559740&quot;:259}">&nbsp;</span></p>
            <p><span data-contrast="auto">It is prohibited to use the password used in the&nbsp;</span><span data-contrast="auto">S</span><span data-contrast="auto">ervice for any other service.</span><span data-ccp-props="{&quot;201341983&quot;:0,&quot;335559739&quot;:160,&quot;335559740&quot;:259}">&nbsp;</span></p>
            <p><span data-ccp-props="{&quot;201341983&quot;:0,&quot;335559739&quot;:160,&quot;335559740&quot;:259}">&nbsp;</span></p>
            <p><strong><span data-contrast="auto">4.</span></strong><strong><span data-contrast="auto">6</span></strong><strong><span data-contrast="auto">&nbsp;Restrictions on the use of&nbsp;</span></strong><strong><span data-contrast="auto">the</span></strong><strong><span data-contrast="auto">&nbsp;</span></strong><strong><span data-contrast="auto">S</span></strong><strong><span data-contrast="auto">ervice</span></strong><span data-ccp-props="{&quot;201341983&quot;:0,&quot;335559739&quot;:160,&quot;335559740&quot;:259}">&nbsp;</span></p>
            <p><span data-contrast="auto">The&nbsp;</span><span data-contrast="auto">service administrators</span><span data-contrast="auto">&nbsp;</span><span data-contrast="auto">are</span><span data-contrast="auto">&nbsp;entitled to restrict or revoke the right to use&nbsp;</span><span data-contrast="auto">the Service</span><span data-contrast="auto">&nbsp;as a precaution.</span><span data-ccp-props="{&quot;201341983&quot;:0,&quot;335559739&quot;:160,&quot;335559740&quot;:259}">&nbsp;</span></p>
            <p><span data-ccp-props="{&quot;201341983&quot;:0,&quot;335559739&quot;:160,&quot;335559740&quot;:259}">&nbsp;</span></p>
            <p><strong><span data-contrast="auto">4.7 Availability of the Service</span></strong><span data-ccp-props="{&quot;201341983&quot;:0,&quot;335559739&quot;:160,&quot;335559740&quot;:259}">&nbsp;</span></p>
            <p><span data-contrast="auto">The Service administrators</span><span data-contrast="auto">&nbsp;disclaim all responsibility and liability for the availability, timeliness, security or reliability of the&nbsp;</span><span data-contrast="auto">Service</span><span data-contrast="auto">&nbsp;or&nbsp;</span><span data-contrast="auto">the</span><span data-contrast="auto">&nbsp;content provided through the Service.&nbsp;</span><span data-contrast="auto">The Service administrators</span><span data-contrast="auto">&nbsp;reserve the right to modify, suspend, or discontinue the&nbsp;</span><span data-contrast="auto">S</span><span data-contrast="auto">ervice or access to the&nbsp;</span><span data-contrast="auto">S</span><span data-contrast="auto">ervice without any notice at any time and without any liability to&nbsp;</span><span data-contrast="auto">the user</span><span data-contrast="auto">.</span><span data-ccp-props="{&quot;201341983&quot;:0,&quot;335559739&quot;:160,&quot;335559740&quot;:259}">&nbsp;</span></p>
        </DialogContent>
        <DialogActions style={{justifyContent: 'center'}}> 
          <Button autoFocus onClick={handleClose} color="primary" align="center">
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}