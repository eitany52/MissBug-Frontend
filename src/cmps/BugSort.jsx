import { useEffect, useState } from "react"

export const BugSort = ({ defaultFilterBy, onSetFilterBy }) => {
    const [filterBy, setFilterBy] = useState(defaultFilterBy)

    useEffect(() => {
        onSetFilterBy(filterBy)
    }, [filterBy])

    function onChangeSortBy({ target }) {
        const sortBy = target.value
        let sortDir = filterBy.sortDir

        if (!sortBy) {
            sortDir = null
        }
        else if (sortBy && !sortDir) {
            sortDir = 1
        }
        setFilterBy(filterBy => ({ ...filterBy, sortBy, sortDir }))
    }

    function onChangeSortDir({ target }) {
        const sortDir = +target.value
        setFilterBy(filterBy => ({ ...filterBy, sortDir }))
    }

    const { sortBy, sortDir } = filterBy
    return (
        <div className='bug-sort'>
            <h2>Sort Bugs</h2>
            <form>
                <label
                    htmlFor="sortBy">
                    Sort by
                </label>
                <select
                    name="sortBy"
                    onChange={onChangeSortBy}
                    value={!sortBy ? "" : sortBy}>
                    <option value="">Choose sort by</option>
                    <option value="title">Title</option>
                    <option value="severity">Severity</option>
                    <option value="createdAt">Date</option>
                </select>
                {sortBy &&
                    <label
                        htmlFor="sortDir">
                        Sort direction
                    </label>}
                {sortBy &&
                    <select
                        name="sortDir"
                        onChange={onChangeSortDir}
                        value={sortDir}>
                        <option value="1">Ascending</option>
                        <option value="-1">Descending</option>
                    </select>}
            </form>
        </div>
    )
}
