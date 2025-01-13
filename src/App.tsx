import './App.css'
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import MobileNumberPage from "./pages/MobileNumberPage.tsx";
import VerificationCodePage from "./pages/VerificationCodePage.tsx";
import PersonalInfoPage from "./pages/PersonalInfoPage.tsx";
import AgencyDetailsPage from "./pages/AgencyDetailsPage.tsx";
import Results from "./pages/result.tsx";

function App() {

    return (
        <Router>
            <div className="bg-gray-200 flex items-center justify-center w-[375px] h-screen">
                <img className="fixed top-0" src="/images/Rectangle 1.png" alt="Rectangle"/>
                <img className="fixed top-10 z-10" src="/images/logo.svg" alt="Logo"/>

                <Routes>
                    <Route path="/" element={<MobileNumberPage/>}/>
                    <Route path="/verify" element={<VerificationCodePage/>}/>
                    <Route path="/personal-info" element={<PersonalInfoPage/>}/>
                    <Route path="/agency-details" element={<AgencyDetailsPage/>}/>
                    <Route path="/result" element={<Results/>}/>
                </Routes>
            </div>
        </Router>
    )
}

export default App
