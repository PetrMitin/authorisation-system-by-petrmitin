import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './App.css';
import InfoPage from './components/infoPage';
import SignInForm from './components/signInForm';
import { checkIfSignedIn } from './utils/authorisationService';

function App() {
  const dispatch = useDispatch()
  const isSignedIn = useSelector(state => state.generalState.isSignedIn)

  useEffect(() => {
    if (localStorage.getItem('token')) {
      checkIfSignedIn(dispatch)
    }
  }, [])

  return (
    <div className="App">
      {isSignedIn ? 
      <InfoPage /> : 
      <SignInForm />}
    </div>
  );
}

export default App;
