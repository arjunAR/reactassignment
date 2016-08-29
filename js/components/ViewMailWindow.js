var React=require('react');
var ViewMailWindow=React.createClass({

	getInitialState:function(){
		return({status:false,to:this.props.from,subject:this.props.subject,msgBody:this.props.messageBody,date:this.props.date});
	},
	replyMailStatus:function(){
		this.setState({status:true});
		document.getElementById('sendButtonDiv').style.display = 'block';
		document.getElementById('replyButtonDiv').style.display = 'none';

		document.getElementById('textBoxBody').style.display = 'block';
		document.getElementById('iframeMessageBody').style.display = 'none';
		this.setState({msgBody:''});
	},
	hideReply:function(){
		this.setState({status:false});
	},
	handleBody:function(e){
		this.setState({msgBody:e.target.value});
	},
	sendEmail:function(){
		var accessToken = localStorage.getItem('gToken');
		console.log("Access token: "+accessToken);
		var email = '';
		var Headers = {'To': this.state.to,'Subject': this.state.subject};
		for(var header in Headers)
		{
		  email += header += ": "+Headers[header]+"\r\n";
		  console.log("email---"+email);
		  console.log("header---"+header);
		  console.log("Headers[header]---"+Headers[header]);

		}
		email += "\r\n" + this.state.msgBody;
		 console.log("constructed email: " +email);
		var encodedMessage =  window.btoa(email).replace(/\+/g, '-').replace(/\//g, '_');
		$.ajax({
		 url: 'https://www.googleapis.com/gmail/v1/users/me/messages/send?key={AIzaSyB5Fugum-RuTDl-zClHEWeyzYjvs48r1tY}',
		 dataType: 'json',
		 contentType: "application/json",
		 type: 'POST',
		 data:JSON.stringify({'raw':encodedMessage}),
		 beforeSend: function (request)
		 {
			 request.setRequestHeader("Authorization", "Bearer "+accessToken);
		 },
		 success: function(data)
		 {
				 console.log("SEND MAIL AJAX SUCCESS");
				 this.setState({to:'',subject:'',msgBody:'',date:''});

		 }.bind(this),
		 error: function(xhr, status, err) {
			 console.error(err.toString());
		 }.bind(this)
	});

	},
	appendToIframe: function(message)
  {
   var iFrameNode = this.refs.myIframe,
   frameDoc = iFrameNode.contentWindow.document;
   frameDoc.write(message);
  },
	componentDidMount: function(){
	var encodedBody = this.props.messageBody;

	encodedBody = encodedBody.replace(/-/g, '+').replace(/_/g, '/').replace(/\s/g, '');
	encodedBody = decodeURIComponent(escape(window.atob(encodedBody)));
		//console.log("encodedBody in FINAL ENCODERRRR",encodedBody);
	this.appendToIframe(encodedBody);
	},

	render:function(){
		console.log("viewmailWINDOWWW FINALL",this.props.subject);
		return(
			<div>
        <div className="modal fade" id="myModalWin">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
								 <button className="close" onClick={this.props.hideView} data-dismiss="modal"><span className="glyphicon glyphicon-remove"></span></button>

                <h2 className="modal-title">{this.state.subject}</h2>
              </div>

              <div className="modal-body">

                <form  className="form-horizontal">

                  <div className="form-group">
                    <div className="col-lg-12">
											<label className="control-label" for="frmVal">Recepient </label> :{this.state.to}
                    </div>
                  </div>

                  <div className="form-group">
                    <div className="col-lg-12">
											<label className="control-label" for="date">On </label> :{this.props.date}
                    </div>
                  </div>

									<div className="form-group">
                    <div className="col-lg-12" id="sub1">
											<label className="control-label" for="subjVal">For </label> :{this.props.subject}
                    </div>
                  </div>
									<div id="iframeMessageBody">
                  	<iframe className="col-md-12" id="iframe-message" ref="myIframe"></iframe>
									</div>

									<div className="form-group" style={{display:'none'}} id="textBoxBody">
										 <label className="col-lg-2 control-label" for="inputMessage">Type your message</label>
										 <div className="col-lg-10">
												<textarea className="form-control" type="text" id="inputMessage" value={this.state.msgBody} onChange={this.handleBody} placeholder="Enter the mail" rows="8"></textarea>
										 </div>
									</div>

                </form>
              </div>

              <div className="modal-footer">
								<div id="replyButtonDiv">
                	<button className="btn btn-warning" id="replyButton" data-target="#myModal" data-toggle="modal" type="button" onClick={this.replyMailStatus}>Reply</button>
								</div>


								<div id="sendButtonDiv" style={{display:'none'}}>
										<button className="btn btn-success" id="sendButton" data-toggle="modal" type="button" onClick={this.sendEmail}>Send</button>
								</div>


              </div>
            </div>
          </div>
        </div>
      </div>
		);

	}

});

module.exports=ViewMailWindow;
