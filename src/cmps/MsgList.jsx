import { Link } from 'react-router-dom'
import { userService } from '../services/user.service'
import { MsgPreview } from './MsgPreview.jsx'

export function MsgList({ msgs, onRemoveMsg, onEditMsg }) {
  const loggedInUser = userService.getLoggedInUser()

  function isAllowed() {
    return loggedInUser && loggedInUser.isAdmin
  }

  return (
    <ul className="msg-list">
      {msgs.map(msg => (
        <li className="msg-preview" key={msg._id}>
          <MsgPreview msg={msg} />
          {isAllowed() &&
            <div>
              <button
                onClick={() => {
                  onRemoveMsg(msg._id)
                }}
              >
                x
              </button>
              <button
                onClick={() => {
                  onEditMsg(msg)
                }}
              >
                Edit
              </button>
            </div>}
          <Link to={`/msg/${msg._id}`}>Details</Link>
        </li>
      ))}
    </ul>
  )
}
