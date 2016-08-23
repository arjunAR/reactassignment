var React=require('react');



var ChildLeftPane=React.createClass({
	render:function(){
		return(
		<div>	
		<h1>Child Left pane</h1>
		<h1>{this.props.pizza}</h1>
		
		</div>
		);

	}

});

module.exports=ChildLeftPane;