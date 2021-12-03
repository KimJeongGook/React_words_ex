import './App.css';
import React, { Component } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Home, NotFound, Word } from './pages';

import Menu from './Menu'
import Sidebar from './Sidebar'
import Button from './Button'

class App extends Component {
  homeMenu = [
    {
      url: "/",
      name: "HOME"
    },
    {
      url: "/words",
      name: "WORD"
    },
  ]
  state = {
    open: false
  }
  showSidebar = () => {
    this.setState({ open: !this.state.open })
  }
  render() {
    const { open } = this.state
    const { homeMenu } = this
    return (
      <div className="App">
        <Button handleClick={this.showSidebar}>Menu</Button>
        <Sidebar open={open}>
          <Menu menus={homeMenu}></Menu>
        </Sidebar>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/words" element={<Word />}>
            <Route path=":wordId" element={<Word />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    );
  }
}

export default App;