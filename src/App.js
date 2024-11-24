import logo from "./logo.svg";
import "./App.css";
import { HomePage } from "./Page/HomePage";

function App() {

  const styles = {
    mainContainer: {
      height: "100hv",
      width: "100%",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    }
  };

  return (
    <div className="App" style={styles.mainContainer} >
      <HomePage />
    </div>
  );
}

export default App;
