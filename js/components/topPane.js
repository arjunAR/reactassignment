var React=require('react');


var TopPane=React.createClass({
	render:function(){
		return(
	
	<div>
		<div id="myNavBar" className="navbar navbar-fixed-top">
			<div className="container">

				<div className="nav-collapse collapse navbar-responsive-collapse">
					<form className="navbar-form pull-left">
						<input id="searchsite" type="text" className="form-control" placeholder="Search your brand.."/>
						<button id="searchButton" className="btn btn-default"><span className="glyphicon glyphicon-search"></span></button>
						<button id="cart" className="btn btn-medium btn-default"><span className="glyphicon glyphicon-shopping-cart"></span>  CART</button>
					</form>

					
					
					<ul className="nav navbar-nav pull-right">

						<li className="dropdown">
							<a id="myAccount" className="dropdown-toggle" data-toggle="dropdown" href="#"><span className="glyphicon glyphicon-user"></span> My Accounts <strong className="caret"></strong></a>
							<ul className="dropdown-menu">
								<li>
									<a href="#"><span className="glyphicon glyphicon-wrench"></span> Settings</a>
								</li>
								<li>
									<a href="#"><span className="glyphicon glyphicon-pencil"></span> Update Profile</a>
								</li>
								<li className="divider"></li>
								<li>
									<a href="#"><span className="glyphicon glyphicon-off"></span> Signout</a>
								</li>
							</ul>
						</li>
					</ul>
		
				</div>
			</div>	
		</div>

	</div>


		);

	}

});

module.exports=TopPane;