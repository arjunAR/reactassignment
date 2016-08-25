var React=require('react');



var Label=React.createClass({
	handleLabel:function(){
		this.props.fun(this.props.lId);
	},
	render:function(){
		var dataFunction=this.props.fun;
		var id=this.props.lId
		return(
		<div>
			<a onClick={this.handleLabel}>{id}</a>
		</div>
		);

	}

});

module.exports=Label;
