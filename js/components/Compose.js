var React=require('react');

var Compose=React.createClass({
	getInitialState:function(){
		return({to:'',subject:'',msgBody:''});
	},
	handleTo:function(e){
		this.setState({to:e.target.value});
	},
	handleSubject:function(e){
		this.setState({subject:e.target.value});
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
		<button href="#modalwindow" className="btn btn-danger btn-block" data-toggle="modal">Compose</button>
					<div className="modal fade" id="modalwindow">
						<div className="modal-dialog">
						   <div className="modal-content">
						      <div className="modal-header">
						         <button className="close" data-dismiss="modal"><span className="glyphicon glyphicon-remove"></span></button>
						         <h4 className="modal-title">Compose Mail</h4>
						      </div>
						      <div className="modal-body">
						         <p className="text-muted"></p>
						         <form className="form-horizontal">
						            <div className="form-group">
						               <label className="col-lg-2 control-label" for="inputName">To</label>
						               <div className="col-lg-10">
						                  <input className="form-control" type="text" id="inputName" value={this.state.to} onChange={this.handleTo} placeholder="Enter the receipient" />
						               </div>
						            </div>
						            <div className="form-group">
						               <label className="col-lg-2 control-label" for="inputSubject">Subject</label>
						               <div className="col-lg-10">
						                  <input className="form-control" type="text" id="inputSubject" value={this.state.subject} onChange={this.handleSubject} placeholder="Enter the subject" />
						               </div>
						            </div>

						            <div className="form-group">
						               <label className="col-lg-2 control-label" for="inputMessage">Message Body</label>
						               <div className="col-lg-10">
						                  <textarea className="form-control" type="text" id="inputMessage" value={this.state.msgBody} onChange={this.handleBody} placeholder="Enter the mail" rows="8"></textarea>
						               </div>
						            </div>
						         </form>
						      </div>
						      <div className="modal-footer">
						         <button className="btn btn-default" data-dismiss="modal">Close</button>
						         <button className="btn btn-success" onClick={this.sendEmail} data-dismiss="modal">Send</button>
						      </div>
						   </div>
						</div>
						</div>

		</div>
		);

	}

});

module.exports=Compose;
