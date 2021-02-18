
import React from 'react';

import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import {withStyles} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
import ConstantsList from '../../config_constants';
import NewsCard from '../../components/NewsCard';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import utils from '../../helpers/utils';

import { getApiData } from '../../helpers/networkRequestHelpers';


const styles = ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'flexWrap'
    },
    gridList: {
        flexWrap: 'nowrap',
        transform: 'translateZ(0)',
    },
    fullWidth: {
        width: "100%",
    }
});

class ListOfNews extends React.Component {

    constructor(props)
    {
      super(props);
      this.state = {
        newsList:[],
        isLoadingPage:true,
      };
    }

    getNewsListAPI(callback) {
        getApiData({
            version: 'v1',
            endpoint: 'news'
        }, {
            method: 'GET',
            credentials: 'include',
            cors: 'no-cors'
        }).then((response) => response.json())
            .then((responseJson) => {
                this.setState({ 
                    newsList: responseJson.sort((item, siblingItem) => utils.compareDate(item.updatedAt, siblingItem.updatedAt))     
                })
            }).catch((error) => {
                console.error(error);
            });

        callback();
    }


    componentDidMount() {
        this.getNewsListAPI(() => {
            this.setState({ isLoadingPage: false });
        });
    }

    getNewsTiles(news, classes) {
        return (
            <div className={classes.fullWidth}>
                <GridList cellHeight="auto" spacing={25} className={classes.gridList} cols={2} >
                {
                    news.map((news, key) =>
                    {
                        return(
                            <GridListTile key={key} cols={1} rows={1}>
                                <NewsCard news={news}/>
                            </GridListTile>
                        )
                    }
                )}
                </GridList>
            </div>
            )
    }

    render() {
        const { classes } = this.props;

        //Wait until all informations be render until continue
        if (this.state.isLoadingPage) return null;

        if (this.state.newsList.length === 0) {
            return (
                <div className={classes.root}>
                    <div className={classes.fullWidth} align="center">
                        <Paper>

                            <br></br>
                            <br></br>
                            <br></br>
                            <br></br>
                            <Typography variant="h5" style={{color: '#6c757d'}} gutterBottom>
                                No News yet
                                </Typography>
                            <br></br>
                            <br></br>
                            <br></br>
                        </Paper>
                        <br></br>
                        <br></br>
                        <br></br>
                    </div>
                </div>

            )
        }

        return (
            <div className={classes.root}>
                <ExpansionPanel defaultExpanded={true} style={{width: '111%'}}>
                        <ExpansionPanelSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                        >
                        <Typography variant="h6">
                            Latest News
                        </Typography>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails>
                            { this.getNewsTiles(this.state.newsList, classes) }
                            <br></br>
                            <Divider variant="middle" />
                        </ExpansionPanelDetails>
                </ExpansionPanel>
            </div>
        );
    }
}
ListOfNews.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ListOfNews);