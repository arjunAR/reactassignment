var React=require('react');

var NavbarGmail=React.createClass({

	render:function(){


		return(
		<div>

      <div id="myNavBar" className="navbar navbar-fixed-top">
        <div className="container">
          <a className="navbar-brand" href="/"></a>

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
									<a href="/"><span className="glyphicon glyphicon-off"></span> Signout</a>
								</li>
							</ul>
						</li>
					</ul>

        </div>
      </div>

		</div>
		);

	}

});

module.exports=NavbarGmail;
