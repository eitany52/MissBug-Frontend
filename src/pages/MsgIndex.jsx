import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'
import { useState } from 'react'
import { useEffect } from 'react'
import { msgService } from '../services/msgService.js'
import { MsgList } from '../cmps/MsgList.jsx'

export function MsgIndex() {
  const [msgs, setMsgs] = useState([])

  useEffect(() => {
    loadMsgs()
  }, [])


  async function loadMsgs() {
    const msgs = await msgService.query()
    setMsgs(msgs)
  }


  async function onRemoveMsg(msgId) {
    try {
      await msgService.remove(msgId)
      setMsgs(prevMsgs => prevMsgs.filter(msg => msg._id !== msgId))
      showSuccessMsg('Message removed')
    } catch (err) {
      showErrorMsg('Cannot remove message')
    }
  }

  async function onEditMsg(msg) {
    const txt = prompt('Edit message?')
    const msgToSave = { ...msg, txt }
    
    try {
      const savedMsg = await msgService.save(msgToSave)
      setMsgs(prevMsgs => prevMsgs.map(currMsg =>
        currMsg._id === savedMsg._id ? savedMsg : currMsg
      ))
      showSuccessMsg('Message updated')
    } catch (err) {
      showErrorMsg('Cannot update message')
    }
  }
  return (
    <main className="msg-index">
      <h3>Messages</h3>
      <main>
        <MsgList
          msgs={msgs}
          onRemoveMsg={onRemoveMsg}
          onEditMsg={onEditMsg} />
      </main>
    </main>
  )
}
