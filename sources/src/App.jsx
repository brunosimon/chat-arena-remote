import { useEffect, useState } from 'react'
import { useSocket } from './useSocket.js'
import { DebounceInput } from 'react-debounce-input'

function App()
{
    const { connected, send } = useSocket()
    const [ logsCategories, setLogsCategories ] = useState([ 'lifeCourse', 'arcaneSpell', 'divineSpell', 'defaultSpell', 'action', '', ])
    const [ messageText, setMessageText ] = useState('')

    const logsCategoriesToggle = (category) =>
    {
        setLogsCategories(() =>
        {
            if(logsCategories.includes(category))
                return logsCategories.filter(_category => _category !== category)
            
            return [ ...logsCategories, category ]
        })
    }

    useEffect(() =>
    {
        if(!connected)
            return

        send({ action: 'logsCategories', values: [ logsCategories ] })
    }, [ logsCategories ])

    useEffect(() =>
    {
        if(!connected)
            return

        send({ action: 'messageText', values: [ messageText ] })
    }, [ messageText ])

    if(!connected)
        return <h1>Chat Arena - Remote</h1>

    return (
        <>
            <h1>Chat Arena - Remote</h1>
            <div className="card">
                <h2>Main actions</h2>
                <button onClick={ () => send({ action: 'killAll' }) }>Kill all</button>
                <button onClick={ () => send({ action: 'resurrectAll' }) }>Resurrect all</button>
                <button onClick={ () => send({ action: 'healAll' }) }>Heal all</button>
                <button onClick={ () => send({ action: 'hitAll' }) }>Hit all</button>
                <button onClick={ () => send({ action: 'relocateAll' }) }>Relocate all</button>
                <button onClick={ () => send({ action: 'reload' }) }>Reload</button>
                <h2>Tweaks</h2>
                <div>
                    View angle
                    <br />
                    <DebounceInput value="1.35" min="0" max={Math.PI * 0.5} step="0.01" type="range" onChange={ (event) => send({ action: 'viewAngle', values: [ parseFloat(event.target.value) ] }) } />
                </div>
                <div>
                    Canvas opacity
                    <br />
                    <DebounceInput value="1" min="0" max="1" step="0.01" type="range" onChange={ (event) => send({ action: 'canvasOpacity', values: [ parseFloat(event.target.value) ] }) } />
                </div>
                <div>
                    <h2>Logs</h2>
                    <button onClick={ () => send({ action: 'logsClear' }) }>Clear</button>
                    <br />
                    <label>
                        <input
                            type="checkbox"
                            checked={ logsCategories.includes('lifeCourse') }
                            onChange={ () => logsCategoriesToggle('lifeCourse') }
                        />
                        lifeCourse
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            checked={ logsCategories.includes('arcaneSpell') }
                            onChange={ () => logsCategoriesToggle('arcaneSpell') }
                        />
                        arcaneSpell
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            checked={ logsCategories.includes('divineSpell') }
                            onChange={ () => logsCategoriesToggle('divineSpell') }
                        />
                        divineSpell
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            checked={ logsCategories.includes('defaultSpell') }
                            onChange={ () => logsCategoriesToggle('defaultSpell') }
                        />
                        defaultSpell
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            checked={ logsCategories.includes('action') }
                            onChange={ () => logsCategoriesToggle('action') }
                        />
                        action
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            checked={ logsCategories.includes('') }
                            onChange={ () => logsCategoriesToggle('') }
                        />
                        none
                    </label>
                </div>
                <div>
                    <h2>Message</h2>
                    <DebounceInput
                        type="text"
                        value={ messageText }
                        onChange={ (event) => setMessageText(event.target.value) }
                        debounceTimeout={ 1000 }
                    />
                    <br />
                    <button onClick={ () => setMessageText('') }>Clear</button>
                    <br />
                    <button onClick={ () => setMessageText('Be right back!') }>"BRB"</button>
                    <br />
                    <button onClick={ () => setMessageText('Petting the dog') }>"Petting dog"</button>
                </div>
                <div>
                    <h2>Sounds</h2>
                    <div>
                        Volume
                        <br />
                        <DebounceInput value="0.5" min="0" max="1" step="0.01" type="range" onChange={ (event) => send({ action: 'soundsVolume', values: [ parseFloat(event.target.value) ] }) } />
                    </div>
                    <br />
                    <button onClick={ () => send({ action: 'soundsMute' }) }>Mute</button>
                    <button onClick={ () => send({ action: 'soundsUnmute' }) }>Unmute</button>
                </div>
            </div>
        </>
    )
}

export default App
