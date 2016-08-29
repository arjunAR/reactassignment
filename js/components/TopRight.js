var React=require('react');
var MailDisplay=require('./MailDisplay');


var TopRight=React.createClass({
	getInitialState:function(){
		console.log("in getInitialState of TOPRIGHT");
		return({allInboxMessages:[]});
	},
	 getHTMLPart: function(partsArr)
  {
    for(var i=0;i<=partsArr.length;i++)
    {
      if(typeof partsArr[i].parts === 'undefined')
      {
        if(partsArr[i].mimeType === 'text/html')
        {
          return partsArr[i].body.data;
        }
      }
      else
      {
        return this.getHTMLPart(partsArr[i].parts);
      }
    }
    return '';
  },
	computeMessages:function(){


		var that=this;
		var allMessagesArray=[];

			//console.log("length of array 1",allMessagesArray.length);
		var inboxDetails=that.props.inboxId.map(function(i){
			console.log("inital ID BEFORE AJAX in TOPRIGHT",i.id);
			var subject;
			var from;
			var date;
			var to;
			var accessToken = localStorage.getItem('gToken');
			$.ajax({
			 url: 'https://www.googleapis.com/gmail/v1/users/me/messages/'+i.id+'?key={AIzaSyB5Fugum-RuTDl-zClHEWeyzYjvs48r1tY}',
			 dataType: 'json',
			 type: 'GET',
			 async:false,
			 beforeSend: function (request)
			 {
				 request.setRequestHeader("Authorization", "Bearer "+accessToken);
			 },
			 success: function(data)
			 {
				 //console.log("data inside topright",data);
				 for(var i=0;i<data.payload.headers.length;i++){
					 if(data.payload.headers[i].name=="Subject"){
						 subject=data.payload.headers[i].value;

					 }

					 if(data.payload.headers[i].name=="From"){
						 from=data.payload.headers[i].value;
					 }
					 if(data.payload.headers[i].name=="Date"){
						 date=data.payload.headers[i].value;
					 }
					 if(data.payload.headers[i].name=="To"){
						 to=data.payload.headers[i].value;
					 }
				 }
				 var encodedBody;

				  if(typeof data.payload.parts === 'undefined')
				   {
				     encodedBody = data.payload.body.data;
				   }
				   else
				   {
				     encodedBody = that.getHTMLPart(data.payload.parts);
				   }

					 for(var j=0;j<data.labelIds.length;j++){
						// console.log("000000",j,data.labelIds[j]);
						 if(data.labelIds[j]=="INBOX"){
							// console.log("11111");
							 allMessagesArray.push({"From":from,"Subject":subject,"Date":date,"MessageBody":encodedBody});
							 break;
							}
						 if(data.labelIds[j]=="SENT" || data.labelIds[j]=="DRAFT"){
							 //console.log("2222");
							 allMessagesArray.push({"To":to,"Subject":subject,"Date":date,"MessageBody":encodedBody});
							 break;
						 }
					 }
					 //console.log("ENCODED BODY in TOPRIGHT",encodedBody);

				// console.log("length of array 2",allMessagesArray.length);
				 that.setState({allInboxMessages:allMessagesArray});
				 console.log('final right top ',allMessagesArray);
				 loadedData=true;
			 }.bind(that),
			 error: function(xhr, status, err) {
				 console.error(err.toString());
			 }.bind(that)
		});
return(
	that

		)
	});

	},
	componentWillMount:function(){
			console.log("In componentWillMount of topright");
		this.computeMessages();
	},
	componentWillReceiveProps:function(){
		console.log("In componentWillReceiveProps of topright");
	this.computeMessages();
},
shouldComponentUpdate: function() {
		console.log("In shouldComponentUpdate of topright");
  return true;
},

render:function(){
console.log("In RENDER of TOP RIGHT",this.state.allInboxMessages);
    var manipulateMessage=this.state.allInboxMessages.map(function(mail){
			//console.log("from data inside final render",mail.From);
			if(mail.From){
				//console.log("3333");
				return(
					<MailDisplay from={mail.From} subject={mail.Subject} date={mail.Date} messageBody={mail.MessageBody} />
				)
			}
			if(mail.To){
				//console.log("444444");
				return(
					<MailDisplay from={mail.To} subject={mail.Subject} date={mail.Date} messageBody={mail.MessageBody} />
				)
			}


		});
		return(
		<div>
		<div className="container-fluid">
			<div className="row">
				<div className="col-lg-12">
						<table className="test table">
							<thead>
								<tr className="col-lg-12">
									<th className="col-lg-4">Recepient</th>
									<th className="col-lg-4">Subject</th>
									<th className="col-lg-4">Date</th>
								</tr>
							</thead>

							<tbody>
								{manipulateMessage}
							</tbody>
						</table>
				</div>
			</div>
		</div>
		</div>
		);
	}
});

module.exports=TopRight;
