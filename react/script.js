var React=require("react")
var ReactDOM= require("react-dom")
var realtime=io.connect("localhost")
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
		this.filter=this.filter.bind(this)
		this.setCategory=this.setCategory.bind(this)
		this.setLimit=this.setLimit.bind(this)
	}
	load(){
		var list=this.state.list.slice();
		var filter=Object.assign({},this.state.filter);
		filter.limit=list.length+10;
		realtime.emit("filter",Object.assign({start:list.length},filter),(latest)=>{
			if(latest.length){
				list.push(latest)
				this.setState({filter:filter,list:list});
			}
		})
	}
	setCategory(event){
		var filter=Object.assign({},this.state.filter);
		filter.limit=this.state.list.length
		if(event.target.value=="none")
			filter.category={};
		else
			filter.category={category:event.target.value};
		
		realtime.emit("filter",filter,(latest)=>{
			this.setState({filter:filter,list:latest});
		})
	}	
	setLimit(event){
		var filter=Object.assign({},this.state.filter);
		filter.limit=parseInt(event.target.value);
		realtime.emit("filter",filter,(latest)=>{
			if(latest.length){
				this.setState({filter:filter,list:latest});
			}
		})
	}
	filter(){
		this.setState({show:!this.state.show})
	}
	render(){
		var list=this.state.list
		if(list){
			list=list.map((list)=>{
				var url=list["_id"]
				return <Item series={list.serie} url={url} group={list.group} release={list.release} key={url} site={list.site} />
			})
		}
		var filter=!this.state.show?{display:"none"}:{};
		return <div>
			<button className="filters" onClick={this.filter}>Filters</button>
			<div className="filter" style={filter }>
			<label>Category</label> 
			<select onChange={this.setCategory}>
				<option value="none">None</option>
				<option value="translated">Translated Novel</option>
				<option value="story">Story</option>
				<option value="video">Video</option>
				<option value="game">Game</option>
				<option value="news">News</option>
				<option value="other">Other</option>
			</select>
			<label>Show</label>
			<select onChange={this.setLimit}>
				<option selected>30</option>
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