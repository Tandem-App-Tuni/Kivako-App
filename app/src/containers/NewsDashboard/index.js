import React from "react";
import {
	Card,
	CardActionArea,
	CardContent,
	Typography,
	TextField,
	FormControl,
	InputLabel,
	Input,
	Grid,
	Button,
	withStyles 
} from "@material-ui/core";

const useStyles = (theme) => ({
	root: {
		margin: theme.spacing(1),
		padding: "0 8px"
	}
});

class NewsDashboard extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			newsList: [
				{
					title: "String",
					content: "COntent",
					author: "String",
					createdAt: "DateTime",
					updatedAt: "DateTime"
				},
				{
					title: "String",
					content: "COntent",
					author: "String",
					createdAt: "DateTime",
					updatedAt: "DateTime"
				},
				{
					title: "String",
					content: "COntent",
					author: "String",
					createdAt: "DateTime",
					updatedAt: "DateTime"
				},
			]
		}
	}
	render() {
		return <div>
			{this.state.newsList.map((item,index) => {
				return <NewsComponent key={index+new Date()} {...item}/>
			})
			}
		</div>
	}
}

export default NewsDashboard;

const NewsComponent = withStyles(useStyles)(class NewsCard extends React.Component{
	constructor(props) {
		super(props);
		this.state = {
			...props,
			openForm: false
		}
	}
	
	handleChange = (event) => {
		this.setState({[event.target.id]: event.target.value})
	}

	render() {
		let {title, content, updatedAt} = this.state;
		const classes = this.props.classes
		console.log(classes)
		return <Card>
			{this.state.openForm ? 
				<form className={classes.root} noValidate autoComplete="off">
					<TextField
						variant="outlined"
						id="title"
						label="Title"
						value={title}
						fullWidth
						className={classes.textField}
						margin="normal"
						onChange={this.handleChange}
					/>
					<TextField
						variant="outlined"
						id="content"
						label="Content"
						value={content}
						multiline
						fullWidth
						rows="4"
						className={classes.textField}
						maxLength={2000}
						margin="normal"
						onChange={this.handleChange}
					/>
					<Button variant="contained" color="primary" onClick={()=>{this.setState({openForm: false})}}>
						Save
					</Button>
					<Button color="primary" onClick={()=>{this.setState({openForm: false, ...this.props})}}>
						Close
					</Button>
				</form>
				: <CardActionArea onClick={()=>{this.setState({openForm: true})}} >
				<CardContent>
					<Typography gutterBottom color="textSecondary">
						{updatedAt}
					</Typography>
					<Typography gutterBottom variant="h5" component="h2">
						{title}
					</Typography>
					<Typography variant="body2" color="textSecondary" component="p">
						{content}
					</Typography>
				</CardContent>
			</CardActionArea>
			}
		</Card>
	}
})