import React, { Component } from 'react'
function SetIntervalHoc(Com) {
  return class WrappedCom extends Component {
    intervals = []
    componentWillMount() {
      this.intervals = [];
    }
    setInterval() {
      this.intervals.push(setInterval.apply(null, arguments));
    }
    componentWillUnmount() {
      this.intervals.map(clearInterval);
    }

    render() {
      return <Com {...this.props} setInterval={this.setInterval} />
    }
  }
}

class TickTock extends Component {
  state = {
    seconds: 0
  }
  componentDidMount() {
    this.props.setInterval(this.tick, 1000); // Call a method on the mixin
  }
  tick() {
    this.setState({seconds: this.state.seconds + 1});
  }
  render() {
    return (
        <p>
            React has been running for {this.state.seconds} seconds.
        </p>
    );
  }
}

SetIntervalHoc(TickTock)