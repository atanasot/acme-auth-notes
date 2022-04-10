import React from 'react';
import { connect } from 'react-redux';
import { logout } from './store';
import { Link } from 'react-router-dom';

// make into class and put fetchNotes here

const Home = ({ auth, logout, notesPerUser})=> {
  //console.log(notes) all 3 notes are here

  // componentDidUpdate here to see the updated list of notes?
  // componentDidUpdate(prevProps) {   // this will tell us if user is logged in / we added this
  //   if (!prevProps.auth.id && this.props.auth.id) {
  //     console.log('user just logged in')
  //     console.log(prevProps.auth)
  //     console.log(this.props.auth)
  //     this.setState({
  //       username: this.props.auth.username,
  //       notes: this.props.notes
  //     })
  //   }
  // }



  return (
    <div>
      Welcome { auth.username }
      <button onClick={ logout }>Logout</button>
      <div>
        You have added { notesPerUser.length } notes.
        <br />
        <Link to='/notes'>Access and Add Notes</Link>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  const auth = state.auth
  const notesPerUser = state.notes.filter(note => note.userId === auth.id)
  return {
    notesPerUser,
    auth
  }
}
const mapDispatch = (dispatch)=> {
  return {
    logout: ()=> {
      return dispatch(logout());
    }
  }
}


export default connect(mapStateToProps, mapDispatch)(Home);
