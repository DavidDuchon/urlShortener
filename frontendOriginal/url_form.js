import React from 'react'

export default class UrlForm extends React.Component{
	constructor(props){
		super(props);
		this.handleChange = this.props.handleChange;
		this.handleSubmit = this.props.handleSubmit;
	}

	render(){
		this.url = this.props.url;
		return (<div className = "urlForm">
				<label>
					Url:
						<input type='text' value = {this.url} onChange = {this.handleChange}  />
				</label>
				<input onClick = {this.handleSubmit} type = 'submit' value = "Get URL" />
			</div>
		);
	}
}
