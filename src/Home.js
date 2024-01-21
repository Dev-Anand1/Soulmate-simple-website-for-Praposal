
import './App.css'; // Import the corresponding CSS file

const Home = ({ onClick }) => {
  return (
    <div className="home-container">
      <h1 className="title">Are You My Soulmate?</h1>
      <button className="start-button" onClick={onClick}>
        Let's Find Out
      </button>
    </div>
  );
}

export default Home;

