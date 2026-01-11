import React from 'react';

const RoomView = ({
    remoteSocketId,
    myStream,
    remoteStream,
    onSendStream,
    onCallUser,
    onEndCall
}) => {
    return (
        <div className="container-fluid Homepage-container">
            <div className="row justify-content-center w-100">
                <div className="col-12 text-center mb-5 mt-5">
                    <h1 className="fw-bold text-white mb-3">Room Logic</h1>
                    <h4 className="text-white">
                        {remoteSocketId ? <span className="badge bg-success">Connected</span> : <span className="badge bg-warning text-dark">Waiting for others...</span>}
                    </h4>
                </div>

                <div className="col-12 text-center mb-5">
                    <div className="d-flex justify-content-center gap-3">
                        {myStream && (
                            <button onClick={onSendStream} className="btn btn-primary btn-lg shadow">
                                Send Stream
                            </button>
                        )}
                        {remoteSocketId && (
                            <button onClick={onCallUser} className="btn btn-success btn-lg shadow">
                                CALL
                            </button>
                        )}

                        <button onClick={onEndCall} className="btn btn-danger btn-lg shadow">
                            End Call
                        </button>
                    </div>
                </div>

                <div className="col-12">
                    <div className="row justify-content-center gap-4">
                        {myStream && (
                            <div className="col-md-5 col-lg-4">
                                <div className="card border-0 shadow-lg overflow-hidden" style={{ borderRadius: '20px', background: 'rgba(255,255,255,0.2)', backdropFilter: 'blur(10px)' }}>
                                    <div className="card-body p-0">
                                        <video
                                            autoPlay
                                            muted
                                            height="300px"
                                            width="100%"
                                            style={{ borderRadius: '20px', objectFit: 'cover' }}
                                            ref={(video) => {
                                                if (video) video.srcObject = myStream;
                                            }}
                                        />
                                        <div className="p-3 text-center text-white fw-bold">My Stream</div>
                                    </div>
                                </div>
                            </div>
                        )}
                        {remoteStream && (
                            <div className="col-md-5 col-lg-4">
                                <div className="card border-0 shadow-lg overflow-hidden" style={{ borderRadius: '20px', background: 'rgba(255,255,255,0.2)', backdropFilter: 'blur(10px)' }}>
                                    <div className="card-body p-0">
                                        <video
                                            autoPlay
                                            playsInline
                                            height="300px"
                                            width="100%"
                                            style={{ borderRadius: '20px', objectFit: 'cover', transform: 'scaleX(-1)' }}
                                            ref={(video) => {
                                                if (video) video.srcObject = remoteStream;
                                            }}
                                        />
                                        <div className="p-3 text-center text-white fw-bold">Remote Stream</div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RoomView;
