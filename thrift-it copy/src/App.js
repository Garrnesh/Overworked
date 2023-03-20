import Navbar from './Navbar';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignUp from './SignUp';
import AddNewAddress from './AddNewAddress';
import PayAddress from './PayAddress';
import BuyerSettings from './BuyerSetting';
import SavAddress from './SavAddress';
import AddNewPayment from './AddNewPayment';
import Payment from './Payment';
import SavPayment from './SavPayements';
import Profile from './Profile';
import Password from './Password';
function App() {
  return (
    <Router>
      <div className="App">
        <Navbar/>
        <div className = "content">
          <Routes>
            <Route path ="/signup" element = {<SignUp/>}/>
            <Route path ="/addnewaddress" element = {<AddNewAddress/>}/>
            <Route path ="/payaddress" element = {<PayAddress/>}/>
            <Route path ="/buyersettings" element = {<BuyerSettings/>}/>
            <Route path ="/savaddress" element = {<SavAddress/>}/>
            <Route path ="/addnewpayment" element = {<AddNewPayment/>}/>
            <Route path ="/payment" element = {<Payment/>}/>
            <Route path ="/savpayment" element = {<SavPayment/>}/>
            <Route path ="/profile" element = {<Profile/>}/>
            <Route path ="/password" element = {<Password/>}/>

          </Routes>
        </div>
      </div> 
    </Router>
  );
}

export default App;
