var React=require('react');
var MailDisplay=require('./MailDisplay');
var allMessagesArray=[];

var TopRight=React.createClass({
	getInitialState:function(){
		return({allInboxMessages:[]});
	},
	componentWillMount:function(){
		console.log("In componentDidMount of topright");
		var that=this;
		var inboxDetails=that.props.inboxId.map(function(i){

			var subject;
			var from;
			var date;
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
         console.log("data inside topright",data);
				 for(var i=0;i<data.payload.headers.length;i++){
					 if(data.payload.headers[i].name=="Subject"){
						 subject=data.payload.headers[i].value;

					 }
					 console.log("in subbbb",subject);
					 if(data.payload.headers[i].name=="From"){
						 from=data.payload.headers[i].value;
					 }
					 if(data.payload.headers[i].name=="Date"){
						 date=data.payload.headers[i].value;
					 }
				 }
				 allMessagesArray.push({"From":from,"Subject":subject,"Date":date});
         that.setState({allInboxMessages:allMessagesArray});
				 console.log('final right top ',that.state.allInboxMessages);
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
	render:function(){
console.log("In RENDER of TOP RIGHT");
    var manipulateMessage=this.state.allInboxMessages.map(function(mail){
			//console.log("from data inside final render",mail.From);
				return(
					<MailDisplay from={mail.From} subject={mail.Subject} date={mail.Date} />

)

		});
		return(
		<div>
			<table className="test" cellspacing="25" cellpadding="25">

					<tr>
						<th>From</th>
						<th>Subject</th>
						<th>Date</th>
					</tr>

					{manipulateMessage}

			</table>
		</div>
		);
	}
});

module.exports=TopRight;
