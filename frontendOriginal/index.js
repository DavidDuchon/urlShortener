import React from 'react'
import ReactDOM from 'react-dom'
import UrlForm from './url_form'
import UrlShower from './url_shower'
import ErrorShower from './error_shower'

class App extends React.Component{

	constructor(props){
		super(props);
		this.state = {url:'',errorText:'',shortenedUrl:''};
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}
	
	handleChange(event){
		
		this.setState({url:event.target.value});
	}
	
	async handleSubmit(event){


		let response = await fetch('http://localhost:3000/api/addUrl',
			{
				method:'POST',
				headers:{
					'Content-Type':'application/json'
				},
				body:JSON.stringify(this.state)
			});

		let resJson = await response.json();
		console.log(resJson);
			

		this.setState({shortenedUrl:resJson.shortenedUrl,errorText:resJson.errorText});
	}


	render(){

		const urlForm = <UrlForm handleChange = {this.handleChange} handleSubmit = {this.handleSubmit} url = {this.state.url}/>;
		
		const urlShower = <UrlShower url = {this.state.shortenedUrl} />;
		const errorShower = <ErrorShower text = {this.state.errorText} />

		if (this.state.errorText){
			return [urlForm,errorShower];
			}
		else if (this.state.shortenedUrl){
		
			return [urlForm,urlShower];
		}
		else{
			return urlForm;
		}
		
		
	}
}

ReactDOM.render(<App />,document.getElementById('root'));
