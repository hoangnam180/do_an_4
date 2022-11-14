import UserLayout from './layouts/user';
import Home from './pages/home';

function App() {
  return (
    <div className="App">
      <UserLayout>
        <Home />
      </UserLayout>
    </div>
  );
}

export default App;
