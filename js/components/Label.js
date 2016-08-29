var React=require('react');



var Label=React.createClass({
	handleLabel:function(){
		this.props.fun(this.props.lId);
	},
	render:function(){
		console.log("in LABEL function of topleft");
		var dataFunction=this.props.fun;
		var id=this.props.lId;
		id = id.toLowerCase().split(' ');
  for (var i = 0; i < id.length; i++) {
    id[i] = id[i].charAt(0).toUpperCase() + id[i].slice(1);
  }
  id=id.join(' ');

		return(
		<div>
		<br></br>
			<ul>
				<li><a onClick={this.handleLabel}>{id}</a></li>
			</ul>
		</div>
		);

	}

});

module.exports=Label;
