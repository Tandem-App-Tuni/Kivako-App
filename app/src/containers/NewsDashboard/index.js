import React from "react";
import {clone} from "ramda";

import ConstantsList from '../../config_constants';
import MaterialTable from "material-table";
import { AlertPopup } from '../../components/AlertView';

class NewsDashboard extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			newsList: [],
			tableColumns: [
				{ title: "Title", field: "title" },
				{ title: "Content", field: "content" },
				{ title: "Author", field: "author" },
				{ title: "Created at", field: "createdAt", editable: 'never' },
				{ title: "Updated at", field: "updatedAt", editable: 'never' }
			],
			isLoading: true,
			showAlert: false,
			alertText: "",
			alertType: ""
		}
	}

	componentDidMount() {
		fetch(window.location.protocol + '//' + window.location.hostname + ConstantsList.PORT_IN_USE + "/api/v1/news/",
			{
				method: 'GET',
				credentials: 'include'
			}
		)
		.then(response => response.json())
		.then(responseJson => {
			this.setState({ newsList: responseJson, isLoading: false })
		});
	}

	updateNews = (newData, oldData) => {
		return new Promise((resolve, reject) => {
			fetch(window.location.protocol + '//' + window.location.hostname
				+ ConstantsList.PORT_IN_USE + "/api/v1/news/" + oldData._id,
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
				}
			)
			.then(res => {
				res.status === 200 &&
					this.toggleAlert(true, "success", "Updated successfully")
				return res.json()
			})
			.then(res => {
				resolve(res);
			}).catch(err => {
				reject();
			})
		})
	}

	addNews = newData => {
		return new Promise((resolve, reject) => {
			fetch(window.location.protocol + '//' + window.location.hostname
				+ ConstantsList.PORT_IN_USE + "/api/v1/news/",
				{
					method: 'POST',
					credentials: 'include',
					headers: {
						"Accept": "application/json",
						"Content-Type": "application/json",
					},
					body: JSON.stringify(newData)
				}
			)
			.then(res => {
				res.status === 201 &&
					this.toggleAlert(true, "success", "Added successfully")
				return res.json()
			})
			.then(res => {
				resolve(res);
			}).catch(err => {
				reject();
			})
		})
	}

	deleteNews = data => {
		return new Promise((resolve, reject) => {
			fetch(window.location.protocol + '//' + window.location.hostname
				+ ConstantsList.PORT_IN_USE + "/api/v1/news/" + data._id,
				{
					method: "DELETE",
					headers: {
						'Accept': 'application/json',
						'Content-Type': 'application/json',
					},
					credentials: 'include'
				}
			).then(res => {
				if (res.status === 200){
					this.toggleAlert(true, "success", "Deleted successfully");
					resolve();
				}
				else
					throw new Error();
			}).catch(err => {
				reject();
			})
		})
	}

	toggleAlert = (open, type, text) => {
		//type is 'error', 'info', 'success', 'warning'
		if (open === true) {
			this.setState({
				showAlert: open,
				alertType: type,
				alertText: text
			})
		}
		else {
			this.setState({
				showAlert: open
			})
		}
	}

	render() {
		return <div>
			{!this.state.isLoading &&
				<MaterialTable
					columns={this.state.tableColumns}
					data={this.state.newsList}
					title="News list"
					editable={{
						onRowAdd: newData =>
							new Promise((resolve, reject) => {
								let isAllFieldsValid = true;
								["title", "author", "content"].forEach(item => {
									if(!newData[item])
										isAllFieldsValid = false;
								})
								if(isAllFieldsValid)
									this.addNews(newData)
										.then(res => {
											let { newsList } = clone(this.state)
											newsList.push(res);
											this.setState({ newsList: newsList }, resolve);
										})
										.catch(reject)
								else {
									this.toggleAlert(true, "error", "Please fill in all the fields");
									reject();
								}
							}),
						onRowUpdate: (newData, oldData) =>
							new Promise((resolve, reject) => {
								let isAllFieldsValid = true;
								["title", "author", "content"].forEach(item => {
									if(!newData[item]){
										isAllFieldsValid = false
									}
								})
								if(isAllFieldsValid)
									this.updateNews(newData, oldData)
										.then(res => {
											let { newsList } = clone(this.state);
											let index = newsList.findIndex(item => item._id === res._id)
											newsList[index] = res;
											this.setState({
												newsList: newsList
											}, resolve)
										})
										.catch(reject)
								else {
									this.toggleAlert(true, "error", "Please fill in all the fields");
									reject();
								}
							}),
						onRowDelete: data =>
							new Promise((resolve, reject) => {
								this.deleteNews(data)
									.then(() => {
										let { newsList } = clone(this.state);
										let index = newsList.findIndex(item => item._id === data._id)
										newsList.splice(index, 1);
										this.setState({ newsList: newsList }, resolve)
									})
									.catch(reject)
							})
					}} />
			}
			<AlertPopup
				open={this.state.showAlert}
				onClose={() => {this.setState({showAlert: false})}}
				variant={this.state.alertType}
				message={this.state.alertText}
			/>
		</div>
	}
}

export default NewsDashboard;	