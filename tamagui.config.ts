import { createTamagui } from '@tamagui/core';

const config = createTamagui({
    tokens: {
        color: {
            primary: '#5E60CE',
            secondary: '#A3A5E6',
            background: '#1A1B41',
            cardBackground: '#292A5F',
            text: '#FFFFFF',
            muted: '#9E9FB1',
        },
        space: {
            small: 8,
            medium: 16,
            large: 24,
        },
        size: {
            small: 12,
            medium: 16,
            large: 20,
        },
        radius: {
            small: 8,
            medium: 12,
            large: 16,
        },
        zIndex: {
            low: 1,
            medium: 10,
            high: 100,
        },
    },
    themes: {
        light: {
            background: '$background',
            text: '$text',
            primary: '$primary',
            secondary: '$secondary',
            muted: '$muted',
            cardBackground: '$cardBackground',
        },
        dark: {
            background: '#000000',
            text: '#FFFFFF',
            primary: '#8E99F3',
            secondary: '#A3B0FF',
            muted: '#CCCCCC',
            cardBackground: '#1F1F3E',
        },
    },
    shorthands: {
        bg: 'background',
        br: 'borderRadius',
        p: 'padding',
        m: 'margin',
    },
    fonts: {
        body: {
            family: 'System',
            size: {
                small: 14,
                medium: 16,
                large: 18,
            },
            weight: {
                normal: '400',
                bold: '700',
            },
        },
    },
});

export default config;
