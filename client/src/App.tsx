import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Auth from './components/Layout/Auth/Auth';
import CardsList from './components/Layout/CardsList/CardsList';
import Header from './components/Layout/Header/Header';
import { checkAuth } from './redux/reducers/userReducer';
import { useAppDispatch } from './redux/store';
import Profile from './components/Layout/Profile/Profile';

function App() {
    const dispatch = useAppDispatch();
    dispatch(checkAuth());
    return (
        <>
            <BrowserRouter>
                <Header />
                <Routes>
                    <Route path="/" element={<CardsList />} />
                    <Route path="/auth" element={<Auth />} />
                    <Route path="/profile" element={<Profile />} />
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;
