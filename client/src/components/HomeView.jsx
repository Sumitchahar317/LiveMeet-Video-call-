import React from 'react';

const HomeView = ({ onJoinClick }) => {
    return (
        <div className="container-fluid Homepage-container">
            <div className="row justify-content-center align-items-center w-100 h-100">
                <div className="col-lg-8 text-center hero-section d-flex flex-column align-items-center justify-content-center" style={{ minHeight: '80vh' }}>
                    <div className="mb-5">
                        <h1 className="display-1 fw-bold">LiveMeet</h1>
                        <p className="tagline lead text-white">Connect. Collab. Create.</p>
                        <p className="description mx-auto">
                            Experience the future of video communication. Crystal clear audio, high-definition video, and seamless collaboration tools completely free for everyone.
                        </p>
                        <div className="features d-flex justify-content-center gap-3">
                            <span className="badge rounded-pill bg-light text-dark shadow-sm py-2 px-3">✨ HD Video</span>
                            <span className="badge rounded-pill bg-light text-dark shadow-sm py-2 px-3">🔒 Secure</span>
                            <span className="badge rounded-pill bg-light text-dark shadow-sm py-2 px-3">⚡️ Fast</span>
                        </div>
                    </div>

                    <div className="btn-container-h text-center d-flex flex-column gap-3 mt-4">
                        <button className="btn btn-primary btn-lg btn-h px-5 py-3 fs-4 shadow-lg" onClick={onJoinClick}>
                            Join Meeting
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomeView;
