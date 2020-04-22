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
import {clone} from "ramda";
import MaterialTable from "material-table";

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
			newsList: [],
			tableColumns: [
				{title: "Title",field: "title"},
				{title: "Content",field: "content"},
				{title: "Author",field: "author"},
				{title: "Created at",field: "createdAt"},
				{title: "Updated at",field: "updatedAt"}
			],
			isLoading: true
		}
	}

	componentDidMount() {
		fetch("http://localhost:3000/api/v1/news/",
			{
				method: 'GET',
				credentials: 'include'
			})
			.then(response => response.json())
			.then(responseJson => {
				this.setState({ newsList: responseJson, isLoading: false })
			});
	}

	updateNews = (newData, oldData) => {
		return new Promise((resolve, reject)=> {
			fetch("http://localhost:3000/api/v1/news/"+oldData._id,
				{
					method: 'PUT',
					credentials: 'include',
					headers: {
						"Accept": "application/json",
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						title: newData.title,
						author: newData.author,
						content: newData.content
					})
				}).then(res => res.json())
				.then(res => {
					resolve(res);
				}).catch(err => {
					reject();
				})
				
		})
	}

	render() {
		return <div>
			{/* {this.state.newsList.map((item, index) => {
				return <NewsComponent key={index + new Date()} {...item} onUpdate={this.updateNews}/>
			})
			} */}
			{!this.state.isLoading && 
				<MaterialTable
					columns={this.state.tableColumns}
					data={this.state.newsList}
					editable={{
						onRowAdd: newData =>
							new Promise((resolve, reject) => {
								let {newsList} = clone(this.state)
								newsList.push(newData);
								this.setState({newsList: newsList}, resolve);
							}),
						onRowUpdate: (newData, oldData) =>
							new Promise((resolve, reject) => {
								this.updateNews(newData, oldData)
									.then(res => {
										let {newsList} = clone(this.state);
										let index = newsList.findIndex(item => item._id === res._id)
										newsList[index] = res;
										this.setState({
											newsList: newsList
										}, resolve)
									})
									.catch(reject)
							}),
						onRowDelete: oldData =>
							new Promise((resolve, reject) => {
								setTimeout(() => {
									{
										let data = this.state.newsList;
										const index = data.indexOf(item => item._id === oldData._id);
										data.splice(index, 1);
										this.setState({newsList: data})
									}
									resolve();
								}, 0);
							})
					}}/>
			}
		</div>
	}
}

export default NewsDashboard;

const NewsComponent = withStyles(useStyles)(class NewsCard extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			...props,
			openForm: props._id ? false : true
		}
	}

	handleChange = (event) => {
		this.setState({ [event.target.id]: event.target.value })
	}

	onUpdate = () => {
		let {_id, title, content, createdAt, updatedAt, author} = this.state;
		this.props.onUpdate({
			id: _id,
			title: title,
			content: content,
			author: author
		})
		this.setState({openForm: false})
	}

	render() {
		let { title, content, updatedAt } = this.state;
		const classes = this.props.classes;
		let date = new Date(updatedAt)
		let updateDate = date.getFullYear() + "-" + (date.getMonth()+1) + "-" + date.getDate();
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
					<Button variant="contained" color="primary" onClick={this.onUpdate}>
						Save
					</Button>
					<Button color="primary" onClick={() => { this.setState({ openForm: false, ...this.props }) }}>
						Close
					</Button>
				</form>
				: <CardActionArea onClick={() => { this.setState({ openForm: true }) }} >
					<CardContent>
						<Typography gutterBottom color="textSecondary">
							{updateDate}
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