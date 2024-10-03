import { useEffect, useState } from "react"

export const BugFilter = ({ defaultFilterBy, onSetFilterBy }) => {
    const [filterBy, setFilterBy] = useState(defaultFilterBy)

    useEffect(() => {
        onSetFilterBy(filterBy)
    }, [filterBy])


    function onChangeInput({ target }) {
        const { type, name: key } = target
        let value = target.value
        value = type === 'range' ? +value : value
        setFilterBy(filterBy => ({ ...filterBy, [key]: value }))
    }

    const { txt, minSeverity } = filterBy
    return (
        <div className="bug-filter">
            <h2>Filter Bugs</h2>
            <form>
                <label
                    htmlFor="txt">
                    Title
                </label>
                <input
                    value={txt}
                    onChange={onChangeInput}
                    type="text"
                    name="txt" />
                <label
                    htmlFor="minSeverity">
                    Min Severity
                </label>
                <input
                    value={minSeverity}
                    onChange={onChangeInput}
                    type="range"
                    min={0}
                    max={10}
                    name="minSeverity" />
                <span>{minSeverity}</span>
            </form>
        </div>
    )
}
