import React, { useEffect, useState, useRef } from "react";
import { Paper } from "@material-ui/core";
import useSuggestions from "../hooks/useSuggestions";
import "./tag.css";
import { Close as CloseIcon } from "@material-ui/icons";

const TagsInput = (props) => {
  const [tags, setTags] = useState([]);
  const [cities, setCities] = useState([]);
  const [suggestions, refreshSuggestions] = useSuggestions(cities);
  const inputRef = useRef(null);
  const [input, setInput] = useState("");
  const getData = () => {
    fetch("city.json", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((response) => response.json())
      .then((citiesJson) => setCities(citiesJson.cities.map((c) => c.name)));
  };
  useEffect(() => {
    getData();
  }, []);

  const addTags = (tag) => {
    setTags([...tags, tag]);
    props.selectedTags([...tags, tag]);
    setInput("");
    refreshSuggestions("");
    inputRef.current.focus();
    setCities([...cities.filter((city) => city !== tag)]);
  };
  const removeTags = (index) => {
    setCities([...cities, tags[index]]);
    const st = [...tags.filter((tag) => tags.indexOf(tag) !== index)];
    props.selectedTags(st);
    setTags(st);
  };

  return (
    <>
      <div className="tags-input">
        <ul id="tags">
          {tags.map((tag, index) => (
            <Paper
              elevation={0}
              className="tag"
              square
              style={{ backgroundColor: "#e8f5fe" }}
              key={index}
            >
              <span className="tag-title">{tag}</span>
              <CloseIcon
                onClick={() => removeTags(index)}
                style={{ cursor: "pointer" }}
              />
            </Paper>
          ))}
        </ul>
        <input
          type="text"
          style={{ flex: 1 }}
          value={input}
          ref={inputRef}
          onChange={(e) => {
            setInput(e.target.value);
            refreshSuggestions(e.target.value);
          }}
        />
      </div>
      {suggestions.length > 0 && (
        <div className="suggestion">
          {suggestions.map((s, i) => (
            <div key={i}>
              <p className="options" onClick={(e) => addTags(s)}>
                {s}
              </p>
            </div>
          ))}
        </div>
      )}
      {suggestions.length === 0 && input.length > 0 && (
        <div className="suggestion">
          <p className="options">No Result Found</p>
        </div>
      )}
    </>
  );
};
export default TagsInput;
