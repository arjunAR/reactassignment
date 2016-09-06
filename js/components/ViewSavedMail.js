var React=require('react');
var ManipulateSavedWindow=require('./ManipulateSavedWindow');

var ViewSavedMail=React.createClass({

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


    return(
      <div>
      <a href="#saveModalWin" id="modal" data-toggle="modal" onClick={this.ViewMailStatus}>
          <tr className="danger">
        		<td className="col-lg-6">{this.props.msgRecipient}</td>
        		<td className="col-lg-6">{this.props.msgSubject}</td>
      		</tr>
      </a>
      {this.state.status?<ManipulateSavedWindow msgID={this.props.msgID} msgRecipient={this.props.msgRecipient} msgSubject={this.props.msgSubject} msgBody={this.props.msgBody} hideView={this.hideMailStatus}/>:null}
      </div>
    );
  }
});

module.exports=ViewSavedMail;
