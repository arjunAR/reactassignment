var React=require('react');
var ReactDom=require('react-dom');
var {browserHistory,Route,Router,IndexRoute}=require('react-router');
var GmailBox = require('./components/GmailBox');
var About = require('./components/About');
var NavBar = require('./components/NavBar');
var Home = require('./components/Home');
var MyComponent=React.createClass({


	render:function(){
		return(
			<div className="container">
           <NavBar />

					 {this.props.children}
         </div>

		);

	}
});



ReactDom.render(
	<Router history={browserHistory}>
			<Route path="/" component={MyComponent}>
				<IndexRoute component={Home} />
				<Route path="/home" component={Home} />
				<Route path="/about/:aboutName" component={About} />
				<Route path="/gmailbox" component={GmailBox} />
			</Route>
	</Router>
			,document.getElementById('app'));
