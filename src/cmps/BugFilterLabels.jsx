import { useEffect, useState } from "react"
import { MultipleSelectCheckmarks } from "./MultipleSelectCheckmarks"

export const BugFilterLabels = ({ allLabels, defaultFilterBy, onSetFilterBy }) => {
    const [filterBy, setFilterBy] = useState(defaultFilterBy)

    useEffect(() => {
        if (JSON.stringify(filterBy) !== JSON.stringify(defaultFilterBy)) {
            setFilterBy(defaultFilterBy)
        }
    }, [defaultFilterBy])

    useEffect(() => {
        onSetFilterBy(filterBy)
    }, [filterBy])

    function onSetLabels(labels) {
        setFilterBy(filterBy => ({ ...filterBy, labels }))
    }
    const labels = filterBy.labels

    return (
        <div className="bug-filter-labels">
            <MultipleSelectCheckmarks
                allItems={allLabels}
                itemsToMark={labels}
                onSetItems={onSetLabels} />
        </div>
    )
}
