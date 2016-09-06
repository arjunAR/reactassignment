var React=require('react');
var NavLink=require('./NavLink');
var NavBar=React.createClass({
render:function(){
  return(


    <div>

      <div id="myNavBar" className="navbar navbar-fixed-top">
        <div className="container">

          <ul className="nav navbar-nav">
          <li><NavLink to="/home">Homee</NavLink></li>
          <li><NavLink to="/gmailbox">Gmail</NavLink></li>
          <li><NavLink to="/about/React">About React</NavLink></li>
          <li><NavLink to="/about/Window">About Window</NavLink></li>
          </ul>



        </div>
      </div>

		</div>



);
}
})
module.exports=NavBar;
