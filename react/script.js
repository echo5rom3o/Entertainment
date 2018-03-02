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
		console.log(props.list);
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
				return <Item series={list.serie} group={list.group} release={list.release} key={list.serie +list.release} site={list.site} />
			})
		}
		return <div className="list">
		<h1>{this.state.category}</h1>
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

function Item(props){
	return <tr>
		<td> <a href={"/series/"+props.series}>{props.series}</a></td>
		<td><a href={props.site}>{props.release}</a></td>
		<td>{props.group}</td>
	</tr>;
}

function LoadList(){
	var listNovel=[{serie:"test",site:"http://google.com",release:"1",group:"translatorbob"},{serie:"test",site:"http://google.com",release:"2",group:"translatorbob"},{serie:"test",site:"http://google.com",release:"3",group:"translatorbob"},{serie:"test",site:"http://google.com",release:"4",group:"translatorbob"},{serie:"test",site:"http://google.com",release:"5",group:"translatorbob"},{serie:"test",site:"http://google.com",release:"6",group:"translatorbob"},{serie:"test",site:"http://google.com",release:"7",group:"translatorbob"},{serie:"test",site:"http://google.com",release:"8",group:"translatorbob"}];
	return <List list={listNovel}></List>
}

ReactDOM.render([<Header/>,<main><LoadList /></main>],document.getElementById("container"))