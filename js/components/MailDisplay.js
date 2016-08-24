var React=require('react');


var MailDisplay=React.createClass({
  render:function(){
    return(
      <div>
      <table>
      <tbody>
      <tr>
      <td>TTTT</td>
      <td>{this.props.from}</td>
      <td>{this.props.subject}</td>
      <td>{this.props.date}</td>
      </tr>
      </tbody>
      </table>
      </div>
    )
  }

});

module.exports=MailDisplay;
