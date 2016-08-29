var React=require('react');
var ViewMailWindow=require('./ViewMailWindow');


var MailDisplay=React.createClass({

  getInitialState: function()
  {
    return({status:false});
  },
  ViewMailStatus:function(){

  this.setState({status:true});
  },
  hideMailStatus:function(){
    this.setState({status:false});
  },

  render:function(){
    console.log("in render of maildisplay",this.props.subject);

    return(
    <div>

        <tr className="danger">
      		<td className="col-lg-4">{this.props.from}</td>
      		<td className="col-lg-4"><a href="#myModalWin" id="modal" data-toggle="modal" onClick={this.ViewMailStatus}>{this.props.subject}</a>{this.state.status?<ViewMailWindow from={this.props.from} subject={this.props.subject} date={this.props.date} messageBody={this.props.messageBody} hideView={this.hideMailStatus}/>:null}</td>
      		<td className="col-lg-4">{this.props.date}</td>
    		</tr>

    </div>
    )
  }

});

module.exports=MailDisplay;
