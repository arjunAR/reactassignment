var React=require('react');
var InboxContent=require('./inboxContent');
var allMessagesArray=[];

var TopRight=React.createClass({
	getInitialState:function(){
		return({allInboxMessages:[]});
	},
	render:function(){
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
       beforeSend: function (request)
       {
         request.setRequestHeader("Authorization", "Bearer "+accessToken);
       },
       success: function(data)
       {
         console.log("data inside inbox ajax",data);
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
				 console.log('inside dddd',that.state.allInboxMessages);
         loadedData=true;
       }.bind(that),
       error: function(xhr, status, err) {
         console.error(err.toString());
       }.bind(that)
    });


			return(

				<InboxContent individualMessages={that.state.allInboxMessages} />
			);
		});
		return(
		<div>
		{inboxDetails}
		</div>
		);

	}

});

module.exports=TopRight;
