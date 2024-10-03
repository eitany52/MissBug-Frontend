import { useState } from 'react'
import { showErrorMsg } from '../services/event-bus.service.js'
import { useParams } from 'react-router'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { msgService } from '../services/msgService.js'

export function MsgDetails() {

    const [msg, setMsg] = useState(null)
    const { msgId } = useParams()

    useEffect(() => {
        loadMsg()
    }, [])

    async function loadMsg() {
        try {
            const msg = await msgService.getById(msgId)
            setMsg(msg)
        } catch (err) {
            showErrorMsg('Cannot load message')
        }
    }

    if (!msg) return <h1>loadings....</h1>
    return <div className="msg-details container">
        <h3>Message Details</h3>
        <h3>
            {msg.txt}
        </h3>
        <pre> {JSON.stringify(msg, null, 2)} </pre>
        <Link to="/msg">Back to List</Link>
    </div>

}