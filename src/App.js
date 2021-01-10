import { Grid, makeStyles, Paper } from "@material-ui/core";
import { useEffect, useRef, useState } from "react";
import "./App.css";
import TagsInput from "./components/TagInput";

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: "10px",
  },
  paper: {
    padding: theme.spacing(2),
    color: theme.palette.text.secondary,
    backgroundColor: "#f2f2f2",
    height: "320px",
    overflowY: "scroll",
  },
}));

function App() {
  const classes = useStyles();
  const [cities, setCities] = useState([]);
  const selectedTags = (tags) => setCities(tags);
  const [activities, setActivities] = useState([]);
  const activitiesRef = useRef(null);
  // let prev = 0;
  // let page = 0;

  useEffect(() => {
    fetch("https://my-json-server.typicode.com/rivitest001/task04/posts")
      .then((response) => response.json())
      .then((act) => {
        setActivities((a) => [...a, ...act]);
      });
    fetch("https://my-json-server.typicode.com/rivitest001/task03/posts")
      .then((response) => response.json())
      .then((act) => {
        setActivities((a) => [...a, ...act]);
      });
    fetch("https://my-json-server.typicode.com/rivitest001/task02/posts")
      .then((response) => response.json())
      .then((act) => {
        setActivities((a) => [...a, ...act]);
      });
    fetch("https://my-json-server.typicode.com/rivitest001/task01/posts")
      .then((response) => response.json())
      .then((act) => {
        setActivities((a) => [...a, ...act]);
      });
  }, []);

  // const handleScroll = (e) => {
  //   console.log(e);
  //   if (e.target.scrollTop > prev) {
  //     activitiesRef.current.scrollTo(0,(page + 1) * 300);
  //     page++;
  //   } else {
  //     activitiesRef.current.scrollTo(0,(page - 1) * 300)
  //     page--;
  //   }
  //   prev = page*300
  // };

  return (
    <div className="App">
      <TagsInput selectedTags={selectedTags} />
      <Grid container spacing={3} className={classes.container}>
        <Grid item xs={6}>
          <Paper elevation={0} className={classes.paper} square>
            {cities.map((city, i) => (
              <p key={i} style={{ padding: "5px 0" }}>
                {city}
              </p>
            ))}
            {cities.length === 0 && <p>No City Selected</p>}
          </Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper
            elevation={0}
            className={classes.paper}
            square
            ref={activitiesRef}
            // onScroll={(e) => handleScroll(e)}
          >
            {activities.map((act) => (
              <p key={act.id} style={{ padding: "5px 0" }}>
                {act.activity}
              </p>
            ))}
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}

export default App;
