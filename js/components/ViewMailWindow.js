var React=require('react');
var ViewMailWindow=React.createClass({



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
								 <button className="close" data-dismiss="modal"><span className="glyphicon glyphicon-remove"></span></button>

                <h2 className="modal-title">{this.props.subject}</h2>
              </div>

              <div className="modal-body">

                <form  className="form-horizontal">

                  <div className="form-group">
                    <div className="col-lg-12">
											<label className="control-label" for="frmVal">Recepient </label> :{this.props.from}
                    </div>
                  </div>

                  <div className="form-group">
                    <div className="col-lg-12">
											<label className="control-label" for="date">On </label> :{this.props.date}
                    </div>
                  </div>

									<div className="form-group">
                    <div className="col-lg-12">
											<label className="control-label" for="subjVal">For </label> :{this.props.subject}
                    </div>
                  </div>

                  <iframe className="col-md-12" id="iframe-message" ref="myIframe"></iframe>
                </form>
              </div>

              <div className="modal-footer">
                <button className="btn btn-warning" data-dismiss="modal" type="button">Reply</button>
              </div>
            </div>
          </div>
        </div>
      </div>
		);

	}

});

module.exports=ViewMailWindow;
