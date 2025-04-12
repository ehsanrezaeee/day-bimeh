import './App.css'
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import MobileNumberPage from "./pages/MobileNumberPage.tsx";
import VerificationCodePage from "./pages/VerificationCodePage.tsx";
import PersonalInfoPage from "./pages/PersonalInfoPage.tsx";
import AgencyDetailsPage from "./pages/AgencyDetailsPage.tsx";
import Results from "./pages/result.tsx";
import Layout from "./components/ui/Layout.tsx";

function App() {

    return (
        <Router>
                <Routes>
                    <Route element={<Layout />}>
                        <Route path="/" element={<MobileNumberPage/>}/>
                        <Route path="/verify" element={<VerificationCodePage/>}/>
                        <Route path="/personal-info" element={<PersonalInfoPage/>}/>
                        <Route path="/agency-details" element={<AgencyDetailsPage/>}/>
                        <Route path="/result" element={<Results/>}/>
                    </Route>
                </Routes>
        </Router>
    )
}

export default App
