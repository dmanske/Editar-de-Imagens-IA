import React, { useState, useCallback } from 'react';
import { generateImages, getPromptIdeas, improvePrompt } from './services/geminiService';
import type { SavedPrompt } from './types';
import { PromptForm } from './components/PromptForm';
import { ImageGrid } from './components/ImageGrid';
import { SavedPromptsList } from './components/SavedPromptsList';
import { PromptIdeas } from './components/PromptIdeas';
import { Header } from './components/Header';
import { ErrorDisplay } from './components/ErrorDisplay';
import { PromptHistory } from './components/PromptHistory';
import { ImageModal } from './components/ImageModal';

const App: React.FC = () => {
    const [prompt, setPrompt] = useState<string>('');
    const [lastGeneratedPrompt, setLastGeneratedPrompt] = useState<string>('');
    const [numImages, setNumImages] = useState<number>(4);
    const [generatedImages, setGeneratedImages] = useState<string[]>([]);
    const [isGenerating, setIsGenerating] = useState<boolean>(false);
    const [isFetchingIdeas, setIsFetchingIdeas] = useState<boolean>(false);
    const [isImprovingPrompt, setIsImprovingPrompt] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [savedPrompts, setSavedPrompts] = useState<SavedPrompt[]>([]);
    const [promptIdeas, setPromptIdeas] = useState<string[]>([]);
    const [uploadedImage, setUploadedImage] = useState<string | null>(null);
    const [selectedStyle, setSelectedStyle] = useState<string>('');
    const [aspectRatio, setAspectRatio] = useState<string>('1:1');
    const [promptHistory, setPromptHistory] = useState<string[]>([]);
    const [activeSidebarTab, setActiveSidebarTab] = useState<'saved' | 'history'>('saved');
    const [selectedImage, setSelectedImage] = useState<number | null>(null);
    const [selectedForDownload, setSelectedForDownload] = useState<number[]>([]);


    const handleGenerateImages = useCallback(async () => {
        if (!prompt || isGenerating) return;

        setPromptHistory(prev => {
            if (prompt && prev[0] !== prompt) {
                // Keep history to a max of 100 items
                return [prompt, ...prev.slice(0, 99)];
            }
            return prev;
        });

        setIsGenerating(true);
        setError(null);
        setGeneratedImages([]);
        setPromptIdeas([]);
        setSelectedForDownload([]); // Reset selection

        try {
            const images = await generateImages(prompt, numImages, uploadedImage, selectedStyle, aspectRatio);
            setGeneratedImages(images);
            const fullPrompt = selectedStyle ? `${prompt}, no estilo ${selectedStyle}` : prompt;
            setLastGeneratedPrompt(fullPrompt);
        } catch (e) {
            console.error(e);
            setError(e instanceof Error ? e.message : 'Ocorreu um erro desconhecido ao gerar as imagens.');
        } finally {
            setIsGenerating(false);
        }
    }, [prompt, numImages, isGenerating, uploadedImage, selectedStyle, aspectRatio]);

    const handleGetPromptIdeas = useCallback(async () => {
        if (!prompt || isFetchingIdeas) return;
        setIsFetchingIdeas(true);
        setError(null);
        setPromptIdeas([]);
        try {
            const ideas = await getPromptIdeas(prompt, uploadedImage);
            setPromptIdeas(ideas);
        } catch (e) {
            console.error(e);
            setError(e instanceof Error ? e.message : 'Ocorreu um erro desconhecido ao buscar ideias.');
        } finally {
            setIsFetchingIdeas(false);
        }
    }, [prompt, isFetchingIdeas, uploadedImage]);

    const handleImprovePrompt = useCallback(async () => {
        if (!prompt || isImprovingPrompt) return;
        setIsImprovingPrompt(true);
        setError(null);
        try {
            const improved = await improvePrompt(prompt, uploadedImage);
            setPrompt(improved);
        } catch (e) {
            console.error(e);
            setError(e instanceof Error ? e.message : 'Ocorreu um erro desconhecido ao aprimorar o prompt.');
        } finally {
            setIsImprovingPrompt(false);
        }
    }, [prompt, isImprovingPrompt, uploadedImage]);

    const handleSavePrompt = useCallback(() => {
        if (lastGeneratedPrompt && !savedPrompts.some(p => p.text === lastGeneratedPrompt)) {
            const newPrompt: SavedPrompt = {
                id: Date.now().toString(),
                text: lastGeneratedPrompt,
            };
            setSavedPrompts(prev => [newPrompt, ...prev]);
        }
    }, [lastGeneratedPrompt, savedPrompts]);
    
    const handleUsePrompt = (promptText: string) => {
        setPrompt(promptText);
        setPromptIdeas([]);
        setGeneratedImages([]);
        setUploadedImage(null);
        setError(null);
        setSelectedForDownload([]);
    };

    const handleDeletePrompt = (id: string) => {
        setSavedPrompts(prev => prev.filter(p => p.id !== id));
    };

    const handleClearHistory = () => {
        setPromptHistory([]);
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setUploadedImage(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleRemoveImage = () => {
        setUploadedImage(null);
    };

    const handleNextImage = useCallback(() => {
        if (selectedImage !== null) {
            setSelectedImage((prevIndex) => 
                prevIndex === null ? null : (prevIndex + 1) % generatedImages.length
            );
        }
    }, [selectedImage, generatedImages.length]);

    const handlePreviousImage = useCallback(() => {
        if (selectedImage !== null) {
            setSelectedImage((prevIndex) =>
                prevIndex === null ? null : (prevIndex - 1 + generatedImages.length) % generatedImages.length
            );
        }
    }, [selectedImage, generatedImages.length]);

    const handleToggleSelection = (index: number) => {
        setSelectedForDownload(prev => {
            if (prev.includes(index)) {
                return prev.filter(i => i !== index);
            }
            return [...prev, index];
        });
    };
    
    const handleSelectAll = () => {
        if (selectedForDownload.length === generatedImages.length) {
            setSelectedForDownload([]);
        } else {
            setSelectedForDownload(generatedImages.map((_, i) => i));
        }
    };

    return (
        <div className="min-h-screen bg-gray-900 text-gray-200 font-sans">
            <Header />
            <main className="p-4 sm:p-6 lg:p-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
                    <div className="lg:col-span-2 space-y-6">
                        <PromptForm
                            prompt={prompt}
                            setPrompt={setPrompt}
                            numImages={numImages}
                            setNumImages={setNumImages}
                            isGenerating={isGenerating}
                            isFetchingIdeas={isFetchingIdeas}
                            isImprovingPrompt={isImprovingPrompt}
                            onGenerate={handleGenerateImages}
                            onGetIdeas={handleGetPromptIdeas}
                            onImprove={handleImprovePrompt}
                            uploadedImage={uploadedImage}
                            onImageChange={handleImageChange}
                            onRemoveImage={handleRemoveImage}
                            selectedStyle={selectedStyle}
                            setSelectedStyle={setSelectedStyle}
                            aspectRatio={aspectRatio}
                            setAspectRatio={setAspectRatio}
                        />
                        <ErrorDisplay error={error} />
                        <PromptIdeas ideas={promptIdeas} onUseIdea={handleUsePrompt} isLoading={isFetchingIdeas} />
                        <ImageGrid 
                            images={generatedImages} 
                            isLoading={isGenerating} 
                            onSavePrompt={handleSavePrompt}
                            lastGeneratedPrompt={lastGeneratedPrompt}
                            isPromptSaved={savedPrompts.some(p => p.text === lastGeneratedPrompt)}
                            onImageClick={setSelectedImage}
                            selectedIndices={selectedForDownload}
                            onToggleSelection={handleToggleSelection}
                            onSelectAll={handleSelectAll}
                        />
                    </div>
                    <div className="lg:col-span-1 space-y-4">
                         <div className="bg-gray-800 p-2 rounded-lg border border-gray-700 flex gap-2">
                            <button
                                onClick={() => setActiveSidebarTab('saved')}
                                className={`w-full py-2 text-sm font-semibold rounded-md transition-colors ${
                                    activeSidebarTab === 'saved'
                                        ? 'text-white bg-indigo-600'
                                        : 'text-gray-300 bg-gray-700 hover:bg-gray-600'
                                }`}
                            >
                                Salvos
                            </button>
                            <button
                                onClick={() => setActiveSidebarTab('history')}
                                className={`w-full py-2 text-sm font-semibold rounded-md transition-colors ${
                                    activeSidebarTab === 'history'
                                        ? 'text-white bg-indigo-600'
                                        : 'text-gray-300 bg-gray-700 hover:bg-gray-600'
                                }`}
                            >
                                Histórico
                            </button>
                        </div>

                        {activeSidebarTab === 'saved' ? (
                            <SavedPromptsList
                                prompts={savedPrompts}
                                onUsePrompt={handleUsePrompt}
                                onDeletePrompt={handleDeletePrompt}
                            />
                        ) : (
                            <PromptHistory
                                prompts={promptHistory}
                                onUsePrompt={handleUsePrompt}
                                onClearHistory={handleClearHistory}
                            />
                        )}
                    </div>
                </div>
            </main>
            <ImageModal 
                src={selectedImage !== null ? generatedImages[selectedImage] : null} 
                imageIndex={selectedImage}
                onClose={() => setSelectedImage(null)}
                onNext={handleNextImage}
                onPrevious={handlePreviousImage}
                showNavigation={generatedImages.length > 1}
            />
        </div>
    );
};

export default App;