
var React = require('react');
var TopLeft=require('./TopLeft');
var TopRight=require('./TopRight');
var loadedData = false;

var GmailBox = React.createClass({
 getInitialState: function()
   {
     return({allLabelsData:[],allInboxId:[]});
   },
 gmailLogin: function()
 {
   console.log("in gmail login function");
   var acToken, tokenType, expiresIn;
   var OAUTHURL    =   'https://accounts.google.com/o/oauth2/v2/auth?';
   var SCOPE       =   'https://mail.google.com/ https://www.googleapis.com/auth/gmail.readonly';
   var CLIENTID    =   '142333401241-2tccbrg4em12u0vh6rdn85qrrvjeb9s9.apps.googleusercontent.com';
   var REDIRECT    =   'http://localhost:8080';
   var TYPE        =   'token';
   var _url        =   OAUTHURL + 'scope=' + SCOPE + '&client_id=' + CLIENTID + '&redirect_uri=' + REDIRECT + '&response_type=' + TYPE;
   var win         =   window.open(_url, "windowname1", 'width=800, height=600');

   var pollTimer   =   window.setInterval(function()
   {

       try
       {
           if (win.document.URL.indexOf(REDIRECT) != -1)
           {
               window.clearInterval(pollTimer);
               var url =   win.document.URL;
               acToken =   gup(url, 'access_token');
               tokenType = gup(url, 'token_type');
               expiresIn = gup(url, 'expires_in');
               localStorage.setItem('gToken',acToken);
               localStorage.setItem('gTokenType',tokenType);
               localStorage.setItem('gExprireIn',expiresIn);
               function gup(url, name) {
                   name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
                   var regexS = "[\\#&]"+name+"=([^&#]*)";
                   var regex = new RegExp( regexS );
                   var results = regex.exec( url );
                   if( results == null )
                       return "";
                   else
                       return results[1];
               }
               win.close();
           }
       }
       catch(e)
       {
         console.log(e);
       }
   }, 500);
   this.allLabels();
   //this.allMailId();
 },
 allMailId: function(label)
 {
   console.log("FINALLL ONCLICKKKKK",label);
   console.log("in allInboxId function");
     var accessToken = localStorage.getItem('gToken');
     $.ajax({
      url: 'https://www.googleapis.com/gmail/v1/users/me/messages?labelIds='+label+'&maxResults=5&key={AIzaSyB5Fugum-RuTDl-zClHEWeyzYjvs48r1tY}',
      dataType: 'json',
      type: 'GET',
      async:false,
      beforeSend: function (request)
      {
        request.setRequestHeader("Authorization", "Bearer "+accessToken);
      },
      success: function(data)
      {

        this.setState({allInboxId:data.messages});
          console.log("MAIL ajax",this.state.allInboxId);
        loadedData=true;
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(err.toString());
      }.bind(this)
   });

 },

 allLabels: function()
 {
   console.log("in all labels function of gmailbox");
     var accessToken = localStorage.getItem('gToken');
     $.ajax({
      url: 'https://www.googleapis.com/gmail/v1/users/me/labels?key={AIzaSyB5Fugum-RuTDl-zClHEWeyzYjvs48r1tY}',
      dataType: 'json',
      type: 'GET',
      async:false,
      beforeSend: function (request)
      {
        request.setRequestHeader("Authorization", "Bearer "+accessToken);
      },
      success: function(data)
      {

        this.setState({allLabelsData:data.labels});
          console.log("LABEL ajax",this.state.allLabelsData);
        loadedData=true;
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(err.toString());
      }.bind(this)
   });
    this.allMailId("INBOX");
 },


 render:function()
 {
   var leftPanel;
   var rightPanel;

console.log("in RENDER of gmailbox");
   if(loadedData){

     leftPanel =<TopLeft data={this.state.allLabelsData} fun={this.allMailId} />;/*<TopLeft data={this.state.allLabelsData}/>*/
     rightPanel=<TopRight inboxId={this.state.allInboxId} />;
   }

     return(
       <div>

       <br/><br/><br/><br/>
       <div className="GmailBox">
           <div className="container-fluid">
             <div className="row">
                 <div className="col-lg-1">

                  </div>
                  <div className="col-lg-8 pull-right">
                    <button id="authorize-button" onClick={this.gmailLogin} className="btn btn-primary pull-right">Login</button>
                      <br/><br/><br/>
                  </div>
              </div>

               <div className="row">
                 <div className="col-lg-2">
                    {leftPanel}
                  </div>
                 <div className="col-lg-10">
                 {rightPanel}
                 </div>
               </div>
         </div>
     </div>
     </div>
   );
 }
 });

module.exports = GmailBox;
