var React=require('react');


var RightPane=React.createClass({
	render:function(){
		return(
		<div>
			
				<h2>Upcoming Lenovo Vibeeee</h2>
				
				<p>Lenovo is back with a bang with its new version K Series.The Lenovo Vibe K5  note is set to hit the market coming august. Be a smart customer to grab the opportunity to own a high speed octa processor with dolby atmos. Experience the cinematic experience available in Vibe. 
				</p>

				<h1>{this.props.data}</h1>

		</div>
		);

	}

});

module.exports=RightPane;