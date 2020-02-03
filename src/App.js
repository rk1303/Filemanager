import React from 'react';
import './App.css';
import Folder from "./folder";
import PopUp from "./popUp";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showPopUp: false,
      folderList: [{
        name: 'Folder1',
        children: [],
        id: Math.floor(Math.random() * 100)
      }]
    }
  }
  handleClosePopUp = (data) => {
    /*debugger;*/
    let { folderList } = this.state;
    if (data.edited) {
      let index = folderList.findIndex((obj) => obj.id === data.id);
      folderList[index].children = data.children;
    } else {
      folderList.push({ name: data.name, children: data.child, id: data.id });
    }
    this.setState({ folderList, showPopUp: false });
  }
  handleNewPopUp = () => {
    this.setState({ showPopUp: true });
  }
  render() {
    const { folderList, showPopUp } = this.state;
    return (
      <section className="root">
        <section className="container">
          <header className="header">Folders</header>
          <section className="folders">
            {folderList.map((obj, ind) => {
              return <Folder data={obj} key={ind} handleClosePopUp={this.handleClosePopUp} />
            })}
            <section className="addFolder" title="Add new folder" onClick={this.handleNewPopUp}>
              <span>+</span>
            </section>
          </section>

        </section>
        {showPopUp && <PopUp data={null} closePopUp={this.handleClosePopUp} />}
      </section>
    )
  }
}

export default App;