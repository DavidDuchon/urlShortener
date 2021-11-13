import React from 'react'

export default class UrlShower extends React.Component{
	constructor(props){
		super(props);
		this.url = this.props.url;
	}

	render(){
		return (<div className = 'urlShower'>
				<p> Shortened Url is: {this.url} </p>
			</div>);
	}
}

