import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  let [comments, setComments] = useState(null);
  const [formData, setFormData] = useState({ name: "", message: "" });

  const getComment = async (id) => {
    const response = await fetch(`http://localhost:3001/getComment/${id}`);
    const data = await response.json().catch((error) => {
      console.error("Error:", error);
    });
    return data;
  };

  const submitForm = async (e) => {
    e.preventDefault();

    const response = await fetch("http://localhost:3001/createComment", {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    const data = await response.json().catch((error) => {
      console.error("Error:", error);
    });
    const newComment = await getComment(data.id);
    setComments([...comments, { ...newComment }]);
    e.target.reset();
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    fetch("http://localhost:3001/getComments")
      .then((response) => response.json())
      .then((data) => setComments(data));
  }, []);

  return (
    <div className="App">
      <div className="form-container">
        <form onSubmit={submitForm}>
          <label>Name:</label>
          <input onChange={handleChange} type="text" name="name" />
          <textarea onChange={handleChange} name="message"></textarea>
          <button>Comment</button>
        </form>
      </div>

      <div className="feed-container">
        {comments &&
          comments.map((comment) => (
            <article key={comment.id}>
              <div className="main-message">{comment.message}</div>
              <div className="name-and-created">
                {comment.name} on {comment.created}
              </div>
            </article>
          ))}
      </div>
    </div>
  );
}

export default App;
