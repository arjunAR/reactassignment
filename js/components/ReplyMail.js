var React=require('react');

var ReplyMail=React.createClass({
	getInitialState:function(){
		return({to:this.props.receipient,subject:this.props.subject,msgBody:''});
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
				 this.setState({to:'',subject:'',msgBody:''});

		 }.bind(this),
		 error: function(xhr, status, err) {
			 console.error(err.toString());
		 }.bind(this)
	});

	},
	render:function(){


		return(
		<div>

					<div className="modal fade" id="myModal">
						<div className="modal-dialog">
						   <div className="modal-content">
						      <div className="modal-header">
						         <button className="close" onClick={this.props.hideReply} data-dismiss="modal"><span className="glyphicon glyphicon-remove"></span></button>
						         <h4 className="modal-title">Reply Mail</h4>
						      </div>
						      <div className="modal-body">
						         <p className="text-muted"></p>
						         <form className="form-horizontal">
						            <div className="form-group">
						               <label className="col-lg-12 control-label" for="inputName">To :</label>{this.state.to}

						            </div>
						            <div className="form-group">
						               <label className="col-lg-12 control-label" for="inputSubject">Subject :</label>{this.state.subject}

						            </div>

						            <div className="form-group">
						               <label className="col-lg-2 control-label" for="inputMessage">Message Body</label>
						               <div className="col-lg-10">
						                  <textarea className="form-control" type="text" id="inputMessage" onChange={this.handleBody} placeholder="Enter the mail" rows="8"></textarea>
						               </div>
						            </div>
						         </form>
						      </div>
						      <div className="modal-footer">
						         <button className="btn btn-default" onClick={this.props.hideReply} data-dismiss="modal">Close</button>
						         <button className="btn btn-success" onClick={this.sendEmail} data-dismiss="modal">Send Mail</button>
						      </div>
						   </div>
						</div>
						</div>

		</div>
		);

	}

});

module.exports=ReplyMail;
