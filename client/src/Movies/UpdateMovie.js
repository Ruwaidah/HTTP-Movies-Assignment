import React, { useState, useEffect } from "react";
import axios from "axios";

export default function UpdateMovie(props) {
  console.log(props.movie);
  const [values, setValues] = useState(props.movie);
  const handleChange = event => {
    event.preventDefault();
    setValues({ ...values, [event.target.name]: event.target.value });
    if (event.target.name == "stars") {
      console.log(event.target.value.split(","));
      setValues({
        ...values,
        [event.target.name]: event.target.value.split(",")
      });
    }
  };
  const onSubmit = event => {
    event.preventDefault();
    props.onSubmit(values, props.history);
  };

  console.log(props);
  return (
    <div>
      <form onSubmit={onSubmit}>
        <label>title:</label>
        <input name="title" value={values.title} onChange={handleChange} />
        <label>director:</label>
        <input
          name="director"
          value={values.director}
          onChange={handleChange}
        />
        <label>metascore:</label>
        <input
          name="metascore"
          value={values.metascore}
          onChange={handleChange}
        />
        <label>stars:</label>

        <input
          name="stars"
          value={values.stars.toString()}
          onChange={handleChange}
        />

        <button>Edite</button>
      </form>
    </div>
  );
}
