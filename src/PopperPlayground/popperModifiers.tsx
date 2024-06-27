import { ModifierArguments, ModifierPhases, Options } from '@popperjs/core'

// By matching name of existing modifier we can
// alter it.
export const flipModifier = {
    name: 'flip',
    options: {
        fallbackPlacements: ['top'],
    },
}

export const offsetModifier = {
    name: 'offset',
    options: {
        offset: [0, 8],
    },
}

export const topLoggerModifier = {
    name: 'topLogger',
    enabled: true,
    phase: 'main' as ModifierPhases,
    fn({ state }: ModifierArguments<Options>) {
        if (state.placement === 'top') {
            console.log('Popper is on the top')
        }
    },
}
