import React from 'react';

const HistoryIcon: React.FC<{className?: string}> = ({className}) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM12 6a.75.75 0 0 1 .75.75v5.05l3.2-1.848a.75.75 0 0 1 .75 1.3l-4.5 2.6a.75.75 0 0 1-.75 0l-4.5-2.6a.75.75 0 1 1 .75-1.3l3.2 1.848V6.75A.75.75 0 0 1 12 6Z" clipRule="evenodd" />
    </svg>
);


const TrashIcon: React.FC<{className?: string}> = ({className}) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path fillRule="evenodd" d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.816 1.387 2.816 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.347-9Zm5.48.058a.75.75 0 1 0-1.499-.058l-.347 9a.75.75 0 0 0 1.5.058l.347-9Z" clipRule="evenodd" />
    </svg>
);

interface PromptHistoryProps {
    prompts: string[];
    onUsePrompt: (prompt: string) => void;
    onClearHistory: () => void;
}

export const PromptHistory: React.FC<PromptHistoryProps> = ({ prompts, onUsePrompt, onClearHistory }) => {
    return (
        <div className="bg-gray-800 p-6 rounded-xl border border-gray-700 shadow-lg h-full">
            <div className="flex justify-between items-center mb-4">
                 <h2 className="text-lg font-semibold text-gray-200 flex items-center gap-2">
                    <HistoryIcon className="h-6 w-6 text-purple-400" />
                    Histórico de Prompts
                </h2>
                {prompts.length > 0 && (
                     <button
                        onClick={onClearHistory}
                        className="flex items-center gap-1.5 px-3 py-1 text-xs font-semibold text-gray-300 bg-gray-700 rounded-md hover:bg-red-600 hover:text-white transition-colors"
                        aria-label="Limpar histórico"
                    >
                        <TrashIcon className="h-4 w-4"/>
                        Limpar
                    </button>
                )}
            </div>
           
            {prompts.length === 0 ? (
                <div className="text-center text-gray-500 py-10">
                    <p>Seu histórico de prompts aparecerá aqui.</p>
                    <p className="text-sm">Os prompts são adicionados depois que você clica em "Gerar".</p>
                </div>
            ) : (
                <ul className="space-y-3 max-h-[600px] overflow-y-auto pr-2">
                    {prompts.map((prompt, index) => (
                        <li key={`${prompt}-${index}`} className="group bg-gray-900/50 p-3 rounded-md border border-gray-700 hover:border-purple-500 transition-colors">
                            <p 
                                className="text-sm text-gray-300 flex-1 break-words cursor-pointer" 
                                onClick={() => onUsePrompt(prompt)}
                                title="Usar este prompt"
                            >
                                {prompt}
                            </p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};