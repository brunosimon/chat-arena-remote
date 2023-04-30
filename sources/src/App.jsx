import { useSocket } from './useSocket.js'
import { DebounceInput } from 'react-debounce-input'

function App()
{
    const { connected, send } = useSocket()

    if(!connected)
        return <h1>Chat Arena - Remote</h1>

    return (
        <>
            <h1>Chat Arena - Remote</h1>
            <div className="card">
                <button onClick={ () => send({ action: 'killAll' }) }>Kill all</button>
                <button onClick={ () => send({ action: 'resurrectAll' }) }>Resurrect all</button>
                <button onClick={ () => send({ action: 'healAll' }) }>Heal all</button>
                <button onClick={ () => send({ action: 'hitAll' }) }>Hit all</button>
                <button onClick={ () => send({ action: 'relocateAll' }) }>Relocate all</button>
                <button onClick={ () => send({ action: 'reload' }) }>Reload</button>
                <div>
                    View angle
                    <br />
                    <DebounceInput min="0" max={Math.PI * 0.5} step="0.01" type="range"  onChange={ (event) => send({ action: 'viewAngle', values: [ parseFloat(event.target.value) ] }) } />
                </div>
                <iframe
                    src="https://www.twitch.tv/embed/bruno_simon_dev/chat?parent=localhost&darkpopout"
                    width="400"
                    height="600"
                    sandbox="allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox allow-modals"
                    style={{ border: 0 }}
                />
                <iframe
                    src="https://player.twitch.tv/?channel=bruno_simon_dev&parent=localhost"
                    width="600"
                    height="400"
                    style={{ border: 0 }}
                />
                <iframe
                    src="https://dashboard.twitch.tv/u/bruno_simon_dev/stream-manager"
                    width="400"
                    height="400"
                    style={{ border: 0 }}
                />
            </div>
        </>
    )
}
// send({ action: 'viewAngle' })
export default App
