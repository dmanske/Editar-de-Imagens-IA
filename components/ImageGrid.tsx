import React from 'react';

interface ImageGridProps {
    images: string[];
    isLoading: boolean;
    onSavePrompt: () => void;
    lastGeneratedPrompt: string;
    isPromptSaved: boolean;
    onImageClick: (index: number) => void;
    selectedIndices: number[];
    onToggleSelection: (index: number) => void;
    onSelectAll: () => void;
}

const SaveIcon: React.FC<{className?: string}> = ({className}) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path fillRule="evenodd" d="M6.32 2.577a49.255 49.255 0 0 1 11.36 0c1.497.174 2.57 1.46 2.57 2.93V21a.75.75 0 0 1-1.085.67L12 18.089l-7.165 3.583A.75.75 0 0 1 3.75 21V5.507c0-1.47 1.073-2.756 2.57-2.93Z" clipRule="evenodd" />
    </svg>
);

const CheckIcon: React.FC<{className?: string}> = ({className}) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.06-1.06L11.25 12.19l-1.72-1.72a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.06 0l3.75-3.75Z" clipRule="evenodd" />
    </svg>
);

const DownloadIcon: React.FC<{className?: string}> = ({className}) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path fillRule="evenodd" d="M12 2.25a.75.75 0 0 1 .75.75v11.69l3.22-3.22a.75.75 0 1 1 1.06 1.06l-4.5 4.5a.75.75 0 0 1-1.06 0l-4.5-4.5a.75.75 0 1 1 1.06-1.06l3.22 3.22V3a.75.75 0 0 1 .75-.75Zm-9 13.5a.75.75 0 0 1 .75.75v2.25a1.5 1.5 0 0 0 1.5 1.5h13.5a1.5 1.5 0 0 0 1.5-1.5V16.5a.75.75 0 0 1 1.5 0v2.25a3 3 0 0 1-3 3H5.25a3 3 0 0 1-3-3V16.5a.75.75 0 0 1 .75-.75Z" clipRule="evenodd" />
    </svg>
);

const Loader: React.FC = () => (
    <div className="flex flex-col items-center justify-center h-full min-h-[300px] bg-gray-800/50 rounded-lg p-8 text-center">
        <svg className="animate-spin -ml-1 mr-3 h-10 w-10 text-indigo-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        <p className="mt-4 text-lg font-semibold text-gray-300">Gerando sua obra-prima...</p>
        <p className="text-sm text-gray-400">Isso pode levar um momento. Por favor, aguarde.</p>
    </div>
);

const downloadImage = (src: string, filename: string) => {
    const link = document.createElement('a');
    link.href = src;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
};

const getFilename = (src: string, index: number): string => {
    const mimeType = src.match(/data:(image\/\w+);/)?.[1] || 'image/jpeg';
    const extension = mimeType.split('/')[1] || 'jpg';
    return `generated-image-${index + 1}.${extension}`;
};


