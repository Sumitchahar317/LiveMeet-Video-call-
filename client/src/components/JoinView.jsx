import React from 'react';

const JoinView = ({ email, setEmail, room, setRoom, onSubmit }) => {
    return (
        <div className="Homepage-container">
            <div className="card input-container border-0 p-4 ">
                <div className="card-body">
                    <h2 className="card-title text-center mb-4">Join Meeting</h2>
                    <form onSubmit={onSubmit}>
                        <div className="mb-4">
                            <input
                                type='email'
                                className="form-control form-control-lg"
                                placeholder='Enter your email here'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <input
                                type='text'
                                className="form-control form-control-lg"
                                placeholder='Enter Room code or meeting id'
                                value={room}
                                onChange={(e) => setRoom(e.target.value)}
                                required
                            />
                        </div>
                        <button type="submit" className="btn btn-primary btn-lg w-100">Enter Room</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default JoinView;
