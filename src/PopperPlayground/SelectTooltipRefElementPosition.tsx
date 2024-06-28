const positionInitial = 'initial'
const positionFixed = 'fixed'
const positions = [positionInitial, positionFixed] as const
export type Position = (typeof positions)[number]

export const SelectTooltipRefElementPosition = ({
    setPosition,
}: {
    setPosition: (e: Position) => void
}) => {
    return (
        <select onChange={(e) => setPosition(e.target.value as Position)}>
            {positions.map((x) => (
                <option key={x} value={x}>
                    {x}
                </option>
            ))}
        </select>
    )
}
