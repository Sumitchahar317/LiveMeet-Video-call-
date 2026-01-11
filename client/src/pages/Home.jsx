import React from 'react';
import { useNavigate } from 'react-router-dom';
import HomeView from '../components/HomeView';

/**
 * HomePage Component
 * 
 * This is the landing page of the application.
 * The actual UI rendering is delegated to the `HomeView` presentation component.
 */
const Homepage = () => {
    const navigate = useNavigate();

    /**
     * handleJoinClick
     * Navigates the user to the '/join' route when they want to enter a meeting.
     */
    const handleJoinClick = () => {
        navigate('/join');
    };

    return <HomeView onJoinClick={handleJoinClick} />;
}
export default Homepage;
