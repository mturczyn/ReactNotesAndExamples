import { Instance, createPopper, popper } from '@popperjs/core'
import { useEffect, useRef } from 'react'
import './PopperPlayground.css'

export function PopperPlayground() {
    const buttonRef = useRef<HTMLButtonElement>(null)
    const divRef = useRef<HTMLDivElement>(null)
    const popperInstance = useRef<Instance | null>(null)

    useEffect(() => {
        if (!buttonRef.current || !divRef.current) {
            return
        }

        popperInstance.current = createPopper(
            buttonRef.current,
            divRef.current,
            {
                placement: 'right',
            }
        )
    }, [])

    return (
        <>
            <button ref={buttonRef} id="button" aria-describedby="tooltip">
                My button
            </button>
            <div ref={divRef} id="tooltip" role="tooltip">
                My tooltip
            </div>
        </>
    )
}
