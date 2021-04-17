import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import axios from 'axios';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';

class AutocompleteCity extends React.Component {
  state = {
    TimezoneData: [],
    CurrentTime: '',
  };
  componentDidMount() {
    axios
      .get(`http://worldtimeapi.org/api/timezone/`, {
        headers: {},
      })
      .then((resp) => {
        console.log(resp.data);
        this.setState({ TimezoneData: resp.data });
      });
  }

  handleSubmit = (newValue) => {
    axios
      .get(`http://worldtimeapi.org/api/timezone/${newValue}`, {
        headers: {},
      })
      .then((resp) => {
        this.props.onSubmit(resp.data.datetime);
        this.setState({ CurrentTime: resp.data.datetime });
        this.postTime();
      });
  };

  postTime() {
    axios
      .get(`http://xxx/clock/${this.state.CurrentTime}`, {
        headers: {},
      })
      .then((resp) => {
        console.log(resp.data);
      });
  }

  render() {
    return (
      <div>
        <Autocomplete
          className="pding"
          id="combo-box-demo"
          onChange={(event, newValue) => {
            this.handleSubmit(newValue);
          }}
          options={this.state.TimezoneData}
          getOptionLabel={(option) => option}
          style={{ width: 300 }}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Auto Complete"
              variant="outlined"
              fullWidth
            />
          )}
        />
      </div>
    );
  }
}

class Time extends React.Component {
  render() {
    return (
      <div>
        <div className="name">{this.props.time}</div>
      </div>
    );
  }
}

class App extends React.Component {
  state = {
    time: [],
  };

  getTime = (timeData) => {
    this.setState(() => ({
      time: timeData,
    }));
  };

  render() {
    return (
      <div>
        <div className="header">{this.props.title}</div>
        <AutocompleteCity onSubmit={this.getTime} />
        <Time time={this.state.time} />
      </div>
    );
  }
}
ReactDOM.render(<App title="Times" />, document.getElementById('root'));
