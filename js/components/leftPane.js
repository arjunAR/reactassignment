var React=require('react');
var ChildLeftPane=require('./childLeftPane');


var LeftPane=React.createClass({
	render:function(){
		return(
		<div>	
		<h1>Left pane </h1>
		<h1>{this.props.pizza}</h1>
		<h1>{this.props.data}</h1>
		
		<ChildLeftPane pizza={this.props.pizza} />
		
		</div>
		);

	}

});

module.exports=LeftPane;