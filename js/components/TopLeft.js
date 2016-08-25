var React=require('react');
var Label=require('./Label');



var TopLeft=React.createClass({
	render:function(){
		var fun=this.props.fun;
console.log("in function of topleft");
		var labelVar=this.props.data.map(function(d){
			return(
				<Label key={d.id} lId={d.id} fun={fun} />
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
