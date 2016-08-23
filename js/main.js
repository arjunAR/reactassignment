var React=require('react');
var ReactDom=require('react-dom');

var GmailBox = require('./components/GmailBox')

var MyComponent=React.createClass({


	render:function(){
		return(
			<div className="container" id="main">
				<GmailBox />

			</div>

		);

	}
});



ReactDom.render(<MyComponent />,document.getElementById('app'));
