import { useCallback, useEffect, useState } from 'react'

export function useSocket(port)
{
    const [ status, setStatus ] = useState('notConnected')
    const [ ws, setWs ] = useState(null)

    useEffect(() =>
    {
        setStatus('notConnected')
        setWs(new WebSocket('wss://192.168.1.33:' + port, 'vite-hmr'))
    }, [ port ])

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

        const close = () =>
        {
            setStatus('notConnected')
        }

        ws.addEventListener('open', open)
        ws.addEventListener('error', error)
        ws.addEventListener('close', close)

        return () =>
        {
            ws.close()
            ws.removeEventListener('open', open)
            ws.removeEventListener('error', error)
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
