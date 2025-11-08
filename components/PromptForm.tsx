import React from 'react';
import { StyleSelector } from './StyleSelector';
import { AspectRatioSelector } from './AspectRatioSelector';

interface PromptFormProps {
    prompt: string;
    setPrompt: (prompt: string) => void;
    numImages: number;
    setNumImages: (num: number) => void;
    isGenerating: boolean;
    isFetchingIdeas: boolean;
    isImprovingPrompt: boolean;
    onGenerate: () => void;
    onGetIdeas: () => void;
    onImprove: () => void;
    uploadedImage: string | null;
    onImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onRemoveImage: () => void;
    selectedStyle: string;
    setSelectedStyle: (style: string) => void;
    aspectRatio: string;
    setAspectRatio: (ratio: string) => void;
}

const LightbulbIcon: React.FC<{className?: string}> = ({className}) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M12 2.25a.75.75 0 0 1 .75.75v.518c.985.253 1.905.738 2.72 1.432l.378.378c.452.453.719.993.805 1.559a.75.75 0 0 1-1.35.492c-.06-.328-.239-.623-.505-.888l-.378-.378a3.75 3.75 0 0 0-2.65-1.1c-1.286 0-2.478.62-3.23 1.638a.75.75 0 1 1-1.2-.9c.832-1.111 2.076-1.788 3.48-1.788Z" />
      <path d="M12 2.25c-4.142 0-7.5 3.358-7.5 7.5 0 1.95.746 3.727 1.97 5.068a.75.75 0 0 1-1.06 1.06C4.159 14.582 3 12.642 3 10.5 3 5.257 7.029 1.5 12 1.5c.95 0 1.868.128 2.738.371a.75.75 0 1 1-.492 1.418A6.012 6.012 0 0 0 12 2.25Z" />
      <path d="M12 15.75a.75.75 0 0 1 .75.75v5.034a.75.75 0 0 1-1.5 0V16.5a.75.75 0 0 1 .75-.75Z" />
      <path d="M15 15.75a.75.75 0 0 1 .75.75v3.151a.75.75 0 0 1-1.5 0V16.5a.75.75 0 0 1 .75-.75Z" />
      <path d="M9 15.75a.75.75 0 0 1 .75.75v3.151a.75.75 0 0 1-1.5 0V16.5a.75.75 0 0 1 .75-.75Z" />
      <path d="M12 15.75c-1.036 0-1.875.84-1.875 1.875v.188a.75.75 0 0 1-1.5 0V17.625c0-1.864 1.51-3.375 3.375-3.375s3.375 1.511 3.375 3.375v.188a.75.75 0 1 1-1.5 0V17.625c0-1.036-.84-1.875-1.875-1.875Z" />
    </svg>
);

const MagicWandIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path fillRule="evenodd" d="M9.528 1.718a.75.75 0 0 1 .162.819A8.97 8.97 0 0 0 9 6a9 9 0 0 0 9 9 8.97 8.97 0 0 0 3.463-.69a.75.75 0 0 1 .981.981A10.501 10.501 0 0 1 18 16.5a10.5 10.5 0 1 1-10.5-10.5c0-1.78.448-3.47 1.255-4.943a.75.75 0 0 1 .819-.162ZM12.75 3.25a.75.75 0 0 1 .75-.75h.008a.75.75 0 0 1 .75.75v.008a.75.75 0 0 1-.75.75h-.008a.75.75 0 0 1-.75-.75V3.25Zm-2.25.75a.75.75 0 0 0-.75.75v.008c0 .414.336.75.75.75h.008a.75.75 0 0 0 .75-.75V4.75a.75.75 0 0 0-.75-.75h-.008ZM16.5 12a.75.75 0 0 1 .75-.75h.008a.75.75 0 0 1 .75.75v.008a.75.75 0 0 1-.75.75h-.008a.75.75 0 0 1-.75-.75V12Z" clipRule="evenodd" />
    </svg>
);

const GenerateIcon: React.FC<{className?: string}> = ({className}) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M9.75 3.104v1.235a.75.75 0 0 1-.512.706 2.25 2.25 0 0 0-1.396 2.533 2.25 2.25 0 0 0 2.25 2.25h.512a.75.75 0 0 1 .706.512 2.25 2.25 0 0 0 2.533 1.396 2.25 2.25 0 0 0 2.25-2.25v-.512a.75.75 0 0 1 .512-.706 2.25 2.25 0 0 0 1.396-2.533 2.25 2.25 0 0 0-2.25-2.25h-.512a.75.75 0 0 1-.706-.512 2.25 2.25 0 0 0-2.533-1.396A2.25 2.25 0 0 0 9.75 3.104Z" />
      <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM9.47 15.143a.75.75 0 0 1 .84-1.21l1.19 1.192v-3.72a.75.75 0 0 1 1.5 0v3.72l1.19-1.192a.75.75 0 1 1 1.06 1.06l-2.5 2.5a.75.75 0 0 1-1.06 0l-2.25-2.25a.75.75 0 0 1 .22-1.313Z" clipRule="evenodd" />
    </svg>
);

const UploadIcon: React.FC<{className?: string}> = ({className}) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path fillRule="evenodd" d="M11.47 2.47a.75.75 0 0 1 1.06 0l4.5 4.5a.75.75 0 0 1-1.06 1.06l-3.22-3.22V16.5a.75.75 0 0 1-1.5 0V4.81L8.03 8.03a.75.75 0 0 1-1.06-1.06l4.5-4.5ZM3 15.75A.75.75 0 0 1 3.75 15h16.5a.75.75 0 0 1 0 1.5H3.75a.75.75 0 0 1-.75-.75Zm0 3A.75.75 0 0 1 3.75 18h16.5a.75.75 0 0 1 0 1.5H3.75a.75.75 0 0 1-.75-.75Z" clipRule="evenodd" />
    </svg>
);


