import './App.scss';
import Game from '../Game/Game'
import TitleBar from '../TitleBar/TitleBar'

function App() {
  return (
    <div className="App">
      <TitleBar />
      <Game />
      <a href="http://github.com/paulLeClair/pacman-js">github</a>
    </div>
  );
}

export default App;