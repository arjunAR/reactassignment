var React=require('react');
var ManipulateSavedWindow=React.createClass({

	getInitialState:function(){
		console.log("getInitialState VIEW MAIL");
		return({status:false,msgID:this.props.msgID,msgRecipient:this.props.msgRecipient,msgSubject:this.props.msgSubject,msgBody:this.props.msgBody});
	},
	replyMailStatus:function(){
		this.setState({status:true});
		document.getElementById('sendButtonDiv').style.display = 'block';
		document.getElementById('replyButtonDiv').style.display = 'none';

		document.getElementById('textBoxBody').style.display = 'block';
		document.getElementById('iframeMessageBody').style.display = 'none';
		this.setState({msgBody:''});
	},
	updateMail:function(){
		this.setState({status:true});
		document.getElementById('updateOnly').style.display = 'block';
		document.getElementById('updateDeleteMain').style.display = 'none';



	},
	hideReply:function(){
		this.setState({status:false});
	},
	handleTo:function(e){
		this.setState({msgRecipient:e.target.value});
	},
	handleSubject:function(e){
		this.setState({msgSubject:e.target.value});
	},
	handleBody:function(e){
		this.setState({msgBody:e.target.value});
	},
	closeButon:function(){
		this.props.hideView;
	},
	updateMailAjax:function(){
		console.log("I am inside updateMailAjax",this.state.msgID);
		this.props.hideView;
		$.ajax({
     url: '/updateData',
     dataType: 'json',
     type: 'PUT',
		 data:{"msgRecipient":this.state.msgRecipient,"msgSubject":this.state.msgSubject,"msgBody":this.state.msgBody,"_id":this.state.msgID},
     success: function(data)
     {

       console.log("Success of HOME",data);
     }.bind(this),
     error: function(xhr, status, err) {
       console.error(err.toString());
     }.bind(this)
  });
	},
	deleteMail:function(){
		console.log("DELETEAJAX");
		this.props.hideView;
		$.ajax({
		 url: '/deleteData',
		 dataType: 'json',
		 type: 'DELETE',
		 data:{"msgRecipient":this.state.msgRecipient,"msgSubject":this.state.msgSubject,"msgBody":this.state.msgBody,"_id":this.state.msgID},
		 success: function(data)
		 {
			// this.setState({deleteData:data});
			 console.log("Success of HOME",data);
		 }.bind(this),
		 error: function(xhr, status, err) {
			 console.error(err.toString());
		 }.bind(this)
	});
	},
	appendToIframe: function(message)
  {
		console.log("appendToIframe");
   var iFrameNode = this.refs.myIframe,
   frameDoc = iFrameNode.contentWindow.document;
   frameDoc.write(message);
  },
	componentDidMount: function(){
		console.log("componentDidMount of VIEW MAIL");
	var encodedBody = this.state.msgBody;

//	encodedBody = encodedBody.replace(/-/g, '+').replace(/_/g, '/').replace(/\s/g, '');
	//encodedBody = decodeURIComponent(escape(window.atob(encodedBody)));
		console.log("encodedBody in MODAL",encodedBody);
	this.appendToIframe(encodedBody);
	},

	render:function(){
		console.log("RENDER VIEWMAAIL");
		return(
			<div>
		   <div>
		      <div className="modal fade" id="saveModalWin">
		         <div className="modal-dialog">
		            <div className="modal-content">
		               <div id="updateDeleteMain">
		                  <div className="modal-header">
		                     <button className="close" onClick={this.props.hideView} data-dismiss="modal"><span className="glyphicon glyphicon-remove"></span></button>
		                  <div className="modal-body">
											</div>
		                     <form  className="form-horizontal">
		                        <div className="form-group">
		                           <div className="col-lg-12">
		                              <label className="control-label" for="frmVal">Recepient </label> :{this.props.msgRecipient}
		                           </div>
		                        </div>
		                        <div className="form-group">
		                           <div className="col-lg-12" id="sub1">
		                              <label className="control-label" for="subjVal">For </label> :{this.props.msgSubject}
		                           </div>
		                        </div>
		                        <div id="iframeMessageBody">
		                           <iframe className="col-md-12" id="iframe-message" ref="myIframe"></iframe>
		                         </div>
		                     </form>
		                  </div>
		                  <div className="modal-footer">
		                     <button className="btn btn-primary" id="updateButton" data-target="#myModal" data-toggle="modal" type="button" onClick={this.updateMail}>Update</button>
		                     <button className="btn btn-warning" id="deleteButton" data-target="#myModal" data-dismiss="modal" data-toggle="modal" type="button" onClick={this.deleteMail}>Delete</button>
		                  </div>
		               </div>
		               <div id="updateOnly" style={{display:'none'}}>
		                  <div className="modal-header">
		                     <button className="close" onClick={this.props.hideView} data-dismiss="modal"><span className="glyphicon glyphicon-remove"></span></button>
		                  </div>
		                  <div className="modal-body">
		                     <form  className="form-horizontal">
		                        <div className="form-group">
		                           <label className="col-lg-2 control-label" for="inputName">To</label>
		                           <div className="col-lg-10">
		                              <input className="form-control" type="text" id="inputName" value={this.state.msgRecipient} onChange={this.handleTo} placeholder="Enter the receipient" />
		                           </div>
		                        </div>
		                        <div className="form-group">
		                           <label className="col-lg-2 control-label" for="inputSubject">Subject</label>
		                           <div className="col-lg-10">
		                              <input className="form-control" type="text" id="inputSubject" value={this.state.msgSubject} onChange={this.handleSubject} placeholder="Enter the subject" />
		                           </div>
		                        </div>
		                        <div className="form-group">
		                           <label className="col-lg-2 control-label" for="inputSubject">Message body</label>
		                           <div id="iframeMessageBody" className="col-lg-10">
		                              <textarea className="form-control" type="text" id="inputMessage" value={this.state.msgBody} onChange={this.handleBody} placeholder="Enter the mail" rows="8"><iframe className="col-md-12" id="iframe-message" ref="myIframe"></iframe></textarea>
		                           </div>
		                        </div>
		                     </form>
		                  </div>
		                  <div className="modal-footer">
		                     <button className="btn btn-primary" id="saveButton" data-target="#myModal" data-dismiss="modal" data-toggle="modal" type="button" onClick={this.updateMailAjax}>Save</button>
		                     <button className="btn btn-warning" id="closeButton" data-target="#myModal" data-dismiss="modal" data-toggle="modal" type="button" onClick={this.closeButon}>Close</button>
		                  </div>
		               </div>
		            </div>
		         </div>
		      </div>
		   </div>
		</div>

		);

	}

});

module.exports=ManipulateSavedWindow;
