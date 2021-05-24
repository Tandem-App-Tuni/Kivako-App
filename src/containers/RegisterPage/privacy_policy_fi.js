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

export default function TermsFinnishDialog() {
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
              Avaa ehdot
            </Button>
        </div>

      <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
              UNITANDEM TIETOSUOJASELOSTE 
        </DialogTitle>
        <DialogContent dividers>
        <br></br>
            <Typography variant='subtitle1' align='left' gutterBottom> <b>Palvelun nimi </b></Typography>
            <Typography variant='body' gutterBottom>UniTandem-sivusto </Typography>
            <br></br>
            <Typography variant='subtitle1' align='left' gutterBottom> <b>Palvelun kuvaus </b> </Typography>
            <Typography variant='body' gutterBottom> Suomalaisille korkeakouluopiskelijoille tarkoitetun kielten ja kulttuurin vertaisoppimiskurssin sivusto. </Typography>
            <br></br>
            <Typography variant='subtitle1' align='left' gutterBottom> <b>Henkilörekisterin rekisterinpitäjät ja yhteyshenkilöt </b> </Typography>
            <Typography variant='body' gutterBottom> 
              Tampereen korkeakouluyhteisö <br></br>
              Henri Annala, Emmanuel Abruquah<br></br>
              info (at) unitandem.fi<br></br>
              http://www.tuni.fi/en <br></br>
              Tampereen yliopisto,Kalevantie 4, 33100 Tampereen yliopisto , puh. 0294 5211 
            </Typography>
            <br></br>
            <Typography variant='subtitle1' align='left' gutterBottom> <b>Hallintoalue</b> </Typography>
            <Typography variant='body' gutterBottom> Suomi</Typography>
            <br></br>
            <Typography variant='subtitle1' align='left' gutterBottom> <b>Käsiteltävät henkilötiedot </b> </Typography>
            <Typography variant='body' gutterBottom>
              Palvelun lokitiedostoissa olevia tietoja käsitellään teknisten ongelmien ratkaisemiseksi, palvelun turvallisuuden takaamiseksi sekä yleisten tilastotietojen keräämiseksi 
              <br></br>
              Sivusto tallentaa ja käsittelee seuraavia HAKA-kirjautumisen kautta saatavia henkilötietoja: nimi, rooli (esim. opiskelija/henkilökunta), korkeakoulu, sähköpostiosoite, käyttäjän valokuva (jos saatavilla).
            </Typography>
            <br></br>
            <Typography variant='subtitle1' align='left' gutterBottom> <b>Säännönmukaiset tietolähteet </b> </Typography>
            <Typography variant='body' gutterBottom>Henkilötietoja ei luovuteta kolmansille osapuolille.  </Typography>
            <br></br>
            <Typography variant='subtitle1' align='left' gutterBottom> <b>Henkilötietojen saanti, oikaisu ja poistaminen </b> </Typography>
            <Typography variant='body' gutterBottom> Kaikissa tapauksissa otettava yhteys rekisterin pitäjään.  </Typography>
            <br></br>
            <Typography variant='subtitle1' align='left' gutterBottom> <b>Tietojen säilytys </b> </Typography>
            <Typography variant='body' gutterBottom> Kaikki tallennetut tiedot poistetaan vuoden kuluttua käyttäjän viimeisestä kirjautumisesta palveluun.  </Typography>
            <br></br>
            <Typography variant='subtitle1' align='left' gutterBottom> <b>Tietosuojakäytäntö </b> </Typography>
            <Typography variant='body' gutterBottom>Henkilötietojen suojaamiseksi on sitouduttu noudattamaan seuraavaa tietosuojakäytäntöä: Code of Conduct for Service Providers (http://www.geant.net/uri/dataprotection-code-of-conduct/v1/Pages/default.aspx) </Typography>
            <br></br>
            <Typography variant='subtitle1' align='left' gutterBottom> <b>Tilastointi </b> </Typography>
            <Typography variant='body' gutterBottom>UniTandem käyttää omia evästeitään kerätäkseen käyttötietoja sivustostaan. Kerättyjä tietoja käytetään palvelun parantamiseksi. Tietoja ei luovuteta kolmansille osapuolille. </Typography>
            <br></br>
            <p><strong><span data-contrast="auto">UNITANDEMIN K&Auml;YTT&Ouml;EHDOT</span></strong><span data-ccp-props="{&quot;201341983&quot;:0,&quot;335559739&quot;:160,&quot;335559740&quot;:259}">&nbsp;</span></p>
            <p><span data-ccp-props="{&quot;201341983&quot;:0,&quot;335559739&quot;:160,&quot;335559740&quot;:259}">&nbsp;</span></p>
            <p><strong><span data-contrast="auto">1 Soveltamisala</span></strong><span data-ccp-props="{&quot;201341983&quot;:0,&quot;335559739&quot;:160,&quot;335559740&quot;:259}">&nbsp;</span></p>
            <p><span data-ccp-props="{&quot;201341983&quot;:0,&quot;335559739&quot;:160,&quot;335559740&quot;:259}">&nbsp;</span></p>
            <p><strong><span data-contrast="auto">1.1 Ket&auml; s&auml;&auml;nn&ouml;t koskevat?</span></strong><span data-ccp-props="{&quot;201341983&quot;:0,&quot;335559739&quot;:160,&quot;335559740&quot;:259}">&nbsp;</span></p>
            <p><span data-contrast="auto">K&auml;ytt&ouml;s&auml;&auml;nn&ouml;t sitovat ja velvoittavat kaikkia&nbsp;</span><span data-contrast="auto">UniTandem</span><span data-contrast="auto">-sivuston</span><span data-contrast="auto">&nbsp;(jatkossa Palvelu)</span><span data-contrast="auto">&nbsp;k&auml;ytt&auml;ji&auml;</span><span data-contrast="auto">.</span><span data-contrast="auto">&nbsp;</span><span data-contrast="auto">P</span><span data-contrast="auto">alvelun k&auml;ytt&auml;minen&nbsp;</span><span data-contrast="auto">suomalaisen korkeakoulun s&auml;hk&ouml;postiosoitteella</span><span data-contrast="auto">&nbsp;on merkki siit&auml;, ett&auml; k&auml;ytt&auml;j&auml; on hyv&auml;ksynyt k&auml;ytt&ouml;ehdot ja sitoutuu noudattamaan niit&auml;.</span><span data-ccp-props="{&quot;201341983&quot;:0,&quot;335559739&quot;:160,&quot;335559740&quot;:259}">&nbsp;</span></p>
            <p><span data-ccp-props="{&quot;201341983&quot;:0,&quot;335559739&quot;:160,&quot;335559740&quot;:259}">&nbsp;</span></p>
            <p><strong><span data-contrast="auto">1.2 Muut k&auml;ytt&ouml;&auml; koskevat normit</span></strong><span data-ccp-props="{&quot;201341983&quot;:0,&quot;335559739&quot;:160,&quot;335559740&quot;:259}">&nbsp;</span></p>
            <p><span data-contrast="auto">N&auml;iden k&auml;ytt&ouml;s&auml;&auml;nt&ouml;jen&nbsp;</span><span data-contrast="auto">lis&auml;ksi&nbsp;</span><span data-contrast="auto">P</span><span data-contrast="auto">alvelua</span><span data-contrast="auto">&nbsp;k&auml;ytett&auml;ess&auml; on noudatettava</span><span data-contrast="auto">:</span><span data-ccp-props="{&quot;201341983&quot;:0,&quot;335559739&quot;:160,&quot;335559740&quot;:259}">&nbsp;</span></p>
            <ul>
            <li data-leveltext="" data-font="Symbol" data-listid="2" data-aria-posinset="1" data-aria-level="1"><span data-contrast="auto">Suomessa voimassa olevaa lains&auml;&auml;d&auml;nt&ouml;&auml;,</span><span data-ccp-props="{&quot;134233279&quot;:true,&quot;201341983&quot;:0,&quot;335559739&quot;:160,&quot;335559740&quot;:259}">&nbsp;</span></li>
            <li data-leveltext="" data-font="Symbol" data-listid="2" data-aria-posinset="2" data-aria-level="1"><span data-contrast="auto">Palvelun tietosuojaselostetta</span><span data-contrast="auto">&nbsp;ja muita palvelun k&auml;ytt&ouml;&ouml;n soveltuvia politiikkoja sek&auml;</span><span data-ccp-props="{&quot;134233279&quot;:true,&quot;201341983&quot;:0,&quot;335559739&quot;:160,&quot;335559740&quot;:259}">&nbsp;</span></li>
            <li data-leveltext="" data-font="Symbol" data-listid="2" data-aria-posinset="3" data-aria-level="1"><span data-contrast="auto">n&auml;it&auml; t&auml;ydent&auml;vi&auml; yleisi&auml; ja palvelukohtaisia s&auml;&auml;nt&ouml;j&auml; ja ohjeita.</span><span data-ccp-props="{&quot;134233279&quot;:true,&quot;201341983&quot;:0,&quot;335559739&quot;:160,&quot;335559740&quot;:259}">&nbsp;</span></li>
            </ul>
            <p><span data-ccp-props="{&quot;201341983&quot;:0,&quot;335559739&quot;:160,&quot;335559740&quot;:259}">&nbsp;</span></p>
            <p><strong><span data-contrast="auto">2 K&auml;ytt&ouml;valtuus</span></strong><span data-ccp-props="{&quot;201341983&quot;:0,&quot;335559739&quot;:160,&quot;335559740&quot;:259}">&nbsp;</span></p>
            <p><span data-ccp-props="{&quot;201341983&quot;:0,&quot;335559739&quot;:160,&quot;335559740&quot;:259}">&nbsp;</span></p>
            <p><strong><span data-contrast="auto">2.1 Mik&auml; on k&auml;ytt&ouml;valtuus?</span></strong><span data-ccp-props="{&quot;201341983&quot;:0,&quot;335559739&quot;:160,&quot;335559740&quot;:259}">&nbsp;</span></p>
            <p><span data-contrast="auto">Julkisen avoimesti k&auml;ytett&auml;v&auml;n palvelun k&auml;ytt&ouml;valtuus on kaikilla internetin k&auml;ytt&auml;jill&auml;. Muut palvelut on tarkoitettu rajatulle k&auml;ytt&auml;j&auml;ryhmille ja edellytt&auml;v&auml;t k&auml;ytt&auml;j&auml;n tunnistamista ja asianmukaisesti my&ouml;nnetty&auml; k&auml;ytt&ouml;valtuutta.</span><span data-ccp-props="{&quot;201341983&quot;:0,&quot;335559739&quot;:160,&quot;335559740&quot;:259}">&nbsp;</span></p>
            <p><span data-contrast="auto">K&auml;ytt&ouml;valtuus on&nbsp;</span><span data-contrast="auto">t&auml;ss&auml; tapauksessa&nbsp;</span><span data-contrast="auto">oikeus k&auml;ytt&auml;&auml;&nbsp;</span><span data-contrast="auto">Palvelua</span><span data-contrast="auto">. Usein k&auml;ytt&ouml;valtuudesta puhuttaessa k&auml;ytet&auml;&auml;n sanaa &rdquo;k&auml;ytt&ouml;oikeus&rdquo;.</span><span data-ccp-props="{&quot;201341983&quot;:0,&quot;335559739&quot;:160,&quot;335559740&quot;:259}">&nbsp;</span></p>
            <p><span data-contrast="auto">K&auml;ytt&ouml;valtuu</span><span data-contrast="auto">den kesto on sama kuin k&auml;ytt&auml;j&auml;n opiskeluoikeuden kesto.</span><span data-ccp-props="{&quot;201341983&quot;:0,&quot;335559739&quot;:160,&quot;335559740&quot;:259}">&nbsp;</span></p>
            <p><span data-contrast="auto">K&auml;ytt&ouml;valtuus on henkil&ouml;kohtainen.</span><span data-ccp-props="{&quot;201341983&quot;:0,&quot;335559739&quot;:160,&quot;335559740&quot;:259}">&nbsp;</span></p>
            <p><span data-ccp-props="{&quot;201341983&quot;:0,&quot;335559739&quot;:160,&quot;335559740&quot;:259}">&nbsp;</span></p>
            <p><strong><span data-contrast="auto">2.2 K&auml;ytt&ouml;valtuuden my&ouml;nt&auml;misen peruste</span></strong><span data-ccp-props="{&quot;201341983&quot;:0,&quot;335559739&quot;:160,&quot;335559740&quot;:259}">&nbsp;</span></p>
            <p><span data-contrast="auto">K&auml;ytt&ouml;valtuus my&ouml;nnet&auml;&auml;n automaattisesti, jos k&auml;ytt&auml;j&auml;ll&auml; on suomalaisen korkeakoulun k&auml;ytt&auml;j&auml;tunnus.&nbsp;</span><span data-ccp-props="{&quot;201341983&quot;:0,&quot;335559739&quot;:160,&quot;335559740&quot;:259}">&nbsp;</span></p>
            <p><span data-ccp-props="{&quot;201341983&quot;:0,&quot;335559739&quot;:160,&quot;335559740&quot;:259}">&nbsp;</span></p>
            <p><strong><span data-contrast="auto">2.3 K&auml;ytt&ouml;valtuuden rajoittaminen</span></strong><span data-ccp-props="{&quot;201341983&quot;:0,&quot;335559739&quot;:160,&quot;335559740&quot;:259}">&nbsp;</span></p>
            <p><span data-contrast="auto">K&auml;ytt&ouml;valtuutta voidaan rajoittaa, jos siihen liittyen on perusteltu ep&auml;ily tietoturvallisuuden vaarantumisesta tai v&auml;&auml;rink&auml;yt&ouml;st&auml;.</span><span data-ccp-props="{&quot;201341983&quot;:0,&quot;335559739&quot;:160,&quot;335559740&quot;:259}">&nbsp;</span></p>
            <p><span data-ccp-props="{&quot;201341983&quot;:0,&quot;335559739&quot;:160,&quot;335559740&quot;:259}">&nbsp;</span></p>
            <p><strong><span data-contrast="auto">2.4 K&auml;ytt&ouml;valtuuden alkaminen</span></strong><span data-ccp-props="{&quot;201341983&quot;:0,&quot;335559739&quot;:160,&quot;335559740&quot;:259}">&nbsp;</span></p>
            <p><span data-contrast="auto">K&auml;ytt&ouml;valtuus alkaa, kun&nbsp;</span><span data-contrast="auto">k&auml;ytt&auml;j&auml; saa suomalaisen korkeakoulun k&auml;ytt&auml;j&auml;tunnuksen.</span><span data-ccp-props="{&quot;201341983&quot;:0,&quot;335559739&quot;:160,&quot;335559740&quot;:259}">&nbsp;</span></p>
            <p><span data-ccp-props="{&quot;201341983&quot;:0,&quot;335559739&quot;:160,&quot;335559740&quot;:259}">&nbsp;</span></p>
            <p><strong><span data-contrast="auto">2.5 K&auml;ytt&ouml;valtuuden p&auml;&auml;ttyminen</span></strong><span data-ccp-props="{&quot;201341983&quot;:0,&quot;335559739&quot;:160,&quot;335559740&quot;:259}">&nbsp;</span></p>
            <p><span data-contrast="auto">K&auml;ytt&ouml;valtuus p&auml;&auml;ttyy, kun&nbsp;</span><span data-contrast="auto">k&auml;ytt&auml;j&auml;n opinnot suomalaisessa korkeakoulussa p&auml;&auml;ttyv&auml;t.</span><span data-ccp-props="{&quot;201341983&quot;:0,&quot;335559739&quot;:160,&quot;335559740&quot;:259}">&nbsp;</span></p>
            <p><span data-ccp-props="{&quot;201341983&quot;:0,&quot;335559739&quot;:160,&quot;335559740&quot;:259}">&nbsp;</span></p>
            <p><strong><span data-contrast="auto">2.6 K&auml;ytt&auml;j&auml;n vastuu k&auml;ytt&ouml;valtuuden p&auml;&auml;ttyess&auml;</span></strong><span data-ccp-props="{&quot;201341983&quot;:0,&quot;335559739&quot;:160,&quot;335559740&quot;:259}">&nbsp;</span></p>
            <p><span data-contrast="auto">K&auml;ytt&auml;j&auml;n tulee ottaa talteen tarvitsemansa henkil&ouml;kohtaiset tiedot</span><span data-contrast="auto">&nbsp;(esim. keskusteluhistoria)</span><span data-contrast="auto">&nbsp;ennen palvelun k&auml;ytt&auml;j&auml;tunnusten sulkemista.&nbsp;</span><span data-ccp-props="{&quot;201341983&quot;:0,&quot;335559739&quot;:160,&quot;335559740&quot;:259}">&nbsp;</span></p>
            <p><span data-ccp-props="{&quot;201341983&quot;:0,&quot;335559739&quot;:160,&quot;335559740&quot;:259}">&nbsp;</span></p>
            <p><strong><span data-contrast="auto">3 K&auml;ytt&auml;j&auml;tunnus</span></strong><span data-ccp-props="{&quot;201341983&quot;:0,&quot;335559739&quot;:160,&quot;335559740&quot;:259}">&nbsp;</span></p>
            <p><span data-ccp-props="{&quot;201341983&quot;:0,&quot;335559739&quot;:160,&quot;335559740&quot;:259}">&nbsp;</span></p>
            <p><strong><span data-contrast="auto">3.1 Mik&auml; k&auml;ytt&auml;j&auml;tunnus on ja mihin sit&auml; tarvitaan?</span></strong><span data-ccp-props="{&quot;201341983&quot;:0,&quot;335559739&quot;:160,&quot;335559740&quot;:259}">&nbsp;</span></p>
            <p><span data-contrast="auto">K&auml;ytt&auml;j&auml; tunnistetaan (identifioidaan, autentikoidaan) k&auml;ytt&auml;j&auml;tunnuksen perusteella.</span><span data-contrast="auto">&nbsp;</span><span data-contrast="auto">K&auml;ytt&ouml;valtuuksien toteuttamiseksi jokaisella k&auml;ytt&auml;j&auml;ll&auml; tulee olla yksil&ouml;iv&auml; tunniste</span><span data-contrast="auto">.</span><span data-ccp-props="{&quot;201341983&quot;:0,&quot;335559739&quot;:160,&quot;335559740&quot;:259}">&nbsp;</span></p>
            <p><span data-ccp-props="{&quot;201341983&quot;:0,&quot;335559739&quot;:160,&quot;335559740&quot;:259}">&nbsp;</span></p>
            <p><strong><span data-contrast="auto">3.</span></strong><strong><span data-contrast="auto">2</span></strong><strong><span data-contrast="auto">&nbsp;K&auml;ytt&auml;j&auml;n vastuu</span></strong><span data-ccp-props="{&quot;201341983&quot;:0,&quot;335559739&quot;:160,&quot;335559740&quot;:259}">&nbsp;</span></p>
            <p><span data-contrast="auto">K&auml;ytt&auml;j&auml; on vahingonkorvaus- ja rikosoikeudellisessa vastuussa tunnuksen k&auml;yt&ouml;n aiheuttamasta haitasta tai vahingosta. Vastuu koskee my&ouml;s tilanteita, joissa tunnusta k&auml;ytt&auml;&auml; sivullinen, jolle henkil&ouml; on tahallisesti tai huolimattomuuttaan luovuttanut tunnuksen k&auml;ytt&ouml;&ouml;n tarvittavat tiedot tai v&auml;lineet.</span><span data-ccp-props="{&quot;201341983&quot;:0,&quot;335559739&quot;:160,&quot;335559740&quot;:259}">&nbsp;</span></p>
            <p><span data-ccp-props="{&quot;201341983&quot;:0,&quot;335559739&quot;:160,&quot;335559740&quot;:259}">&nbsp;</span></p>
            <p><strong><span data-contrast="auto">3.</span></strong><strong><span data-contrast="auto">3</span></strong><strong><span data-contrast="auto">&nbsp;Luovutus- ja k&auml;ytt&ouml;kielto</span></strong><span data-ccp-props="{&quot;201341983&quot;:0,&quot;335559739&quot;:160,&quot;335559740&quot;:259}">&nbsp;</span></p>
            <p><span data-contrast="auto">K&auml;ytt&auml;j&auml;tunnusta ei saa antaa toisen henkil&ouml;n k&auml;ytt&ouml;&ouml;n, eik&auml; toisen henkil&ouml;n tunnuksen k&auml;ytt&auml;minen ole luvallista.</span><span data-ccp-props="{&quot;201341983&quot;:0,&quot;335559739&quot;:160,&quot;335559740&quot;:259}">&nbsp;</span></p>
            <p><span data-ccp-props="{&quot;201341983&quot;:0,&quot;335559739&quot;:160,&quot;335559740&quot;:259}">&nbsp;</span></p>
            <p><strong><span data-contrast="auto">4&nbsp;</span></strong><strong><span data-contrast="auto">P</span></strong><strong><span data-contrast="auto">alvelun k&auml;ytt&auml;jien oikeudet ja vastuut</span></strong><span data-ccp-props="{&quot;201341983&quot;:0,&quot;335559739&quot;:160,&quot;335559740&quot;:259}">&nbsp;</span></p>
            <p><span data-ccp-props="{&quot;201341983&quot;:0,&quot;335559739&quot;:160,&quot;335559740&quot;:259}">&nbsp;</span></p>
            <p><strong><span data-contrast="auto">4.1 P&auml;&auml;asialliset k&auml;ytt&ouml;tarkoitukset</span></strong><span data-ccp-props="{&quot;201341983&quot;:0,&quot;335559739&quot;:160,&quot;335559740&quot;:259}">&nbsp;</span></p>
            <p><span data-contrast="auto">Palvelu on tarkoitettu kielten ja kulttuurien opiskeluun suomalaisten korkeakoulujen yhteisen&nbsp;</span><span data-contrast="auto">UniTandem</span><span data-contrast="auto">-kurssin kautta.&nbsp;</span><span data-contrast="auto">Palvelua k&auml;ytet&auml;&auml;n opiskeluparin l&ouml;yt&auml;miseen ja yhteydenpitoon h&auml;nen kanssaan.&nbsp;</span><span data-contrast="auto">Kurss</span><span data-contrast="auto">i suoritetaan&nbsp;</span><span data-contrast="auto">DigiCampus</span><span data-contrast="auto">-Moodlessa olevien ohjeiden avulla.</span><span data-ccp-props="{&quot;201341983&quot;:0,&quot;335559739&quot;:160,&quot;335559740&quot;:259}">&nbsp;</span></p>
            <p><span data-ccp-props="{&quot;201341983&quot;:0,&quot;335559739&quot;:160,&quot;335559740&quot;:259}">&nbsp;</span></p>
            <p><strong><span data-contrast="auto">4.</span></strong><strong><span data-contrast="auto">2</span></strong><strong><span data-contrast="auto">&nbsp;Kielletyt k&auml;ytt&ouml;tarkoitukset</span></strong><span data-ccp-props="{&quot;201341983&quot;:0,&quot;335559739&quot;:160,&quot;335559740&quot;:259}">&nbsp;</span></p>
            <p><span data-contrast="auto">K&auml;ytt&auml;jien tulee&nbsp;</span><span data-contrast="auto">kohdella toisia k&auml;ytt&auml;ji&auml; kun</span><span data-contrast="auto">nioittavasti.&nbsp;</span><span data-contrast="auto">Palvelu ei ole tarkoitettu seuranhakuun.&nbsp;</span><span data-contrast="auto">Roskapostit</span><span data-contrast="auto">us</span><span data-contrast="auto">&nbsp;on kielletty.&nbsp;</span><span data-ccp-props="{&quot;201341983&quot;:0,&quot;335559739&quot;:160,&quot;335559740&quot;:259}">&nbsp;</span></p>
            <p><span data-contrast="auto">Palvelua ei ole sallittu k&auml;ytt&auml;&auml; ei-opinnollisiin tarkoituksiin (ts. muuhun kuin&nbsp;</span><span data-contrast="auto">UniTandem</span><span data-contrast="auto">-kurssin suorittamiseen).</span><span data-ccp-props="{&quot;201341983&quot;:0,&quot;335559739&quot;:160,&quot;335559740&quot;:259}">&nbsp;</span></p>
            <p><span data-contrast="auto">Laitonta tai hyv&auml;n tavan vastaista materiaalia ei saa tallentaa, julkaista, v&auml;litt&auml;&auml; eik&auml; jaella.</span><span data-ccp-props="{&quot;201341983&quot;:0,&quot;335559739&quot;:160,&quot;335559740&quot;:259}">&nbsp;</span></p>
            <p><span data-contrast="auto">K&auml;ytt&ouml; kaikkeen julistavaan toimintaan on kielletty.</span><span data-ccp-props="{&quot;201341983&quot;:0,&quot;335559739&quot;:160,&quot;335559740&quot;:259}">&nbsp;</span></p>
            <p><span data-contrast="auto">Mit&auml;&auml;n k&auml;ytt&ouml;valtuutta ei saa k&auml;ytt&auml;&auml; laittomaan tai luvattomaan toimintaan, kuten esimerkiksi tietoturva-aukkojen etsimiseen, oikeudettomaan salauksen purkamiseen, tietoliikenteen kopiointiin tai muuttamiseen, tai tietoj&auml;rjestelmiin tunkeutumiseen tai sen valmistelemiseen.</span><span data-ccp-props="{&quot;201341983&quot;:0,&quot;335559739&quot;:160,&quot;335559740&quot;:259}">&nbsp;</span></p>
            <p><span data-contrast="auto">Tietoj&auml;rjestelmien osia tai piirteit&auml;, joita ei ole selke&auml;sti tuotu yleisesti k&auml;ytett&auml;viksi, ei saa k&auml;ytt&auml;&auml;. T&auml;llaisia ovat esimerkiksi yll&auml;pitoon tarkoitetut ty&ouml;kalut tai j&auml;rjestelm&auml;n asetuksilla estetyt toiminnot.</span><span data-ccp-props="{&quot;201341983&quot;:0,&quot;335559739&quot;:160,&quot;335559740&quot;:259}">&nbsp;</span></p>
            <p><span data-contrast="auto">Resurssien tarpeeton k&auml;ytt&ouml; ja kuormittaminen on kielletty.</span><span data-ccp-props="{&quot;201341983&quot;:0,&quot;335559739&quot;:160,&quot;335559740&quot;:259}">&nbsp;</span></p>
            <p><span data-ccp-props="{&quot;201341983&quot;:0,&quot;335559739&quot;:160,&quot;335559740&quot;:259}">&nbsp;</span></p>
            <p><strong><span data-contrast="auto">4.</span></strong><strong><span data-contrast="auto">3</span></strong><strong><span data-contrast="auto">&nbsp;Ilmoitusvelvollisuus</span></strong><span data-ccp-props="{&quot;201341983&quot;:0,&quot;335559739&quot;:160,&quot;335559740&quot;:259}">&nbsp;</span></p>
            <p><span data-contrast="auto">Havaituista tai ep&auml;illyist&auml; v&auml;&auml;rink&auml;yt&ouml;ksist&auml; ja tietoturvallisuuden tai tietosuojan puutteista tulee viipym&auml;tt&auml; ilmoittaa osoitteella&nbsp;</span><span data-contrast="auto">info (at) unitandem.fi</span><span data-contrast="auto">.</span><span data-ccp-props="{&quot;201341983&quot;:0,&quot;335559739&quot;:160,&quot;335559740&quot;:259}">&nbsp;</span></p>
            <p><span data-ccp-props="{&quot;201341983&quot;:0,&quot;335559739&quot;:160,&quot;335559740&quot;:259}">&nbsp;</span></p>
            <p><strong><span data-contrast="auto">4.</span></strong><strong><span data-contrast="auto">4</span></strong><strong><span data-contrast="auto">&nbsp;Urkkimiskielto</span></strong><span data-ccp-props="{&quot;201341983&quot;:0,&quot;335559739&quot;:160,&quot;335559740&quot;:259}">&nbsp;</span></p>
            <p><span data-contrast="auto">Muille kuuluvien tietojen urkkiminen, hyv&auml;ksik&auml;ytt&ouml;, talteenotto ja levitt&auml;minen on kielletty.</span><span data-ccp-props="{&quot;201341983&quot;:0,&quot;335559739&quot;:160,&quot;335559740&quot;:259}">&nbsp;</span></p>
            <p><span data-ccp-props="{&quot;201341983&quot;:0,&quot;335559739&quot;:160,&quot;335559740&quot;:259}">&nbsp;</span></p>
            <p><strong><span data-contrast="auto">4.</span></strong><strong><span data-contrast="auto">5</span></strong><strong><span data-contrast="auto">&nbsp;Salasanojen huolellinen s&auml;ilytt&auml;minen ja k&auml;ytt&ouml;</span></strong><span data-ccp-props="{&quot;201341983&quot;:0,&quot;335559739&quot;:160,&quot;335559740&quot;:259}">&nbsp;</span></p>
            <p><span data-contrast="auto">Jokainen on velvollinen s&auml;ilytt&auml;m&auml;&auml;n ja k&auml;ytt&auml;m&auml;&auml;n k&auml;ytt&auml;j&auml;tunnukseensa liittyv&auml;&auml; salasanaa niin, ett&auml; se ei tule kenenk&auml;&auml;n toisen henkil&ouml;n tietoon. Salasanaa ei koskaan pid&auml; kertoa kenellek&auml;&auml;n.</span><span data-ccp-props="{&quot;201341983&quot;:0,&quot;335559739&quot;:160,&quot;335559740&quot;:259}">&nbsp;</span></p>
            <p><span data-contrast="auto">P</span><span data-contrast="auto">alvelussa k&auml;ytett&auml;v</span><span data-contrast="auto">&auml;</span><span data-contrast="auto">&auml; salasan</span><span data-contrast="auto">a</span><span data-contrast="auto">a ei saa k&auml;ytt&auml;&auml; muissa palveluissa.</span><span data-ccp-props="{&quot;201341983&quot;:0,&quot;335559739&quot;:160,&quot;335559740&quot;:259}">&nbsp;</span></p>
            <p><span data-ccp-props="{&quot;201341983&quot;:0,&quot;335559739&quot;:160,&quot;335559740&quot;:259}">&nbsp;</span></p>
            <p><strong><span data-contrast="auto">4.</span></strong><strong><span data-contrast="auto">6</span></strong><strong><span data-contrast="auto">&nbsp;</span></strong><strong><span data-contrast="auto">Palvelun</span></strong><strong><span data-contrast="auto">&nbsp;k&auml;yt&ouml;n rajoittaminen</span></strong><span data-ccp-props="{&quot;201341983&quot;:0,&quot;335559739&quot;:160,&quot;335559740&quot;:259}">&nbsp;</span></p>
            <p><span data-contrast="auto">Palvelun yll&auml;pit&auml;jill&auml;</span><span data-contrast="auto">&nbsp;on oikeus suojatoimena rajoittaa tai est&auml;&auml;&nbsp;</span><span data-contrast="auto">Palvelun</span><span data-contrast="auto">&nbsp;k&auml;ytt&ouml;&auml;.</span><span data-ccp-props="{&quot;201341983&quot;:0,&quot;335559739&quot;:160,&quot;335559740&quot;:259}">&nbsp;</span></p>
            <p><span data-ccp-props="{&quot;201341983&quot;:0,&quot;335559739&quot;:160,&quot;335559740&quot;:259}">&nbsp;</span></p>
            <p><strong><span data-contrast="auto">4.7 Palvelun saatavuus</span></strong><span data-ccp-props="{&quot;201341983&quot;:0,&quot;335559739&quot;:160,&quot;335559740&quot;:259}">&nbsp;</span></p>
            <p><span data-contrast="auto">Palvelun yll&auml;pit&auml;j&auml;t</span><span data-contrast="auto">&nbsp;ei</span><span data-contrast="auto">v&auml;t</span><span data-contrast="auto">&nbsp;ole vastuussa&nbsp;</span><span data-contrast="auto">Palvelun</span><span data-contrast="auto">&nbsp;tai&nbsp;</span><span data-contrast="auto">sen</span><span data-contrast="auto">&nbsp;sis&auml;ll&ouml;n saatavuudesta, ajantasaisuudesta, turvallisuudesta tai luotettavuudesta.&nbsp;</span><span data-contrast="auto">Palvelun yll&auml;pit&auml;j&auml;t</span><span data-contrast="auto">&nbsp;pid&auml;tt&auml;</span><span data-contrast="auto">v&auml;t</span><span data-contrast="auto">&nbsp;oikeuden muuttaa, keskeytt&auml;&auml; tai lakkauttaa palvelut tai p&auml;&auml;syn palveluihin ilman&nbsp;</span><span data-contrast="auto">erillist&auml; ilmoitusta,</span><span data-contrast="auto">&nbsp;milloin tahansa ja ilman mit&auml;&auml;n velvollisuuksia k&auml;ytt&auml;j&auml;&auml; kohtaan.</span><span data-ccp-props="{&quot;201341983&quot;:0,&quot;335559739&quot;:160,&quot;335559740&quot;:259}">&nbsp;</span></p>
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