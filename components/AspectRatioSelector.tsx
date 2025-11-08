import React from 'react';

interface AspectRatioSelectorProps {
    selectedAspectRatio: string;
    onSelectAspectRatio: (ratio: string) => void;
    disabled?: boolean;
}

const RATIOS = [
    { value: '1:1', label: 'Quadrado' },
    { value: '16:9', label: 'Paisagem' },
    { value: '9:16', label: 'Retrato' },
];

const SquareIcon: React.FC<{className?: string}> = ({className}) => (
    <svg viewBox="0 0 20 20" fill="currentColor" className={className}><path d="M4 4h12v12H4z"></path></svg>
);
const LandscapeIcon: React.FC<{className?: string}> = ({className}) => (
    <svg viewBox="0 0 20 20" fill="currentColor" className={className}><path d="M2 6h16v8H2z"></path></svg>
);
const PortraitIcon: React.FC<{className?: string}> = ({className}) => (
    <svg viewBox="0 0 20 20" fill="currentColor" className={className}><path d="M6 2h8v16H6z"></path></svg>
);


const ICONS: { [key: string]: React.FC<{className?: string}> } = {
    '1:1': SquareIcon,
    '16:9': LandscapeIcon,
    '9:16': PortraitIcon,
};


export const AspectRatioSelector: React.FC<AspectRatioSelectorProps> = ({ selectedAspectRatio, onSelectAspectRatio, disabled }) => {
    
    return (
        <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">Proporção</label>
            <div className="relative">
                <div className="flex items-center gap-2">
                    {RATIOS.map(({value, label}) => {
                        const Icon = ICONS[value];
                        return (
                            <button
                                key={value}
                                title={label}
                                onClick={() => onSelectAspectRatio(value)}
                                disabled={disabled}
                                className={`flex-1 flex flex-col items-center justify-center gap-1.5 p-2 text-xs font-medium rounded-lg transition-colors border-2
                                    ${selectedAspectRatio === value
                                        ? 'bg-indigo-600/30 border-indigo-500 text-white'
                                        : 'bg-gray-700/50 border-gray-600 text-gray-300 hover:border-gray-500'
                                    }
                                    disabled:opacity-50 disabled:hover:border-gray-600 disabled:cursor-not-allowed
                                `}
                                aria-label={`Selecionar proporção ${label}`}
                            >
                                <Icon className="h-5 w-5" />
                                <span>{value}</span>
                            </button>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};