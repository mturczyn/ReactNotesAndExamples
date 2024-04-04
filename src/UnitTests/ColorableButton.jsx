import { useState } from 'react'

export const RED = 'red'
export const GREEN = 'green'

// The component is purely for unit tests purposes.
export function ColorableButton() {
    const [color, setColor] = useState(RED)

    return (
        <div style={{ color: color }}>
            Hello world{' '}
            <button
                onClick={() => setColor((c) => (c === RED ? GREEN : RED))}
            ></button>
        </div>
    )
}
