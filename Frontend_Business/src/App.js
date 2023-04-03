import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import BizSignUp from './BizSignUp';
import AddNewListing from './AddNewListing';
import BizViewListing from './BizViewListing';
import LoginForm from './LoginForm';
import BizNavBar from './BizNavBar';
import { useState, useEffect } from 'react';

import AuthStateObserver from './Global/AuthStateObserver';

function App() {
  AuthStateObserver();

  const [authenticated, setAuthenticated] = useState(localStorage.getItem('authenticated') === 'true');

  useEffect(() => {
    setAuthenticated(localStorage.getItem('authenticated') === 'true');
  }, []);

  return (
    <Router>
      <div className="App">
        <div className = "content">
          <Routes>
            <Route path ="/" element = {<LoginForm/>}/>
            <Route path ="/bizsignup" element = {<BizSignUp/>}/>
            <Route path ="/addnewlisting" element = {<AddNewListing/>}/>
            <Route path ="/viewlisting" element = {<BizViewListing/>}/>
          </Routes>
        </div>
      </div> 
    </Router>
  );
}

export default App;
