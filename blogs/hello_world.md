# react

---

## start
> ### 一. 
1.jsx
```javascript
const element = <h1>Hello, world!</h1>;
```
>2.jsx嵌入表达式
```javascript
function formatName(user) {
  return user.firstName + ' ' + user.lastName;
}

const user = {
  firstName: 'Harper',
  lastName: 'Perez'
};

const element = (
  <h1>
    Hello, {formatName(user)}!
  </h1>
);

ReactDOM.render(
  element,
  document.getElementById('root')
);
```
>3.jsx本身就是表达式
```javascript
function getGreeting(user) {
  if (user) {
    return <h1>Hello, {formatName(user)}!</h1>;
  }
  return <h1>Hello, Stranger.</h1>;
}
```
>4.jsx指定属性
```javascript
//用双引号
const element = <div tabIndex="0"></div>;
//用表达式
const element = <img src={user.avatarUrl}></img>;
```
>5.jsx指定子类
```javascript
const element = (
  <div>
    <h1>Hello!</h1>
    <h2>Good to see you here.</h2>
  </div>
);
```
>6.渲染元素
ReactDOM.render()
>7. 组件
```javascript
//方法组件
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}
//类组件
class Welcome extends React.Component {
  render() {
    return <h1>Hello, {this.props.name}</h1>;
  }
}
```
>8.渲染组件
```javascript
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}

const element = <Welcome name="Sara" />;
ReactDOM.render(
  element,
  document.getElementById('root')
);
```
>9.组件包含其他组件
```javascript
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}

function App() {
  return (
    <div>
      <Welcome name="Sara" />
      <Welcome name="Cahal" />
      <Welcome name="Edite" />
    </div>
  );
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
```
>10.状态和生命周期
```javascript
class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {date: new Date()};
  }

  componentDidMount() {
    this.timerID = setInterval(
      () => this.tick(),
      1000
    );
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick() {
    this.setState({
      date: new Date()
    });
  }

  render() {
    return (
      <div>
        <h1>Hello, world!</h1>
        <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
      </div>
    );
  }
}

ReactDOM.render(
  <Clock />,
  document.getElementById('root')
);

//不要直接修改state
// Wrong
this.state.comment = 'Hello';
//正确修改state方法
this.setState({comment: 'Hello'});
```
>11.state更新可能是异步的
>12.事件处理
```javascript
 // react事件名称是驼峰命名
<button onClick={activateLasers}>
  Activate Lasers
</button>
//阻止事件的默认行为必须用preventDefault ，不能return false
function ActionLink() {
  function handleClick(e) {
    e.preventDefault();
    console.log('The link was clicked.');
  }

  return (
    <a href="#" onClick={handleClick}>
      Click me
    </a>
  );
}
```
>13.有条件渲染
```javascript
//if 或者 条件运算符 && ||等
//三目运算
```
>14.列表和key
```javascript
function NumberList(props) {
  const numbers = props.numbers;
  const listItems = numbers.map((number) =>
    <li key={number.toString()}>
      {number}
    </li>
  );
  return (
    <ul>{listItems}</ul>
  );
}

const numbers = [1, 2, 3, 4, 5];
ReactDOM.render(
  <NumberList numbers={numbers} />,
  document.getElementById('root')
);
```
>15.
 







