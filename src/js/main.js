
var React = require('react');
var ReactDOM = require('react-dom');
/*
ReactDOM.render(
    React.DOM.h1(null,"Hello World!"),
    document.getElementById('example')
);
*/

console.log(React);

var Hello = React.createClass({
    render: function () {
        return (
            <div>
                <h1>Hello World</h1>
                <p>This is some text</p>
            </div>
        )
    }
});

ReactDOM.render(
    <Hello name="World" />,
    document.getElementById('example')
);

/*
console.log(React.DOM);

ReactDOM.render(
    React.DOM.p(null, "Hello World!"),
    document.getElementById('example')
);
*/