var React=require("react")
var ReactDOM= require("react-dom")

class Header extends React.Component{
	render(){
		return <div>Entertain Meh</div>
	}
}

ReactDOM.render(<Header></Header>,document.getElementByID("container"))