export const PromptForm: React.FC<PromptFormProps> = ({
    prompt,
    setPrompt,
    numImages,
    setNumImages,
    isGenerating,
    isFetchingIdeas,
    isImprovingPrompt,
    onGenerate,
    onGetIdeas,
    onImprove,
    uploadedImage,
    onImageChange,
    onRemoveImage,
    selectedStyle,
    setSelectedStyle,
    aspectRatio,
    setAspectRatio,
}) => {
    const isBusy = isGenerating || isFetchingIdeas || isImprovingPrompt;
    return (
        <div className="bg-gray-800 p-6 rounded-xl border border-gray-700 shadow-lg space-y-4">
            <div>
                <label htmlFor="prompt" className="block text-sm font-medium text-gray-400">Seu Prompt Criativo</label>
                <textarea
                    id="prompt"
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="ex: Foto cinemática de um guaxinim astronauta explorando uma selva alienígena vibrante à noite"
                    className="mt-1 w-full h-32 p-3 bg-gray-900/50 border border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors placeholder-gray-500"
                    disabled={isBusy}
                />
                {uploadedImage && (
                    <p className="mt-2 text-xs text-gray-400">
                        Dica: Seja claro no seu pedido. Para edições, diga o que adicionar ou mudar (ex: "adicione um chapéu de pirata"). Para mudanças de estilo, descreva o estilo desejado (ex: "transforme em uma pintura a óleo").
                    </p>
                )}
            </div>
            
            <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Imagem Base (Opcional)</label>
                {uploadedImage ? (
                    <div className="relative group w-40 h-40">
                        <img src={uploadedImage} alt="Uploaded preview" className="w-full h-full object-cover rounded-lg border-2 border-gray-600"/>
                        <button 
                            onClick={onRemoveImage}
                            className="absolute top-1 right-1 bg-black/60 text-white rounded-full p-1 leading-none opacity-0 group-hover:opacity-100 transition-opacity"
                            aria-label="Remover imagem"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5"><path d="M6.28 5.22a.75.75 0 0 0-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 1 0 1.06 1.06L10 11.06l3.72 3.72a.75.75 0 1 0 1.06-1.06L11.06 10l3.72-3.72a.75.75 0 0 0-1.06-1.06L10 8.94 6.28 5.22Z" /></svg>
                        </button>
                    </div>
                ) : (
                    <div>
                        <input 
                            type="file" 
                            id="image-upload" 
                            className="hidden" 
                            onChange={onImageChange} 
                            accept="image/*"
                            disabled={isBusy}
                        />
                        <label 
                            htmlFor="image-upload" 
                            className="cursor-pointer flex items-center justify-center gap-2 w-full sm:w-auto px-4 py-2 border-2 border-dashed border-gray-600 rounded-lg text-gray-400 hover:bg-gray-700/50 hover:border-gray-500 transition-colors"
                        >
                           <UploadIcon className="h-5 w-5"/>
                           <span>Carregar Imagem</span>
                        </label>
                    </div>
                )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <StyleSelector selectedStyle={selectedStyle} onSelectStyle={setSelectedStyle} disabled={isBusy} />
                <AspectRatioSelector
                    selectedAspectRatio={aspectRatio}
                    onSelectAspectRatio={setAspectRatio}
                    disabled={isBusy}
                />
            </div>

            <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                    <label htmlFor="numImages" className="text-sm font-medium text-gray-400 whitespace-nowrap">Número de Imagens:</label>
                    <select
                        id="numImages"
                        value={numImages}
                        onChange={(e) => setNumImages(Number(e.target.value))}
                        className="bg-gray-700 border border-gray-600 rounded-md py-2 px-3 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        disabled={isBusy}
                    >
                        {[1, 2, 3, 4, 5, 6, 7, 8].map(n => <option key={n} value={n}>{n}</option>)}
                    </select>
                </div>
                <div className="flex w-full sm:w-auto items-center gap-3">
                    <button
                        onClick={onGetIdeas}
                        disabled={isBusy || !prompt}
                        className="flex-1 w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2 text-sm font-semibold text-white bg-gray-600 rounded-md hover:bg-gray-500 disabled:bg-gray-700 disabled:cursor-not-allowed disabled:opacity-50 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-gray-400"
                    >
                        <LightbulbIcon className="h-5 w-5"/>
                        Obter Ideias
                    </button>
                    <button
                        onClick={onImprove}
                        disabled={isBusy || !prompt}
                        className="flex-1 w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2 text-sm font-semibold text-white bg-purple-600 rounded-md hover:bg-purple-500 disabled:bg-purple-800 disabled:cursor-not-allowed disabled:opacity-70 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-purple-500"
                    >
                        <MagicWandIcon className="h-5 w-5"/>
                        Aprimorar
                    </button>
                    <button
                        onClick={onGenerate}
                        disabled={isBusy || !prompt}
                        className="flex-1 w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2 text-sm font-semibold text-white bg-indigo-600 rounded-md hover:bg-indigo-500 disabled:bg-indigo-800 disabled:cursor-not-allowed disabled:opacity-70 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-indigo-500"
                    >
                        <GenerateIcon className="h-5 w-5"/>
                        Gerar
                    </button>
                </div>
            </div>
        </div>
    );
};