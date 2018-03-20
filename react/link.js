var React=require("react")
var ReactDOM= require("react-dom")

class Nav extends React.Component{
	render(){
		return <nav style={{"margin":"0 0 0 30%"}}>
			<ul>
			<li><a href="">Home</a></li>
			<li><a href="link">Add a link</a></li>
			<li><a href="">Register</a></li>
			<li><a href="">Login</a></li>
			</ul>
		</nav>
	}
}

class Header extends React.Component{
	render(){
		return <div id="header">Entertain Meh<Nav/></div>
	}
}

class Link extends React.Component{
	constructor(){
		this.url=this.url.bind(this)
		this.onset=this.onset.bind(this)
		this.state={warning:"",url:true}
	}
	url(event){
		console.log(event.target.value)
		if(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/.test(event.target.value)){
			this.setState({url:event.target.value});
		}
		else{
			this.setState({url:false});
		}
	}
	onset(event){
		if(!this.state.url&&!this.state.url.length){
			this.setState({url:false});
			event.preventDefault()
		}
	}
	render(){
		if(data.link=="success")
			return <form>Successfully added link!</form>
		var urlwarning=!this.state.url ? "warning":""
		return <form action="link" method="post" onSubmit={this.onset}>
			<label>Type:</label>
			<select name="type">
				<option value="translated">Translated Novel</option>
				<option value="story">Story</option>
				<option value="video">Video</option>
				<option value="game">Game</option>
				<option value="news">News</option>
				<option value="other">Other</option>
			</select><br/>
			<label>URL:</label><input placeholder="http://example.com" className={urlwarning} onChange={this.url} name="site" type="text"></input><br/>
			<label>Series:</label>
			<select name="serie">
				<option value="none">None</option>
			</select>
			<label>Release:</label><input placeholder="1" name="release" type="text"></input><br/>
			<label>Channel/Author/Translator:</label>
			<input name="group" type="text"></input>
			<br/>
			<input type="submit"></input><br/>
			<img width="50px" height="50px" src="interface/SafeBrowsing_Icon.png"/>
			<span><a href="https://developers.google.com/safe-browsing">Scanned With Google Safe Browse</a></span>
			<span className="warning">{data.link}</span>
		</form>;
	}
}
ReactDOM.render([<Header/>,<main><Link/></main>],document.getElementById("container"))