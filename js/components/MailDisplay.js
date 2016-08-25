var React=require('react');


var MailDisplay=React.createClass({
  render:function(){
    console.log("in render of maildisplay");
    return(
      <div>
        <tr>
      		<td>{this.props.from}</td>
      		<td>{this.props.subject}</td>
      		<td>{this.props.date}</td>
    		</tr>
      </div>
    )
  }

});

module.exports=MailDisplay;
