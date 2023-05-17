import { useEffect, useState } from 'react'
import { useSocket } from './useSocket.js'
import { DebounceInput } from 'react-debounce-input'
import './App.styl'

const env = import.meta.env
const mode = env.MODE

function App()
{
    const { status, send } = useSocket()
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
        if(status !== 'connected')
            return

        send({ action: 'logsCategories', values: [ logsCategories ] })
    }, [ logsCategories ])

    useEffect(() =>
    {
        if(status !== 'connected')
            return

        send({ action: 'messageText', values: [ messageText ] })
    }, [ messageText ])

    return (
        <>
            <header>
                <div className="title">Chat Arena - 🎮</div>
                <div className="connexion">
                    <span className="mode">{ mode }</span> - <span className={ `status is-${status}` }>{ status } </span>
                </div>
            </header>
            { status === 'connected' &&
                <main>
                    <section>
                        <div className="section-title">Screen</div>
                        <div className="section-content">
                            <button onClick={ () => send({ action: 'screenHide' }) }>Hide</button>
                            <button onClick={ () => send({ action: 'screenShow' }) }>Show</button>
                        </div>
                    </section>
                    <section>
                        <div className="section-title">Camera</div>
                        <div className="section-content">
                            <table>
                                <tr>
                                    <td><button onClick={ () => send({ action: 'cameraPosition', values: [ 'top-left' ] }) }>↖</button></td>
                                    <td><button onClick={ () => send({ action: 'cameraPosition', values: [ 'top-center' ] }) }>↑</button></td>
                                    <td><button onClick={ () => send({ action: 'cameraPosition', values: [ 'top-right' ] }) }>↗</button></td>
                                </tr>
                                <tr>
                                    <td><button onClick={ () => send({ action: 'cameraPosition', values: [ 'center-left' ] }) }>←</button></td>
                                    <td><button onClick={ () => send({ action: 'cameraPosition', values: [ 'center-center' ] }) }>↔</button></td>
                                    <td><button onClick={ () => send({ action: 'cameraPosition', values: [ 'center-right' ] }) }>→</button></td>
                                </tr>
                                <tr>
                                    <td><button onClick={ () => send({ action: 'cameraPosition', values: [ 'near-bottom-left' ] }) }>↙</button></td>
                                    <td><button onClick={ () => send({ action: 'cameraPosition', values: [ 'near-bottom-center' ] }) }>↓</button></td>
                                    <td><button onClick={ () => send({ action: 'cameraPosition', values: [ 'near-bottom-right' ] }) }>↘</button></td>
                                </tr>
                                <tr>
                                    <td><button onClick={ () => send({ action: 'cameraPosition', values: [ 'bottom-left' ] }) }>↙</button></td>
                                    <td><button onClick={ () => send({ action: 'cameraPosition', values: [ 'bottom-center' ] }) }>↓</button></td>
                                    <td><button onClick={ () => send({ action: 'cameraPosition', values: [ 'bottom-right' ] }) }>↘</button></td>
                                </tr>
                            </table>
                            <button onClick={ () => send({ action: 'cameraSize', values: [ 'small' ] }) }>Small</button>
                            <button onClick={ () => send({ action: 'cameraSize', values: [ 'medium' ] }) }>Medium</button>
                            <button onClick={ () => send({ action: 'cameraSize', values: [ 'large' ] }) }>Large</button>
                            <br />
                            <button onClick={ () => send({ action: 'cameraHide' }) }>Hide</button>
                            <button onClick={ () => send({ action: 'cameraShow' }) }>Show</button>
                        </div>
                    </section>
                    <section>
                        <div className="section-title">Actions</div>
                        <div className="section-content">
                            <button onClick={ () => send({ action: 'killAll' }) }>Kill all</button>
                            <button onClick={ () => send({ action: 'resurrectAll' }) }>Resurrect all</button>
                            <button onClick={ () => send({ action: 'healAll' }) }>Heal all</button>
                            <button onClick={ () => send({ action: 'hitAll' }) }>Hit all</button>
                            <button onClick={ () => send({ action: 'relocateAll' }) }>Relocate all</button>
                            <button onClick={ () => send({ action: 'reload' }) }>Reload</button>
                        </div>
                    </section>
                    <section>
                        <div className="section-title">Spells</div>
                        <div className="section-content">
                            <button onClick={ () => send({ action: 'spellsActivate' }) }>Activate</button>
                            <button onClick={ () => send({ action: 'spellsDeactivate' }) }>Deactivate</button>
                        </div>
                    </section>
                    <section>
                        <div className="section-title">Tweaks</div>
                        <div className="section-content">
                            <div>
                                View angle
                                <br />
                                <DebounceInput
                                    value="1.35"
                                    min="0"
                                    max={ Math.PI * 0.5 }
                                    step="0.01"
                                    type="range"
                                    onChange={ (event) => send({ action: 'viewAngle', values: [ parseFloat(event.target.value) ] }) }
                                />
                            </div>
                            <div>
                                Canvas opacity
                                <br />
                                <DebounceInput
                                    value="1"
                                    min="0"
                                    max="1"
                                    step="0.01"
                                    type="range"
                                    onChange={ (event) => send({ action: 'canvasOpacity', values: [ parseFloat(event.target.value) ] }) }
                                />
                            </div>
                        </div>
                    </section>
                    <section>
                        <div className="section-title">Logs</div>
                        <div className="section-content">
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
                            <br />
                            <label>
                                <input
                                    type="checkbox"
                                    checked={ logsCategories.includes('arcaneSpell') }
                                    onChange={ () => logsCategoriesToggle('arcaneSpell') }
                                />
                                arcaneSpell
                            </label>
                            <br />
                            <label>
                                <input
                                    type="checkbox"
                                    checked={ logsCategories.includes('divineSpell') }
                                    onChange={ () => logsCategoriesToggle('divineSpell') }
                                />
                                divineSpell
                            </label>
                            <br />
                            <label>
                                <input
                                    type="checkbox"
                                    checked={ logsCategories.includes('defaultSpell') }
                                    onChange={ () => logsCategoriesToggle('defaultSpell') }
                                />
                                defaultSpell
                            </label>
                            <br />
                            <label>
                                <input
                                    type="checkbox"
                                    checked={ logsCategories.includes('action') }
                                    onChange={ () => logsCategoriesToggle('action') }
                                />
                                action
                            </label>
                            <br />
                            <label>
                                <input
                                    type="checkbox"
                                    checked={ logsCategories.includes('') }
                                    onChange={ () => logsCategoriesToggle('') }
                                />
                                none
                            </label>
                        </div>
                    </section>
                    <section>
                        <div className="section-title">Modals</div>
                        <div className="section-content">
                            <button onClick={ () => send({ action: 'modalsHide' }) }>Hide</button>
                            <button onClick={ () => send({ action: 'modalsShow', values: [ 'rules' ] }) }>Rules</button>
                            <button onClick={ () => send({ action: 'modalsShow', values: [ 'spells' ] }) }>Spells</button>
                            <button onClick={ () => send({ action: 'modalsShow', values: [ 'leaderboards' ] }) }>Leaderboards</button>
                        </div>
                    </section>
                    <section>
                        <div className="section-title">Message</div>
                        <div className="section-content">
                            <DebounceInput
                                type="text"
                                value={ messageText }
                                onChange={ (event) => setMessageText(event.target.value) }
                                debounceTimeout={ 1000 }
                            />
                            <br />
                            <button onClick={ () => setMessageText('') }>Clear</button>
                            <button onClick={ () => setMessageText('Starting soon 🎬') }>"Starting soon"</button>
                            <button onClick={ () => setMessageText('Be right back! 🚽') }>"BRB"</button>
                            <button onClick={ () => setMessageText('Petting the dog 🐶') }>"Petting dog"</button>
                            <button onClick={ () => setMessageText('Fetching human fuel 🍔') }>"Petting dog"</button>
                        </div>
                    </section>
                    <section>
                        <div className="section-title">Sounds</div>
                        <div className="section-content">
                            <div>
                                Volume
                                <br />
                                <DebounceInput
                                    value="0.5"
                                    min="0"
                                    max="1"
                                    step="0.01"
                                    type="range"
                                    onChange={ (event) => send({ action: 'soundsVolume', values: [ parseFloat(event.target.value) ] }) }
                                />
                            </div>
                            <button onClick={ () => send({ action: 'soundsMute' }) }>Mute</button>
                            <button onClick={ () => send({ action: 'soundsUnmute' }) }>Unmute</button>
                        </div>
                    </section>
                </main>
            }
            
        </>
    )
}

export default App
