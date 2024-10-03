
import { Link } from 'react-router-dom'
import { BugPreview } from './BugPreview'
import { userService } from '../services/user.service'

export function BugList({ bugs, onRemoveBug, onEditBug, onAddMsg }) {
  const loggedInUser = userService.getLoggedInUser()

  function isAllowed(bug) {
    return loggedInUser && (loggedInUser.isAdmin || bug.creator._id === loggedInUser._id)
  }

  return (
    <ul className="bug-list">
      {bugs.map((bug) => (
        <li className="bug-preview" key={bug._id}>
          <BugPreview bug={bug} />
          {isAllowed(bug) &&
            <div>
              <button
                onClick={() => {
                  onRemoveBug(bug._id)
                }}
              >
                x
              </button>
              <button
                onClick={() => {
                  onEditBug(bug)
                }}
              >
                Edit
              </button>
              <button
                onClick={() => {
                  onAddMsg(bug._id)
                }}
              >
                Add message
              </button>
            </div>}
          <Link to={`/bug/${bug._id}`}>Details</Link>
        </li>
      ))}
    </ul>
  )
}
