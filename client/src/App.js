import "./App.css";
import { useEffect, useState } from "react";

export default function App() {
  const [input, setInput] = useState("");
 // const [error, setError] = useState(false);
  const [notes,setNotes] = useState([])


  const submitHandler = async (e) => {
    
    e.preventDefault();
    
    
    // if (!input) {
    //   setError(true);
    //   return false;
      
    // }
    let result = await fetch("http://localhost:5000/notes", {
      method: "post",
      body: JSON.stringify({ input }),
      headers: {
        "Content-type": "application/json",
      },
    });
    result = await result.json();
    console.warn(result);
    
  };
  

  const getNotes = async () => {
    let result = await fetch("http://localhost:5000/notes", {
    //   headers: {
    //     authorization: JSON.parse(localStorage.getItem("token")),
    //   },
    });
    result = await result.json();
    setNotes(result);
  }
  useEffect(()=>{
    getNotes()
  })

  //delete
  const deleteNotes = async (id) => {
    console.warn(id)
    let result = await fetch(`http://localhost:5000/notes/${id}`, {
        method: "Delete"
    });
    result = await result.json();
    if (result) {
        getNotes();
    }
}


  return (
    <div className="App">
      <div className="navbar">
        <h2>Note App</h2>
      </div>
      <input
        placeholder="enter a note"
        onChange={(e) => setInput(e.target.value)}
      />
      <button onClick={submitHandler}>Add</button>
      
      {notes.length>0 ? notes.map((item, index) => 
        <ul key={item._id}>
          <li>{index + 1}</li>
          <li>{item.input}</li>
          <button onClick={()=>deleteNotes(item._id)}>delete</button>
        </ul>
      ) 
      :<h3>notes not found</h3> 
     }
  
    </div>
  );
}

