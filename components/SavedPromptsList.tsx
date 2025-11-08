import React from 'react';
import type { SavedPrompt } from '../types';

interface SavedPromptsListProps {
    prompts: SavedPrompt[];
    onUsePrompt: (prompt: string) => void;
    onDeletePrompt: (id: string) => void;
}

const BookmarkIcon: React.FC<{className?: string}> = ({className}) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path fillRule="evenodd" d="M6 3a3 3 0 0 0-3 3v12a3 3 0 0 0 3 3h12a3 3 0 0 0 3-3V6a3 3 0 0 0-3-3H6Zm1.5 1.5a.75.75 0 0 0-.75.75V16.5a.75.75 0 0 0 1.085.67L12 15.089l4.165 2.083a.75.75 0 0 0 1.085-.67V5.25a.75.75 0 0 0-.75-.75H7.5Z" clipRule="evenodd" />
    </svg>
);


const TrashIcon: React.FC<{className?: string}> = ({className}) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path fillRule="evenodd" d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.816 1.387 2.816 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.347-9Zm5.48.058a.75.75 0 1 0-1.499-.058l-.347 9a.75.75 0 0 0 1.5.058l.347-9Z" clipRule="evenodd" />
    </svg>
);

export const SavedPromptsList: React.FC<SavedPromptsListProps> = ({ prompts, onUsePrompt, onDeletePrompt }) => {
    return (
        <div className="bg-gray-800 p-6 rounded-xl border border-gray-700 shadow-lg h-full">
            <h2 className="text-lg font-semibold text-gray-200 mb-4 flex items-center gap-2">
                <BookmarkIcon className="h-6 w-6 text-purple-400" />
                Prompts Salvos
            </h2>
            {prompts.length === 0 ? (
                <div className="text-center text-gray-500 py-10">
                    <p>Você ainda não salvou nenhum prompt.</p>
                </div>
            ) : (
                <ul className="space-y-3 max-h-[600px] overflow-y-auto pr-2">
                    {prompts.map((prompt) => (
                        <li key={prompt.id} className="group bg-gray-900/50 p-3 rounded-md border border-gray-700 hover:border-purple-500 transition-colors">
                            <div className="flex justify-between items-start gap-2">
                                <p className="text-sm text-gray-300 flex-1 break-words cursor-pointer" onClick={() => onUsePrompt(prompt.text)}>
                                    {prompt.text}
                                </p>
                                <button
                                    onClick={() => onDeletePrompt(prompt.id)}
                                    className="text-gray-500 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                                    aria-label="Excluir prompt"
                                >
                                    <TrashIcon className="h-5 w-5"/>
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};