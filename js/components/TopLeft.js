var React=require('react');
var Label=require('./Label');



var TopLeft=React.createClass({
	render:function(){
console.log("in function of topleft");
		var labelVar=this.props.data.map(function(d){
			return(
				<Label lId={d.id} lName={d.name} />
			)
		});

		return(
		<div>

			{labelVar}

		</div>
		);

	}

});

module.exports=TopLeft;
