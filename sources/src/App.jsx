import { useEffect, useState } from 'react'
import { useSocket } from './useSocket.js'
import { DebounceInput } from 'react-debounce-input'
import './App.styl'
import useStatus from './useStatus.js'

const env = import.meta.env
const mode = env.MODE

function App()
{
    const status = useStatus(state => state)

    const socket = useSocket({
        onMessage: (data) =>
        {
            if(data.status)
                status.set(data.status)
        }
    })
    
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
        if(socket.status !== 'connected')
            return

        socket.send({ action: 'logsCategories', values: [ logsCategories ] })
    }, [ logsCategories ])

    useEffect(() =>
    {
        if(socket.status !== 'connected')
            return

        socket.send({ action: 'messageText', values: [ messageText ] })
    }, [ messageText ])

    useEffect(() =>
    {
        if(socket.status === 'connected')
        {
            window.setTimeout(() =>
            {
                socket.send({ action: 'requireStatus' })
            }, 1000)
        }
    }, [ socket.status ])

    return (
        <>
            <header>
                <div className="title">Chat Arena - 🎮</div>
                <div className="connexion">
                    <span className="mode">{ mode }</span> - <span className={ `status is-${ socket.status }` }>{ socket.status } </span>
                </div>
            </header>
            { socket.status === 'connected' &&
                <main>
                    <section>
                        <div className="section-title">Screen</div>
                        <div className="section-content">
                            <button onClick={ () => socket.send({ action: 'screenHide' }) } className={ status.screen?.visible ? '' : 'is-active' }>Hide</button>
                            <button onClick={ () => socket.send({ action: 'screenShow' }) } className={ status.screen?.visible ? 'is-active' : '' }>Show</button>
                        </div>
                    </section>
                    <section>
                        <div className="section-title">Camera</div>
                        <div className="section-content">
                            <table>
                                <tbody>
                                    <tr>
                                        <td><button onClick={ () => socket.send({ action: 'cameraPosition', values: [ 'top-left' ] }) } className={ status.camera?.position === 'top-left' ? 'is-active' : '' }>↖</button></td>
                                        <td><button onClick={ () => socket.send({ action: 'cameraPosition', values: [ 'top-center' ] }) } className={ status.camera?.position === 'top-center' ? 'is-active' : '' }>↑</button></td>
                                        <td><button onClick={ () => socket.send({ action: 'cameraPosition', values: [ 'top-right' ] }) } className={ status.camera?.position === 'top-right' ? 'is-active' : '' }>↗</button></td>
                                    </tr>
                                    <tr>
                                        <td><button onClick={ () => socket.send({ action: 'cameraPosition', values: [ 'center-left' ] }) } className={ status.camera?.position === 'center-left' ? 'is-active' : '' }>←</button></td>
                                        <td><button onClick={ () => socket.send({ action: 'cameraPosition', values: [ 'center-center' ] }) } className={ status.camera?.position === 'center-center' ? 'is-active' : '' }>↔</button></td>
                                        <td><button onClick={ () => socket.send({ action: 'cameraPosition', values: [ 'center-right' ] }) } className={ status.camera?.position === 'center-right' ? 'is-active' : '' }>→</button></td>
                                    </tr>
                                    <tr>
                                        <td><button onClick={ () => socket.send({ action: 'cameraPosition', values: [ 'near-bottom-left' ] }) } className={ status.camera?.position === 'near-bottom-left' ? 'is-active' : '' }>↙</button></td>
                                        <td><button onClick={ () => socket.send({ action: 'cameraPosition', values: [ 'near-bottom-center' ] }) } className={ status.camera?.position === 'near-bottom-center' ? 'is-active' : '' }>↓</button></td>
                                        <td><button onClick={ () => socket.send({ action: 'cameraPosition', values: [ 'near-bottom-right' ] }) } className={ status.camera?.position === 'near-bottom-right' ? 'is-active' : '' }>↘</button></td>
                                    </tr>
                                    <tr>
                                        <td><button onClick={ () => socket.send({ action: 'cameraPosition', values: [ 'bottom-left' ] }) } className={ status.camera?.position === 'bottom-left' ? 'is-active' : '' }>↙</button></td>
                                        <td><button onClick={ () => socket.send({ action: 'cameraPosition', values: [ 'bottom-center' ] }) } className={ status.camera?.position === 'bottom-center' ? 'is-active' : '' }>↓</button></td>
                                        <td><button onClick={ () => socket.send({ action: 'cameraPosition', values: [ 'bottom-right' ] }) } className={ status.camera?.position === 'bottom-right' ? 'is-active' : '' }>↘</button></td>
                                    </tr>
                                </tbody>
                            </table>
                            <button onClick={ () => socket.send({ action: 'cameraSize', values: [ 'small' ] }) } className={ status.camera?.size === 'small' ? 'is-active' : '' }>Small</button>
                            <button onClick={ () => socket.send({ action: 'cameraSize', values: [ 'medium' ] }) } className={ status.camera?.size === 'medium' ? 'is-active' : '' }>Medium</button>
                            <button onClick={ () => socket.send({ action: 'cameraSize', values: [ 'large' ] }) } className={ status.camera?.size === 'large' ? 'is-active' : '' }>Large</button>
                            <br />
                            <button onClick={ () => socket.send({ action: 'cameraHide' }) } className={ status.camera?.visible ? '' : 'is-active' }>Hide</button>
                            <button onClick={ () => socket.send({ action: 'cameraShow' }) } className={ status.camera?.visible ? 'is-active' : '' }>Show</button>
                        </div>
                    </section>
                    <section>
                        <div className="section-title">Actions</div>
                        <div className="section-content">
                            <button onClick={ () => socket.send({ action: 'killAll' }) }>Kill all</button>
                            <button onClick={ () => socket.send({ action: 'resurrectAll' }) }>Resurrect all</button>
                            <button onClick={ () => socket.send({ action: 'healAll' }) }>Heal all</button>
                            <button onClick={ () => socket.send({ action: 'damageAll' }) }>Damage all</button>
                            <button onClick={ () => socket.send({ action: 'relocateAll' }) }>Relocate all</button>
                            <button onClick={ () => socket.send({ action: 'reload' }) }>Reload</button>
                        </div>
                    </section>
                    <section>
                        <div className="section-title">Spells</div>
                        <div className="section-content">
                            <button onClick={ () => socket.send({ action: 'spellsActivateDefault' }) } className={ status.spells?.types?.includes('default') ? 'is-active' : '' }>Default</button>
                            <button onClick={ () => socket.send({ action: 'spellsActivateArcane' }) } className={ status.spells?.types?.includes('arcane') ? 'is-active' : '' }>Arcane</button>
                            <button onClick={ () => socket.send({ action: 'spellsActivateDivine' }) } className={ status.spells?.types?.includes('divine') ? 'is-active' : '' }>Divine</button>
                            <button onClick={ () => socket.send({ action: 'spellsDeactivate' }) } className="is-danger">Deactivate</button>
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
                                    onChange={ (event) => socket.send({ action: 'viewAngle', values: [ parseFloat(event.target.value) ] }) }
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
                                    onChange={ (event) => socket.send({ action: 'canvasOpacity', values: [ parseFloat(event.target.value) ] }) }
                                />
                            </div>
                        </div>
                    </section>
                    <section>
                        <div className="section-title">Logs</div>
                        <div className="section-content">
                            <button onClick={ () => socket.send({ action: 'logsActivate', values: [ 'lifeCourse' ] }) } className={ status.logs?.categories?.includes('lifeCourse') ? 'is-active' : '' }>lifeCourse</button>
                            <button onClick={ () => socket.send({ action: 'logsActivate', values: [ 'arcaneSpell' ] }) } className={ status.logs?.categories?.includes('arcaneSpell') ? 'is-active' : '' }>arcaneSpell</button>
                            <button onClick={ () => socket.send({ action: 'logsActivate', values: [ 'divineSpell' ] }) } className={ status.logs?.categories?.includes('divineSpell') ? 'is-active' : '' }>divineSpell</button>
                            <button onClick={ () => socket.send({ action: 'logsActivate', values: [ 'defaultSpell' ] }) } className={ status.logs?.categories?.includes('defaultSpell') ? 'is-active' : '' }>defaultSpell</button>
                            <button onClick={ () => socket.send({ action: 'logsActivate', values: [ 'action' ] }) } className={ status.logs?.categories?.includes('action') ? 'is-active' : '' }>action</button>
                            <button onClick={ () => socket.send({ action: 'logsActivate', values: [ 'none' ] }) } className={ status.logs?.categories?.includes('none') ? 'is-active' : '' }>none</button>
                            <button onClick={ () => socket.send({ action: 'logsDeactivateAll' }) } className="is-danger">Deactivate</button>
                            <button onClick={ () => socket.send({ action: 'logsFlush' }) } className="is-danger">Flush</button>
                        </div>
                        
                    </section>
                    <section>
                        <div className="section-title">Modals</div>
                        <div className="section-content">
                            <button onClick={ () => socket.send({ action: 'modalsShow', values: [ 'rules' ] }) } className={ status.modals?.name === "rules" ? 'is-active' : '' }>Rules</button>
                            <button onClick={ () => socket.send({ action: 'modalsShow', values: [ 'spells' ] }) } className={ status.modals?.name === "spells" ? 'is-active' : '' }>Spells</button>
                            <button onClick={ () => socket.send({ action: 'modalsShow', values: [ 'leaderboards' ] }) } className={ status.modals?.name === "leaderboards" ? 'is-active' : '' }>Leaderboards</button>
                            <br />
                            <button onClick={ () => socket.send({ action: 'modalsRotationStart' }) } className={ status.modals?.rotation ? 'is-active' : '' }>Rotation start</button>
                            <button onClick={ () => socket.send({ action: 'modalsRotationEnd' }) } className={ status.modals?.rotation ? '' : 'is-active' }>Rotation end</button>
                            <button onClick={ () => socket.send({ action: 'modalsHide' }) } className="is-danger">Hide</button>
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
                            <button onClick={ () => setMessageText('') } className="is-danger">Clear</button>
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
                                    onChange={ (event) => socket.send({ action: 'volume', values: [ parseFloat(event.target.value) ] }) }
                                />
                            </div>
                            <button onClick={ () => socket.send({ action: 'mute' }) } className={ status.sounds?.muted ? 'is-active' : '' }>Mute</button>
                            <button onClick={ () => socket.send({ action: 'unmute' }) } className={ status.sounds?.muted ? '' : 'is-active' }>Unmute</button>
                        </div>
                    </section>
                </main>
            }
            
        </>
    )
}

export default App
