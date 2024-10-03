import { bugService } from '../services/bug/bug.service.js'
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'
import { BugList } from '../cmps/BugList.jsx'
import { useCallback, useState } from 'react'
import { useEffect } from 'react'
import { BugFilter } from '../cmps/BugFilter.jsx'
import _ from 'lodash'
import { useSearchParams } from 'react-router-dom'
import { utilService } from '../services/util.service.js'
import { BugSort } from '../cmps/BugSort.jsx'
import { BugPagination } from '../cmps/BugPagination.jsx'
import { BugFilterLabels } from '../cmps/BugFilterLabels.jsx'
import { userService } from '../services/user.service.js'
import { msgService } from '../services/msgService.js'


export function BugIndex() {
  const [bugs, setBugs] = useState([])
  const [allLabels, setAllLabels] = useState([])
  const [searchParams, setSearchParams] = useSearchParams()
  const [filterBy, setFilterBy] = useState(bugService.getFilterFromSearchParams(searchParams))

  useEffect(() => {
    loadBugs()
    renderSearchParams()
  }, [filterBy])

  useEffect(() => {
    loadAllLabels()
  }, [])

  useEffect(() => {
    removeLabelsFromFilterBy()
  }, [allLabels])

  const onSetFilterBy = useCallback(_.debounce(_onSetFilterBy, 500), [])

  function _onSetFilterBy(filterBy) {
    setFilterBy(prevFilterBy => ({ ...prevFilterBy, ...filterBy }))
  }

  async function loadBugs() {
    const bugs = await bugService.query(filterBy)
    setBugs(bugs)
  }

  async function loadAllLabels() {
    const allLabels = await bugService.getAllLabels()
    setAllLabels(allLabels)
  }

  function renderSearchParams() {
    const filterForParams = utilService.getOnlyExistingValues(filterBy)
    filterForParams.labels = filterForParams.labels.join(',')
    setSearchParams(filterForParams)
  }

  async function onRemoveBug(bugId) {
    try {
      await bugService.remove(bugId)
      await loadAllLabels()
      setBugs(prevBugs => prevBugs.filter((bug) => bug._id !== bugId))
      showSuccessMsg('Bug removed')
    } catch (err) {
      console.log('Error from onRemoveBug ->', err)
      showErrorMsg('Cannot remove bug')
    }
  }

  function removeLabelsFromFilterBy() {
    let labels = structuredClone(filterBy.labels)

    labels = labels.filter(label => allLabels.includes(label))
    if (labels.length < filterBy.labels.length) {
      onSetFilterBy({ labels })
    }
  }

  async function onAddBug() {
    const bug = {
      title: prompt('Bug title?'),
      description: prompt('Bug description?'),
      severity: +prompt('Bug severity?'),
      labels: prompt('Bug labels?')?.split(', ') || []
    }
    try {
      const savedBug = await bugService.save(bug)
      await loadAllLabels()
      setBugs(prevBugs => [...prevBugs, savedBug])
      showSuccessMsg('Bug added')
    } catch (err) {
      console.log('Error from onAddBug ->', err)
      showErrorMsg('Cannot add bug')
    }
  }

  async function onEditBug(bug) {
    const severity = +prompt('New severity?')
    const bugToSave = { ...bug, severity }
    try {
      const savedBug = await bugService.save(bugToSave)
      setBugs(prevBugs => prevBugs.map((currBug) =>
        currBug._id === savedBug._id ? savedBug : currBug
      ))
      showSuccessMsg('Bug updated')
    } catch (err) {
      console.log('Error from onEditBug ->', err)
      showErrorMsg('Cannot update bug')
    }
  }

  async function onAddMsg(bugId) {
    const msg = {
      txt: prompt('Message for this bug?'),
      aboutBugId: bugId,
      byUserId: userService.getLoggedInUser()._id
    }
    try {
      await msgService.save(msg)
      showSuccessMsg('Message for this bug successfully added')
    } catch (err) {
      showErrorMsg('Cannot add message')
    }
  }

  const loggedInUser = userService.getLoggedInUser()
  const { txt, minSeverity, labels, sortBy, sortDir, pageIdx } = filterBy
  console.log("Rendered");

  return (
    <main className="bug-index">
      <h3>Bugs App</h3>
      <main>
        <BugPagination
          defaultFilterBy={{ pageIdx }}
          onSetFilterBy={onSetFilterBy} />
        <BugFilter
          defaultFilterBy={{ txt, minSeverity }}
          onSetFilterBy={onSetFilterBy} />
        <BugFilterLabels
          allLabels={allLabels}
          defaultFilterBy={{ labels }}
          onSetFilterBy={onSetFilterBy} />
        <BugSort
          defaultFilterBy={{ sortBy, sortDir }}
          onSetFilterBy={onSetFilterBy} />
        {loggedInUser &&
          <button
            className='add-btn'
            onClick={onAddBug}>
            Add Bug ⛐
          </button>}
        <BugList
          bugs={bugs}
          onRemoveBug={onRemoveBug}
          onEditBug={onEditBug}
          onAddMsg={onAddMsg} />
      </main>
    </main>
  )
}
