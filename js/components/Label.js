var React=require('react');



var Label=React.createClass({
	
	render:function(){

		return(
		<div>	
			<a id={this.props.lId}>{this.props.lName}</a>
		</div>
		);

	}

});

module.exports=Label;

