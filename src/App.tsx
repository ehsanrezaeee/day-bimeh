import './App.css'
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import MobileNumberPage from "./pages/MobileNumberPage.tsx";
import VerificationCodePage from "./pages/VerificationCodePage.tsx";
import PersonalInfoPage from "./pages/PersonalInfoPage.tsx";
import AgencyDetailsPage from "./pages/AgencyDetailsPage.tsx";

function App() {

    return (
        <Router>
            <div className="flex items-center justify-center w-full h-full">
                <img className="fixed top-0" src="/images/Rectangle 1.png" alt="Rectangle"/>
                <img className="fixed top-10 z-10" src="/images/logo.svg" alt="Logo"/>

                <Routes>
                    <Route path="/" element={<MobileNumberPage/>}/>
                    <Route path="/verify" element={<VerificationCodePage/>}/>
                    <Route path="/personal-info" element={<PersonalInfoPage/>}/>
                    <Route path="/agency-details" element={<AgencyDetailsPage/>}/>
                </Routes>
            </div>
        </Router>
    )
}

export default App
