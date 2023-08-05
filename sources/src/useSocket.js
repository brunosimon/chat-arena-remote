import { useEffect, useState } from 'react'

const env = import.meta.env
const mode = env.MODE
const port = mode === 'live' ? 2011 : 2013

export function useSocket({ onMessage = null } = {})
{
    const [ status, setStatus ] = useState('notConnected')
    const [ ws, setWs ] = useState(null)

    useEffect(() =>
    {
        setStatus('notConnected')
        setWs(new WebSocket(`wss://${ env.VITE_DISTANT_ADDRESS }:${ port }`, 'vite-hmr'))
    }, [])

    useEffect(() =>
    {
        if(!ws)
            return

        const open = () =>
        {
            setStatus('connected')
        }

        const error = () =>
        {
            setStatus('error')
        }

        const message = (message) =>
        {
            if(typeof onMessage === 'function')
            {
                const data = JSON.parse(message.data)
                onMessage(data)
            }
        }

        const close = () =>
        {
            setStatus('notConnected')
        }

        ws.addEventListener('open', open)
        ws.addEventListener('error', error)
        ws.addEventListener('message', message)
        ws.addEventListener('close', close)

        return () =>
        {
            ws.close()
            ws.removeEventListener('open', open)
            ws.removeEventListener('error', error)
            ws.removeEventListener('message', message)
            ws.removeEventListener('close', close)
        }
    }, [ ws ])

    const send = (data) =>
    {
        if(status !== 'connected')
            return

        const message = {
            type: 'remote',
            ...data
        }
        ws.send(JSON.stringify(message))
    }

    return { status, send }
}
