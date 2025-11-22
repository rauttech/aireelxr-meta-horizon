export const mockWebRTC = () => {
    console.log('WebRTC Mock Initialized')
    return {
        createOffer: () => Promise.resolve('mock-offer'),
        createAnswer: () => Promise.resolve('mock-answer'),
    }
}
