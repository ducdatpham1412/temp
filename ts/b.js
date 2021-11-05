import React from 'react';
import { createRoot } from 'react-dom/client';

function withList(ItemComponent) {
  return null;
}

class Link extends React.Component {
  render() {
    return <a href={ this.props.item.href }>{ this.props.item.text }</a>;
  }
}

const LinkList = withList(Link);

document.body.innerHTML = "<div id='root'></div>";
const rootElement = document.getElementById("root");

if(LinkList) {
  let items = [{ href:"https://www.google.com", text:"Google" },
    { href:"https://www.bing.com", text:"Bing" }];
  const root = createRoot(rootElement);

  root.render(<LinkList items={items} />);
  setTimeout(() => {
    console.log(rootElement.innerHTML);
  });
}