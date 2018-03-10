var React=require("react")
var ReactDOM= require("react-dom")

class Header extends React.Component{
	render(){
		return <div id="header">Entertain Meh</div>
	}
}

class List extends React.Component{
	constructor( props){
		super(props);
		this.state={category:props.category,filters:{},list:props.list};
		this.load=this.load.bind(this)
	}
	load(){
		var list=this.state.list.slice()
		list.push({serie:"test",site:"http://google.com",release:"9",group:"translatorbob"})
		this.setState({list:list});
	}
	render(){
		var list=this.state.list
		if(list){
			list=list.map((list)=>{
				var url=list["_id"]
				console.log(list["_id"],list._id)
				return <Item series={list.serie} url={url} group={list.group} release={list.release} key={list.serie +list.release} site={list.site} />
			})
		}
		return <div>
		
			<div className="filter">
			Category 
			<select>
				<option>None</option>
				<option>Translated Novel</option>
				<option>Novel</option>
				<option>Video</option>
				<option>Other</option>
			</select>
			Show 
			<select>
				<option>30</option>
				<option>50</option>
				<option>100</option>
			</select>
			</div>
			<table>
			<tbody>
			<tr>
				<th>Series</th>
				<th>Release</th>
				<th>Group</th>
			</tr>
				{list}
			</tbody>
			</table>
			<button onClick={this.load}>Load More</button>
		</div>;
	}
}
class Nav extends React.Component{
	render(){
		return <nav>
			<ul>
			<li><a href="">Home</a></li>
			<li><a href="link">Add a link</a></li>
			<li><a href="">Register</a></li>
			<li><a href="">Login</a></li>
			</ul>
		</nav>
	}
}
function Item(props){
	return <tr>
		<td> <a href={"/series/"+props.series}>{props.series}</a></td>
		<td><a href={"/linkredirect/?url="+   props.url}>{props.release}</a></td>
		<td>{props.group}</td>
	</tr>;
}

function LoadList(){
	data.latestlist;
	data.popularlist;
	data.suggestedlist;
	return <div className="list">
	<h3>Latest List</h3>
		<List list={data.latestlist}></List>
	<h3>Popular List</h3>
		<List list={data.popularlist}></List>
	<h3>Suggested List</h3>
		<List list={data.suggestedlist}></List>
	</div>
}

ReactDOM.render([<Header/>,<main><LoadList/><Nav/></main>],document.getElementById("container"))