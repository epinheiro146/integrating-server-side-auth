import * as React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './views/Home';
import Timeline from './views/Timeline';
import ChirpDetails from './views/ChirpDetails';
import Edit from './views/Edit';
import Create from './views/Create';
import Profile from './views/Profile';

const App = () => {
    return (
        <BrowserRouter>
            <Navbar />
            <div className="container mt-5 text-bg-primary">
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='/chirps' element={<Timeline />} />
                    <Route path='/chirps/create' element={<Create />} />
                    <Route path='/chirps/:id' element={<ChirpDetails />} />
                    <Route path='/chirps/:id/edit' element={<Edit />} />
                    <Route path='/users/:id' element={<Profile />} />
                </Routes>
            </div>
        </BrowserRouter>
    )
}

export default App;
