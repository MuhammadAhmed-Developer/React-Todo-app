import './App.scss';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle'
import  Routes  from './pages/Routes';
import AuthContextProvider from './context/AuthContext';

function App() {
  return (
    <AuthContextProvider>
      <Routes/>
    </AuthContextProvider>
  );
}

export default App;
