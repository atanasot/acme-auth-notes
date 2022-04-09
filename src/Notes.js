import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const Notes = ({user, userNotes})=> {
  console.log(user)
  return (
    <div>
      <Link to='/home'>Home</Link>
      <div>
        <h1>Notes for {user.username}</h1>
        <ul>
          {userNotes.map(note => (
            <li key={note.id}>{note.text}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

// start with mapState to Props
// componentDidUpdate() -- look at prevProps --thats how we know that somebody logged in

const mapStateToProps = (state) => {
  const user = state.auth
  const userNotes = state.notes.filter(note => note.id === user.id)
  return {
    user,
    userNotes
  }
}

export default connect(mapStateToProps)(Notes);
