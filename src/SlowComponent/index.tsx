import { memo, useCallback, useState } from 'react'
import '../index.css'

/**
 * This component is supposed to imitate slow rendering.
 * It accepts some function to better show how useCallback
 * could be utilized.
 * @param param0
 * @returns
 */
const SlowComponent = ({
    identifier,
    onMyEvent,
}: {
    identifier: string
    onMyEvent: () => void
}) => {
    const start = Date.now()
    console.log('starting slow render at', start, 'for', identifier)
    while (Date.now() - start < 1000) {}
    console.log('finishing slow render at', Date.now(), 'for', identifier)
    return (
        <>
            <h2>
                {identifier} (rendered at {new Date().toLocaleString('pl-PL')})
            </h2>
            <button onClick={onMyEvent}>My event {start}</button>
        </>
    )
}

const MemoizedSlowComponent = memo(SlowComponent)

export const SlowComponentTestArea = () => {
    const [date, setDate] = useState(new Date())

    const myEvent = () => alert('My event just happened')

    const myEventWithCallback = useCallback(
        () => alert('My memoized event just happened'),
        []
    )

    return (
        <div>
            <h1>
                This is example of component that takes long time to render. The
                slow component is memoized, and function parameter passed to the
                slow component is memoized with <code>useCallback</code>, the
                other example does not use function memoization.
            </h1>
            <div className="bordered">
                <p>
                    By pressing below button we will change state of parent
                    component, causing it to rerender and we can observe how
                    children slow components behave.
                </p>
                <h4>
                    Current date is{' '}
                    {date.toLocaleString('pl-PL', {
                        dateStyle: 'full',
                        timeStyle: 'long',
                        timeZone: 'Australia/Sydney',
                    })}
                </h4>
                <button onClick={() => setDate(new Date())}>
                    Update current date
                </button>
            </div>
            <div className="bordered">
                <p>
                    First component, with <code>useCallback</code>
                    <MemoizedSlowComponent
                        onMyEvent={myEventWithCallback}
                        identifier="With callback"
                    />
                </p>
            </div>
            <div className="bordered">
                <p>
                    Second component, without <code>useCallback</code>
                    <MemoizedSlowComponent
                        onMyEvent={myEvent}
                        identifier="Without callback"
                    />
                </p>
            </div>
        </div>
    )
}
