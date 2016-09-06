var React=require('react');
var ViewSavedMail=require('./ViewSavedMail');
var Home=React.createClass({
  getInitialState:function(){
    return({getData:[],updateData:'',deleteData:''});
  },
  componentDidMount:function(){
    $.ajax({
     url: '/getData',
     dataType: 'json',
     type: 'GET',
     success: function(data)
     {
       this.setState({getData:data});
       console.log("Success of HOME",data.length);
     }.bind(this),
     error: function(xhr, status, err) {
       console.error(err.toString());
     }.bind(this)
  });

  },

  render:function(){

    var iterateData=this.state.getData.map(function(dataa){

      return(
        <ViewSavedMail msgID={dataa._id} msgRecipient={dataa.msgRecipient} msgSubject={dataa.msgSubject} msgBody={dataa.msgBody} />
      )
    });

    return(
      <div>
        <h1>Welcome to the all new gmail app...</h1>
        <h1>Wanna change your saved mails?? click on the mail to update or delete :)</h1>

        <div className="container-fluid">
    			<div className="row">
    				<div className="col-lg-12">
    						<table className="test table">
    							<thead>
    								<tr className="col-lg-12">
    									<th className="col-lg-6">Recepient</th>
    									<th className="col-lg-6">Subject</th>

    								</tr>
    							</thead>

    							<tbody>
    								{iterateData}
    							</tbody>
    						</table>
    				</div>
    			</div>
    		</div>

      </div>
    );
  }
});

module.exports=Home;
