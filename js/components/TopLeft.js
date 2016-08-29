var React=require('react');
var Compose=require('./Compose');
var Label=require('./Label');


var TopLeft=React.createClass({
	render:function(){
		var fun=this.props.fun;
		var that=this;
console.log("in function of topleft");
		var labelVarr=this.props.data.map(function(d){

	if(d.id=="INBOX" || d.id=="SENT" || d.id=="IMPORTANT" || d.id=="DRAFT" || d.id=="UNREAD"){
			return(
				<Label key={d.id} lId={d.id} fun={fun}></Label>
			);
		}
	});

		return(
		<div>
			<Compose />
			{labelVarr}

		</div>
		);

	}

});

module.exports=TopLeft;
