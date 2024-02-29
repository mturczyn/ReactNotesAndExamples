// InfiniteScroll.js
import { useState, useEffect } from 'react'
import { useInView } from 'react-intersection-observer'

const InfiniteScroll = ({ loadMore }) => {
    const [ref, inView] = useInView({
        triggerOnce: true,
    })

    useEffect(() => {
        if (inView) {
            loadMore()
        }
    }, [inView, loadMore])

    return <div ref={ref} style={{ height: '10px' }} />
}

const initialItems = [
    { id: 1, content: 'Item 1' },
    { id: 2, content: 'Item 2' },
    { id: 3, content: 'Item 3' },
]

const fetchMoreData = (page) => {
    // Simulate fetching more data from an API
    return Array.from({ length: 5 }, (_, index) => ({
        id: initialItems.length + index + 1,
        content: `Item ${initialItems.length + index + 1}`,
    }))
}

const InfiniteScrollList = () => {
    const [items, setItems] = useState(initialItems)
    const [page, setPage] = useState(1)

    const loadMore = () => {
        // Simulate fetching more data from an API
        const newData = fetchMoreData(page + 1)
        setItems([...items, ...newData])
        setPage(page + 1)
    }

    return (
        <div>
            {items.map((item) => (
                <div key={item.id} className="list-item">
                    {/* Render your list item content here */}
                    {item.content}
                </div>
            ))}
            <InfiniteScroll loadMore={loadMore} />
        </div>
    )
}

export default InfiniteScrollList
