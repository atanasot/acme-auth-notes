import React, {Component} from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchNotes } from "./store";

// not getting the correct note to be associated with the user
// before it was just notes, not userNotes
class Notes extends Component {
  componentDidMount() {
    this.props.fetchNotes()
  }
  
  render () {
    //console.log(this.props)
    const user = this.props.user
    const userNotes = this.props.userNotes
    return (
      <div>
        <Link to="/home">Home</Link>
        <div>
          <h1>Notes for {user.username}</h1>
          <ul>
            {userNotes.map((note) => (
              <li key={note.id}>{note.text}</li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
};



// const Notes = ({ user, userNotes }) => {
//   // console.log(user)
//   // console.log(userNotes)
//   let token = window.localStorage.getItem("token");
//   console.log(token);
//   return (
//     <div>
//       <Link to="/home">Home</Link>
//       <div>
//         <h1>Notes for {user.username}</h1>
//         <ul>
//           {userNotes.map((note) => (
//             <li key={note.id}>{note.text}</li>
//           ))}
//         </ul>
//       </div>
//     </div>
//   );
// };

// start with mapState to Props
// componentDidUpdate() -- look at prevProps --thats how we know that somebody logged in

const mapStateToProps = (state) => {
  console.log(state)
  const user = state.auth;
  const userNotes = state.notes;
  return {
    user,
    userNotes,
  };
};

const mapDispatchToProps = (dispatch) => {
  let token = window.localStorage.getItem("token");
  console.log(token);
  return {
    token,
    fetchNotes: () => dispatch(fetchNotes())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Notes);