export const ImageGrid: React.FC<ImageGridProps> = ({ images, isLoading, onSavePrompt, lastGeneratedPrompt, isPromptSaved, onImageClick, selectedIndices, onToggleSelection, onSelectAll }) => {
    if (isLoading) {
        return <Loader />;
    }

    if (images.length === 0) {
        return (
            <div className="flex items-center justify-center h-full min-h-[300px] bg-gray-800/50 border-2 border-dashed border-gray-700 rounded-lg p-8 text-center">
                <p className="text-gray-400">Suas imagens geradas aparecerão aqui.</p>
            </div>
        );
    }

    const handleDownload = (e: React.MouseEvent, src: string, index: number) => {
        e.stopPropagation(); // Prevent modal from opening when downloading
        downloadImage(src, getFilename(src, index));
    };

    const handleDownloadSelected = async () => {
        const selectedImageIndices = selectedIndices.sort((a,b) => a - b);
        for (const index of selectedImageIndices) {
            downloadImage(images[index], getFilename(images[index], index));
            await new Promise(resolve => setTimeout(resolve, 300));
        }
    };
    
    const handleDownloadAll = async () => {
        for(let i = 0; i < images.length; i++) {
            downloadImage(images[i], getFilename(images[i], i));
            await new Promise(resolve => setTimeout(resolve, 300));
        }
    };
    
    const allSelected = images.length > 0 && selectedIndices.length === images.length;

    return (
        <div className="space-y-4">
             <div className="flex flex-col sm:flex-row justify-between items-center bg-gray-800 p-3 rounded-lg border border-gray-700 gap-3">
                <p className="text-sm text-gray-400 flex-1 truncate pr-4 text-center sm:text-left">Prompt: "{lastGeneratedPrompt}"</p>
                <button
                    onClick={onSavePrompt}
                    disabled={isPromptSaved}
                    className="flex items-center gap-2 px-3 py-1.5 text-xs font-semibold text-white bg-purple-600 rounded-md hover:bg-purple-500 disabled:bg-gray-600 disabled:cursor-not-allowed transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-purple-500"
                >
                    {isPromptSaved ? <><CheckIcon className="h-4 w-4"/> Salvo</> : <><SaveIcon className="h-4 w-4"/> Salvar Prompt</>}
                </button>
            </div>
            
            <div className="flex flex-col sm:flex-row justify-between items-center gap-3">
                 <div className="flex items-center">
                    <input
                        type="checkbox"
                        id="select-all"
                        className="h-4 w-4 rounded border-gray-600 bg-gray-700 text-indigo-600 focus:ring-indigo-500 cursor-pointer"
                        checked={allSelected}
                        onChange={onSelectAll}
                    />
                    <label htmlFor="select-all" className="ml-2 text-sm text-gray-300 cursor-pointer">
                        {allSelected ? 'Desselecionar Todos' : 'Selecionar Todos'} ({selectedIndices.length}/{images.length})
                    </label>
                </div>

                <div className="flex items-center gap-2">
                    <button 
                        onClick={handleDownloadSelected}
                        disabled={selectedIndices.length === 0}
                        className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-gray-600 rounded-md hover:bg-gray-500 disabled:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                         <DownloadIcon className="h-4 w-4"/>
                         Baixar Selecionados ({selectedIndices.length})
                    </button>
                    <button 
                        onClick={handleDownloadAll}
                        className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-indigo-600 rounded-md hover:bg-indigo-500 transition-colors"
                    >
                        <DownloadIcon className="h-4 w-4"/>
                        Baixar Todos ({images.length})
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {images.map((src, index) => {
                    const isSelected = selectedIndices.includes(index);
                    return(
                    <div 
                        key={index}
                        onClick={() => onImageClick(index)}
                        className={`group relative aspect-square bg-gray-700 rounded-lg overflow-hidden border-2 transition-all duration-300 shadow-lg cursor-pointer ${isSelected ? 'border-indigo-500' : 'border-transparent hover:border-indigo-500'}`}
                        role="button"
                        aria-label={`Ampliar imagem ${index + 1}`}
                    >
                        <img src={src} alt={`Imagem gerada ${index + 1}`} className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                            <button
                                onClick={(e) => handleDownload(e, src, index)}
                                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-indigo-600 rounded-md hover:bg-indigo-500 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-indigo-500"
                                aria-label={`Baixar imagem ${index + 1}`}
                            >
                                <DownloadIcon className="h-4 w-4"/>
                                Baixar
                            </button>
                        </div>
                         <div 
                            className="absolute top-2 left-2 z-10"
                            onClick={(e) => {
                                e.stopPropagation();
                                onToggleSelection(index);
                            }}
                         >
                            <div className={`w-6 h-6 rounded-full flex items-center justify-center transition-colors ${isSelected ? 'bg-indigo-600' : 'bg-black/50 group-hover:bg-black/70'}`}>
                                {isSelected && (
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 text-white">
                                        <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.052-.143Z" clipRule="evenodd" />
                                    </svg>
                                )}
                            </div>
                        </div>
                    </div>
                )})}
            </div>
        </div>
    );
};