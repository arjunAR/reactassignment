var React=require('react');
var ReactDOM=require('react-dom');

var Header=React.createClass({
  render:function(){
    return(
      <div>
        <tr><th colSpan="2">{this.props.category}</th></tr>
      </div>

    );
  }
});

var Content=React.createClass({
  render:function(){
    return(
      <div>
        <tr>
          <td>{this.props.name}</td>
          <td>{this.props.price}</td>
        </tr>
      </div>

    );
  }
});

var ElementTable=React.createClass({
  render:function(){
    var rows=[];
    var lastCategory=null;
    this.props.products.forEach(function(p){
      console.log(p.name);
      console.log(this.props.data);
      console.log(p.name.indexOf(this.props.data));
      if(p.name.indexOf(this.props.data)==-1){
        return;
      }
      if(p.category!==lastCategory){
        rows.push(<Header category={p.category} />);
      }
      rows.push(<Content name={p.name} price={p.price} />);
      lastCategory=p.category;
    }.bind(this));
    return(
      <div>
      <table>
        <thead>
          <tr>
            <th>Nameee</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {rows}
        </tbody>
      </table>
      </div>
    );
  }
});

var Search=React.createClass({
  handleData:function(){
    this.props.handle(this.refs.inputText.value);
  },
  render:function(){
    return(
      <div>
        <input type="textbox" ref="inputText" value={this.props.data} onChange={this.handleData} placeholder="search.."/>
      </div>

    );
  }
});


var MyComponent=React.createClass({
  getInitialState:function(){
    return{
      data:''
    }
  },
  handleElement:function(dd){
    this.setState({data:dd});
  },
  render:function(){
    return(
      <div>
        <Search data={this.state.data} handle={this.handleElement}/>
        <ElementTable data={this.state.data} products={this.props.products}/>
      </div>

    );
  }
});

var PRODUCTS = [
  {category: 'Sporting Goods', price: '$49.99', stocked: true, name: 'Football'},
  {category: 'Sporting Goods', price: '$9.99', stocked: true, name: 'Baseball'},
  {category: 'Sporting Goods', price: '$29.99', stocked: false, name: 'Basketball'},
  {category: 'Electronics', price: '$99.99', stocked: true, name: 'iPod Touch'},
  {category: 'Electronics', price: '$399.99', stocked: false, name: 'iPhone 5'},
  {category: 'Electronics', price: '$199.99', stocked: true, name: 'Nexus 7'}
];

ReactDOM.render(<MyComponent products={PRODUCTS}/>,document.getElementById('app'));
