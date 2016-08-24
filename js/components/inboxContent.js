var React=require('react');
var MailDisplay=require('./MailDisplay');


var InboxContent=React.createClass({
  render:function(){
    var manipulateInbox=this.props.individualMessages.map(function(msg){
      console.log("in finallll from",msg.From);
        return(
          <MailDisplay from={msg.From} subject={msg.Subject} date={msg.Date}/>
        );
    });
    return(
      <div>
      <h4>RIGHT</h4>
        {manipulateInbox}
      </div>
    )
  }

});

module.exports=InboxContent;
