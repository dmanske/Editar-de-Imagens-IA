import React from 'react';

interface StyleSelectorProps {
    selectedStyle: string;
    onSelectStyle: (style: string) => void;
    disabled?: boolean;
}

const STYLES = [
    "Fotorrealista", "Anime", "Cyberpunk", "Vintage", 
    "Render 3D", "Aquarela", "Pixel Art", "Fantasia", "Estilo Laika"
];

export const StyleSelector: React.FC<StyleSelectorProps> = ({ selectedStyle, onSelectStyle, disabled }) => {
    return (
        <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">Estilo Artístico</label>
            <div className="flex flex-wrap gap-2">
                {STYLES.map(style => (
                    <button
                        key={style}
                        onClick={() => onSelectStyle(selectedStyle === style ? '' : style)}
                        disabled={disabled}
                        className={`px-3 py-1.5 text-xs font-medium rounded-full transition-colors disabled:opacity-50
                            ${selectedStyle === style 
                                ? 'bg-indigo-500 text-white' 
                                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                            }`
                        }
                    >
                        {style}
                    </button>
                ))}
            </div>
        </div>
    );
};