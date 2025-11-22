import { mockWebRTC } from './webrtc-mock'

function App() {
    mockWebRTC() // Invoke the mock function

    return (
        <div>
            <h1>Hello from WebRTC Client</h1>
        </div>
    )
}

export default App
