// 抽象升级

class TicTok extends Component {
  render() {
    <SetInterVal timeout={1000}>
      {(seconds) => (
        <p>
            React has been running for {seconds} seconds.
        </p>
      )}
    </SetInterVal>
  }
    
}