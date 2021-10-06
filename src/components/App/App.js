import './App.scss';
import Game from '../Game/Game'
import TitleBar from '../TitleBar/TitleBar'

function App() {
  // for now i'll just keep it simple until the game is functioning, then i'll beautify the page itself
  return (
    <div className="App">
      <TitleBar />
      <Game />
      <a href="http://github.com/paulLeClair/pacman-js" target="_blank">github repo</a>
    </div>
  );
}

export default App;