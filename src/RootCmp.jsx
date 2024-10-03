
import { AppHeader } from './cmps/AppHeader.jsx'
import { AppFooter } from './cmps/AppFooter.jsx'
import { Home } from './pages/Home.jsx'
import { BugIndex } from './pages/BugIndex.jsx'
import { BugDetails } from './pages/BugDetails.jsx'
import { MsgIndex } from './pages/MsgIndex.jsx'
import { MsgDetails } from './pages/MsgDetails.jsx'
import { AboutUs } from './pages/AboutUs.jsx'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import { UserMsg } from './cmps/UserMsg.jsx'
import { UserIndex } from './pages/UserIndex.jsx'
import { UserDetails } from './pages/UserDetails.jsx'
import { LoginSignup } from './cmps/LoginSignup.jsx'

export function App() {
    return (
        <Router>
            <div className='main-app'>
                <AppHeader />
                <main className='container'>
                    <Routes>
                        <Route path='/' element={<Home />} />
                        <Route path='/:location' element={<LoginSignup />} />
                        <Route path='/bug' element={<BugIndex />} />
                        <Route path='/bug/:bugId' element={<BugDetails />} />
                        <Route path='/user' element={<UserIndex />} />
                        <Route path='/user/:userId' element={<UserDetails />} />
                        <Route path='/msg' element={<MsgIndex />} />
                        <Route path='/msg/:msgId' element={<MsgDetails />} />
                        <Route path='/about' element={<AboutUs />} />
                    </Routes>
                </main>
                <AppFooter />
                <UserMsg />
            </div>
        </Router>
    )
}
