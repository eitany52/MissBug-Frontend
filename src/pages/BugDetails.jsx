
import { useState } from 'react'
import { bugService } from '../services//bug/bug.service.js'
import { showErrorMsg } from '../services/event-bus.service.js'
import { useNavigate, useParams } from 'react-router'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'


export function BugDetails() {

    const [bug, setBug] = useState(null)
    const { bugId } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        loadBug()
    }, [])

    async function loadBug() {
        try {
            const bug = await bugService.getById(bugId)
            setBug(bug)
        } catch (err) {
            if (err.response.status === 401) {
                navigate('/bug')
                showErrorMsg(err.response.data)
            }
            else {
                showErrorMsg('Cannot load bug')
            }
        }
    }

    if (!bug) return <h1>loadings....</h1>
    return <div className="bug-details container">
        <h3>Bug Details 🐛</h3>
        <h4>{bug.title}</h4>
        <p className='bug-description'>{bug.description}</p>
        <p>Severity: <span>{bug.severity}</span></p>
        <p>Created At: <span>{bug.createdAt}</span></p>
        {!!bug.labels.length && <p>Labels: <span>{bug.labels.join(', ')}</span></p>}
        <Link to="/bug">Back to List</Link>
    </div>

}

