var React=require('react');

var About=React.createClass({
  render:function(){
    return(
      <div>
        <h1>Google us at www.google.com _{this.props.params.aboutName} </h1>
      </div>
    );
  }
});

module.exports=About;
