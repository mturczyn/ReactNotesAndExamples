import {
    Instance,
    Placement,
    PositioningStrategy,
    createPopper,
} from '@popperjs/core'
import { useEffect, useRef, useState } from 'react'
import './PopperPlayground.css'
import {
    offsetModifier,
    topLoggerModifier,
    flipModifier,
} from './popperModifiers'
import { PopperPlaygroundDescription } from './PopperPlaygroundDescription'
import { SelectStrategy } from './SelectStrategy'
import { SelectPlacement } from './SelectPlacement'
import {
    Position,
    SelectTooltipRefElementPosition,
} from './SelectTooltipRefElementPosition'

const showEvents = ['mouseenter', 'focus']
const hideEvents = ['mouseleave', 'blur']

export function PopperPlayground() {
    const buttonRef = useRef<HTMLButtonElement>(null)
    const divRef = useRef<HTMLDivElement>(null)
    const popperInstance = useRef<Instance | null>(null)
    const [showAlwaysTooltip, setShowAlwaysTooltip] = useState(false)
    const [strategy, setStrategy] = useState<PositioningStrategy>('absolute')
    const [tooltipRefItemPositioning, setTooltipRefItemPositioning] =
        useState<Position>('initial')
    const [placement, setPlacement] = useState<Placement>('right')

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
                placement: placement,
                strategy: strategy,
                modifiers: [offsetModifier, topLoggerModifier, flipModifier],
            }
        )
    }, [placement, strategy])

    return (
        <>
            <PopperPlaygroundDescription
                handleFocusTooltipOwner={focusButton}
            />
            <h3>Options</h3>
            <p>
                As it is stated in the docs, if tooltip ref element has position{' '}
                <code>fixed</code>, than the strategy of the tooltip has to have
                also position <code>fixed</code>. Otherwise, there maybe some
                unwanted effects when scrolling.
            </p>
            <label>
                Show tooltip always
                <input
                    onChange={(e) => setShowAlwaysTooltip(e.target.checked)}
                    type="checkbox"
                />
            </label>
            <br />
            <label>
                Set placement
                <SelectPlacement setPlacement={setPlacement} />
            </label>
            <br />
            <label>
                Set positioning strategy
                <SelectStrategy setStrategy={setStrategy} />
            </label>
            <br />
            <label>
                Set positioning of tooltip ref element
                <SelectTooltipRefElementPosition
                    setPosition={setTooltipRefItemPositioning}
                />
            </label>
            <hr />
            <h3>Example</h3>
            <button ref={buttonRef} id="button" aria-describedby="tooltip">
                My button
            </button>
            <div
                className={showAlwaysTooltip ? undefined : 'display-none'}
                ref={divRef}
                id="tooltip"
                role="tooltip"
                style={{ position: tooltipRefItemPositioning }}
                data-popper-arrow
            >
                My tooltip
                <div id="arrow" data-popper-arrow></div>
            </div>
            ,
            <div
                style={{
                    height: '300vh',
                    background: 'aliceblue',
                    display: 'grid',
                    placeItems: 'start center',
                    border: '1px dotted black',
                    margin: '1rem',
                }}
            >
                <h1 style={{ margin: '1rem' }}>
                    Area just to make the page scrollable
                </h1>
            </div>
        </>
    )
}
