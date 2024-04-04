import { render, screen, waitFor } from '@testing-library/react'
import { ColorableButton, GREEN, RED } from './ColorableButton'
import userEvent from '@testing-library/user-event'

test('To have a button', () => {
    render(<ColorableButton />)
    const btn = screen.getByRole('button')
    expect(btn).toBeInTheDocument()
})

test('Changes background when clicked', async () => {
    render(<ColorableButton />)
    const btn = screen.getByRole('button')
    userEvent.click(btn)
    // eslint-disable-next-line testing-library/no-debugging-utils, testing-library/no-node-access
    screen.debug(btn.closest('div'))

    // waitFor is used when we trigger asynchronous operations, such as setting
    // a state. Below is great example - if we assert synchronously, we
    // assert succesfully RED color, which should fail.
    // After, we await assertion for GREEN color, which also succeeds.
    const greenAssert = waitFor(() =>
        // eslint-disable-next-line testing-library/no-node-access
        expect(btn.closest('div').style.color).toBe(GREEN)
    )
    // eslint-disable-next-line testing-library/no-node-access
    expect(btn.closest('div').style.color).toBe(RED)

    await greenAssert
})
