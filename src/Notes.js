import React, {Component} from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { deleteNote } from "./store"



// class Notes extends Component {
//   componentDidMount() {
//     this.props.fetchNotes()
//   }
  
//   render () {
//     const user = this.props.user
//     const userNotes = this.props.userNotes
//     return (
//       <div>
//         <Link to="/home">Home</Link>
//         <div>
//           <h1>Notes for {user.username}</h1>
//           <ul>
//             {userNotes.map((note) => (
//               <li key={note.id}>{note.text}</li>
//             ))}
//           </ul>
//         </div>
//       </div>
//     );
//   }
// };



const Notes = ({ auth, notes, deleteNote }) => {
  return (
    <div>
      <Link to="/home">Home</Link>
      <div>
        <h1>Notes for {auth.username}</h1>
        <ul>
          {notes.map((note) => (
            <li key={note.id}>
            {note.text}
             <button onClick={()=> deleteNote(note)}>X</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

// start with mapState to Props
// componentDidUpdate() -- look at prevProps --thats how we know that somebody logged in

const mapStateToProps = (state) => {
  const {auth} = state
  const {notes} = state
  return {
    auth,
    notes,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    deleteNote: (note) => dispatch(deleteNote(note))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Notes);
