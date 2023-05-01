import { useCallback, useEffect, useState } from 'react'

export function useSocket(port)
{
    const [ connected, setConnected ] = useState(false)
    const [ error, setError ] = useState(null)
    const [ ws, setWs ] = useState(null)

    useEffect(() =>
    {
        setConnected(false)
        setWs(new WebSocket('wss://192.168.1.33:' + port, 'vite-hmr'))
    }, [ port ])

    useEffect(() =>
    {
        if(!ws)
            return

        const open = () =>
        {
            console.log('open')
            setConnected(true)
        }

        const error = () =>
        {
            console.log('error')
            setError(true)
        }

        const close = () =>
        {
            console.log('close')
            setConnected(false)
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
        if(!connected)
            return
            
        const message = {
            type: 'remote',
            ...data
        }
        ws.send(JSON.stringify(message))
    }

    return { connected, error, send }
}
