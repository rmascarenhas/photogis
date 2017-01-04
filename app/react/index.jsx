var React = require('react');
var ReactDOM = require('react-dom');

const HelloWorld = (props) => {
  return (
    <h1>Hello World</h1>
  );
}

ReactDOM.render(
  <HelloWorld />,
  document.getElementById('container')
);
