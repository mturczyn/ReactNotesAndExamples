import { Placement } from '@popperjs/core'
import { placements } from './popperOptions'

export function SelectPlacement({
    setPlacement,
}: {
    setPlacement: (e: Placement) => void
}) {
    return (
        <select onChange={(e) => setPlacement(e.target.value as Placement)}>
            {placements.map((x) => (
                <option key={x} value={x}>
                    {x}
                </option>
            ))}
        </select>
    )
}
