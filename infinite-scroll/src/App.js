import React, { Component } from 'react';

import List from './List';
import './App.css';

const styles = {
  noteList: {
    margin: '10px',
    width: '400px',
    height: '400px',
    border: '1px solid steelBlue',
    overflow: 'scroll',
  },
  note: {
    height: '60px',
    borderBottom: '1px solid cyan'
  },
}

class App extends Component {
  render() {
    const notes = Array.from(Array(200).keys());
    return (
      <div className="App">
        <List
          containerHeight={400}
          elementHeight={60}
          style={styles.noteList}
          className="note-list"
        >
          {notes.map(this.renderItem)}
        </List>
      </div>
    );
  }

  renderItem(note) {
    return (
      <div
        className="note"
        style={styles.note}
        key={note}
      >
        <span>{note}</span>
      </div>
    );
  }
}

export default App;
