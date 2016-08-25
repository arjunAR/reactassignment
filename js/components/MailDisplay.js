var React=require('react');


var MailDisplay=React.createClass({
  render:function(){
    console.log("in render of maildisplay");
    return(
      <div>
        <tr className="col-lg-12">
      		<td className="col-lg-4">{this.props.from}</td>
      		<td className="col-lg-4">{this.props.subject}</td>
      		<td className="col-lg-4">{this.props.date}</td>
    		</tr>
      </div>
    )
  }

});

module.exports=MailDisplay;
