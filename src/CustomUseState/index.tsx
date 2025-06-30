import { createRoot } from 'react-dom/client'
import { useState } from './useState'
import { useEffect } from 'react'

export const UseStateExampleAppRootId = 'use-state-example-app-root-id'

let root: any

// This is used in useState hook to reflect React rerendering component on state change.
export const render = () => {
    if (!root) {
        root = createRoot(document.getElementById(UseStateExampleAppRootId)!)
    }
    root.render(<UseStateExample />)
}

export const UseStateExampleApp = () => {
    useEffect(() => {
        render()
    }, [])

    return (
        <>
            <p>Playground area with custom implementation of useState hook.</p>

            <p>
                Based on article{' '}
                <a href="https://www.deepintodev.com/blog/how-to-create-your-own-simple-use-state-hook?utm_source=bonobopress&utm_medium=newsletter&utm_campaign=2077">
                    How to Create Your Own Simple useState Hook
                </a>
            </p>
            <div id={UseStateExampleAppRootId}></div>
        </>
    )
}

export const UseStateExample = () => {
    const [count, setCount] = useState(0)
    const [countB, setCountB] = useState(0)

    return (
        <div>
            <button onClick={() => setCount(count + 1)}>A : {count}</button>
            <button onClick={() => setCountB(countB + 1)}>B : {countB}</button>
        </div>
    )
}
