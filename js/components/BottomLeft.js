var React=require('react');



var BottomLeft=React.createClass({
	render:function(){
		return(
		<div>	
		<a className="btn btn-success btn-block" onClick={this.props.fun}>Change Sibling!!</a>
		
		</div>
		);

	}

});

module.exports=BottomLeft;