import { useCallback, useState } from 'react'
import image from '../memory-leak-in-dev-tools.png'

class BigObject {
    public readonly data = new Uint8Array(1024 * 1024 * 10) // 10MB of data
}

export const MemoryLeakExample = () => {
    const [countA, setCountA] = useState(0)
    const [countB, setCountB] = useState(0)
    const bigData = new BigObject()

    const handleClickA = useCallback(() => {
        setCountA(countA + 1)
    }, [countA])

    const handleClickB = useCallback(() => {
        setCountB(countB + 1)
    }, [countB])

    const handleBoth = () => {
        handleClickA()
        handleClickB()
        console.log('big data length', bigData.data.length)
    }

    return (
        <div>
            <div>
                This notes are based on the article{' '}
                <a href="https://schiener.io/2024-03-03/react-closures?utm_source=newsletter.reactdigest.net&utm_medium=newsletter&utm_campaign=sneaky-react-memory-leaks">
                    Sneaky React Memory Leaks: How useCallback and closures can
                    bite you
                </a>
            </div>
            <div>
                In order to prouce memory click, we need to click countA, then
                countB, and so on. Then we can observe result in dev tools, in
                memory tab:
            </div>
            <img
                src={image}
                style={{
                    width: '50rem',
                    margin: '1rem',
                    border: '1px solid black',
                }}
            />
            <br />
            <button onClick={handleClickA}>Increment countA</button>
            <button onClick={handleClickB}>Increment countB</button>
            <button onClick={handleBoth}>Increment both</button>
        </div>
    )
}
