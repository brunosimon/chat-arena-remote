import { useCallback, useEffect, useState } from 'react'

export function useSocket()
{
    const [ connected, setConnected ] = useState(false)
    const [ ws ] = useState(() => new WebSocket('wss://192.168.1.33:2011', 'vite-hmr'))

    useEffect(() =>
    {
        ws.addEventListener('open', (event) =>
        {
            setConnected(true)
        })
    }, [])

    const send = useCallback((data) =>
    {
        if(!connected)
        {
            const message = {
                type: 'remote',
                ...data
            }
            ws.send(JSON.stringify(message))
        }
    }, [])

    return { connected, send }
}
