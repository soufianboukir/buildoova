'use client';

import { StepIconProps } from '@mui/material/StepIcon';
import { Check } from 'lucide-react';
import clsx from 'clsx';
import { styled } from '@mui/material/styles';

const QontoStepIconRoot = styled('div')(({ theme }) => ({
    color: theme.palette.mode === 'dark' ? theme.palette.grey[700] : '#ccc',
    display: 'flex',
    height: 22,
    alignItems: 'center',
}));

const QontoStepIconCircle = styled('div')(() => ({
    width: 8,
    height: 8,
    borderRadius: '50%',
    backgroundColor: 'currentColor',
}));

export function QontoStepIcon(props: StepIconProps) {
    const { active, completed, className } = props;

    return (
        <QontoStepIconRoot className={clsx(className, { active })}>
        {completed ? <Check className="w-4 h-4 text-primary" /> : <QontoStepIconCircle />}
        </QontoStepIconRoot>
    );
}
