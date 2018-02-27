var React=require("react")
var ReactDOM= require("react-dom")

class Header extends React.Component{
	render(){
		return <div>Entertain Meh</div>
	}
}

class List extends React.Component{
	constructor( props){
		super(props);
		this.state={category:props.category};
	}
	render(){
		var list=[{serie:"test",site:"google.com",release:"1",group:"translatorbob"},{serie:"test",site:"google.com",release:"1",group:"translatorbob"},{serie:"test",site:"google.com",release:"1",group:"translatorbob"},{serie:"test",site:"google.com",release:"1",group:"translatorbob"}];
		if(list){
			list=list.map((list)=>{
				return <Item series={list.serie} group={list.group} release={list.release} key={list.series+list.release} site={list.site} />
			})
		}
		return <div className="list">
			<h1>Latest Video</h1>
			<table>
			<tr>
				<th>Series</th>
				<th>Release</th>
				<th>Group</th>
			</tr>
				{list}
			</table>
		</div>;
	}
}

function Item(props){
	return <tr>
		<td>{props.series}</td>
		<td><a href={props.site}>{props.release}</a></td>
		<td>{props.group}</td>
	</tr>;
}
ReactDOM.render([<Header/>,<List/>],document.getElementById("container"))