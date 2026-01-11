/**
 * PeerService
 * 
 * This class abstracts the complexity of WebRTC's RTCPeerConnection.
 * It handles the creation of "Offers" and "Answers" and manages the local/remote descriptions
 * required to establish a peer-to-peer connection.
 */
class PeerService {
    constructor() {
        // Check if the peer connection already exists, if not, create it with Google's STUN servers
        if (!this.peer) {
            this.peer = new RTCPeerConnection({
                iceServers: [
                    {
                        urls: [
                            "stun:stun.l.google.com:19302",
                            "stun:global.stun.twilio.com:3478",
                        ],
                    },
                ],
            });
        }
    }

    /**
     * getAnswer
     * Called by the receiver (callee) to accept an offer.
     * 1. Sets the remote description (the offer from the caller).
     * 2. Creates an answer (SDP).
     * 3. Sets the local description (the answer).
     * @param {RTCSessionDescriptionInit} offer - The offer received from the caller.
     * @returns {Promise<RTCSessionDescriptionInit>} - The created answer.
     */
    async getAnswer(offer) {
        if (this.peer) {
            await this.peer.setRemoteDescription(offer);
            const ans = await this.peer.createAnswer();
            await this.peer.setLocalDescription(new RTCSessionDescription(ans));
            return ans;
        }
    }

    /**
     * setLocalDescription
     * Called by the caller after receiving an answer.
     * This completes the "handshake".
     * @param {RTCSessionDescriptionInit} ans - The answer received from the callee.
     */
    async setLocalDescription(ans) {
        if (this.peer) {
            await this.peer.setRemoteDescription(new RTCSessionDescription(ans));
        }
    }

    /**
     * getOffer
     * Called by the caller (initiator) to start a call.
     * 1. Creates an offer (SDP).
     * 2. Sets the local description (the offer).
     * @returns {Promise<RTCSessionDescriptionInit>} - The created offer.
     */
    async getOffer() {
        if (this.peer) {
            const offer = await this.peer.createOffer();
            await this.peer.setLocalDescription(new RTCSessionDescription(offer));
            return offer;
        }
    }
}

// Export a singleton instance of the service
export default new PeerService();
