import React from "react";

export const AppContext = React.createContext();

export default class AppContextProvider extends React.Component {
	state = {
		requestAmount: 0
	}

	updateContext = (name, value) => {
		this.setState({[name]: value});
	}

	render(){
		return (
			<AppContext.Provider value={{...this.state, updateContext: this.updateContext}}>
				{this.props.children}
			</AppContext.Provider>
		)
	}
}