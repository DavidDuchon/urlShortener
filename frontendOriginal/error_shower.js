import React from 'react'

export default class ErrorShower extends React.Component{
	constructor(props){
		super(props);
		this.text = this.props.text;
	}

	render(){
		return <p>{this.props.text}</p>;
	}
}
