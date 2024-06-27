export const PopperPlaygroundDescription = ({
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
        <p>
            Flip modifier is used here, that provides fallback position when
            tooltip goes out of desired bounds. Here, our view is the page and
            if tooltip is on the left, we speicified top value as fallback in
            flip modifier.
        </p>
        <p
            style={{
                display: 'block',
                marginBottom: '1rem',
                textDecoration: 'underline',
            }}
        >
            <button onClick={handleFocusTooltipOwner}>Focus the button</button>{' '}
            or hover over below button in the example.
        </p>
        <hr />
    </>
)
