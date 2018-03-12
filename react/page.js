var React=require("react")
var ReactDOM= require("react-dom")
class Page extends React.Component{
	render(){
		return <div></div>
	}
}
ReactDOM.render([<Header/>,<main><Page></Page></main>],document.getElementById("container"))