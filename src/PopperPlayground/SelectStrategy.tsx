import { PositioningStrategy } from '@popperjs/core'
import { strategies } from './popperOptions'

export function SelectStrategy({
    setStrategy,
}: {
    setStrategy: (e: PositioningStrategy) => void
}) {
    return (
        <select
            onChange={(e) => setStrategy(e.target.value as PositioningStrategy)}
        >
            {strategies.map((x) => (
                <option key={x} value={x}>
                    {x}
                </option>
            ))}
        </select>
    )
}
