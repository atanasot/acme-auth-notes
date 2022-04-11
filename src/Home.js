import React, { Component } from "react";
import { connect } from "react-redux";
import { logout, fetchNotes } from "./store";
import { Link } from "react-router-dom";


class Home extends Component {
  componentDidMount() {
    this.props.fetchNotes();
  }

  render() {
    const { auth, logout, notes } = this.props;
    return (
      <div>
        Welcome {auth.username}
        <button onClick={logout}>Logout</button>
        <div>
          You have added {notes.length} notes.
          <br />
          <Link to="/notes">Access and Add Notes</Link>
        </div>
      </div>
    );
  }
}

// const Home = ({ auth, logout, notesPerUser})=> {

//   return (
//     <div>
//       Welcome { auth.username }
//       <button onClick={ logout }>Logout</button>
//       <div>
//         You have added { notesPerUser.length } notes.
//         <br />
//         <Link to='/notes'>Access and Add Notes</Link>
//       </div>
//     </div>
//   );
// };

const mapStateToProps = (state) => {
  const {notes} = state
  const {auth} = state
  return {
    notes,
    auth,
  };
};
const mapDispatch = (dispatch) => {
  return {
    logout: () => {
      return dispatch(logout());
    },
    fetchNotes: () => dispatch(fetchNotes()),
  };
};

export default connect(mapStateToProps, mapDispatch)(Home);
