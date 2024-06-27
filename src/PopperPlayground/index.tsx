import { Instance, OptionsGeneric, createPopper } from '@popperjs/core'
import { useEffect, useRef } from 'react'
import './PopperPlayground.css'

const offsetModifier = {
    name: 'offset',
    options: {
        offset: [0, 8],
    },
}

const showEvents = ['mouseenter', 'focus']
const hideEvents = ['mouseleave', 'blur']

const PopperPlaygroundDescription = ({
    handleFocusTooltipOwner,
}: {
    handleFocusTooltipOwner: () => void
}) => (
    <>
        <h1>Showcase popper from @popperjs/core library</h1>
        <p>
            The implementation of this page was taken (followed) from{' '}
            <a href="https://popper.js.org/docs/v2/tutorial/">
                this popper brief tutorial.
            </a>{' '}
            Below button has tooltip, that shows, when the button is hovered
            over or focued.{' '}
        </p>
        <p
            style={{
                display: 'block',
                marginBottom: '1rem',
                textDecoration: 'underline',
            }}
        >
            <button onClick={handleFocusTooltipOwner}>Focus the button</button>{' '}
            or hover over the below button.
        </p>
        <hr />
    </>
)

export function PopperPlayground() {
    const buttonRef = useRef<HTMLButtonElement>(null)
    const divRef = useRef<HTMLDivElement>(null)
    const popperInstance = useRef<Instance | null>(null)

    function focusButton() {
        buttonRef.current?.focus()
    }

    function show() {
        divRef.current?.setAttribute('data-show', '')

        // Enable the event listeners
        popperInstance.current?.setOptions((options) => ({
            ...options,
            modifiers: [
                ...(options.modifiers ?? []),
                { name: 'eventListeners', enabled: true },
            ],
        }))

        // We need to tell Popper to update the tooltip position
        // after we show the tooltip, otherwise it will be incorrect
        popperInstance.current?.update()
    }

    function hide() {
        divRef.current?.removeAttribute('data-show')

        // Disable the event listeners
        popperInstance.current?.setOptions((options) => ({
            ...options,
            modifiers: [
                ...(options.modifiers ?? []),
                { name: 'eventListeners', enabled: false },
            ],
        }))
    }

    useEffect(() => {
        showEvents.forEach((event) => {
            buttonRef.current?.addEventListener(event, show)
        })

        hideEvents.forEach((event) => {
            buttonRef.current?.addEventListener(event, hide)
        })

        return () => {
            showEvents.forEach((event) => {
                buttonRef.current?.removeEventListener(event, show)
            })

            hideEvents.forEach((event) => {
                buttonRef.current?.removeEventListener(event, hide)
            })
        }
    }, [])

    useEffect(() => {
        if (!buttonRef.current || !divRef.current) {
            return
        }

        popperInstance.current = createPopper(
            buttonRef.current,
            divRef.current,
            {
                placement: 'right',
                modifiers: [offsetModifier],
            }
        )
    }, [])

    return (
        <>
            <PopperPlaygroundDescription
                handleFocusTooltipOwner={focusButton}
            />
            <button ref={buttonRef} id="button" aria-describedby="tooltip">
                My button
            </button>
            <div ref={divRef} id="tooltip" role="tooltip" data-popper-arrow>
                My tooltip
                <div id="arrow" data-popper-arrow></div>
            </div>
        </>
    )
}
