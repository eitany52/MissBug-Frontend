import { useEffect, useState } from "react"

export const BugPagination = ({ defaultFilterBy, onSetFilterBy }) => {
    const [filterBy, setFilterBy] = useState(defaultFilterBy)

    useEffect(() => {
        onSetFilterBy(filterBy)
    }, [filterBy])


    function onTogglePaging() {
        const isPaging = filterBy.pageIdx !== null
        setFilterBy(filterBy => ({ ...filterBy, pageIdx: isPaging ? null : 0 }))
    }

    function onChangePageIdx(pageIdx) {
        if (pageIdx < 0) return
        setFilterBy(filterBy => ({ ...filterBy, pageIdx }))
    }

    const pageIdx = filterBy.pageIdx
    const isPaging = pageIdx !== null
    return (
        <div className="bug-pagination">
            <label htmlFor="paging">Use paging</label>
            <input type="checkbox" checked={isPaging} onChange={onTogglePaging} />
            {isPaging &&
                <section>
                    <button onClick={() => onChangePageIdx(pageIdx - 1)}>-</button>
                    <span>{pageIdx + 1}</span>
                    <button onClick={() => onChangePageIdx(pageIdx + 1)}>+</button>
                </section>}
        </div>
    )
}
