import React from 'react';

interface PromptIdeasProps {
    ideas: string[];
    onUseIdea: (idea: string) => void;
    isLoading: boolean;
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

const Loader: React.FC = () => (
    <div className="flex items-center justify-center p-4">
        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        <p className="text-gray-400">Preparando algumas ideias novas...</p>
    </div>
);

export const PromptIdeas: React.FC<PromptIdeasProps> = ({ ideas, onUseIdea, isLoading }) => {
    if (isLoading) {
        return (
            <div className="bg-gray-800/60 p-4 rounded-xl border border-gray-700">
                <Loader />
            </div>
        );
    }
    
    if (ideas.length === 0) {
        return null;
    }

    return (
        <div className="bg-gray-800/60 p-6 rounded-xl border border-gray-700">
            <h3 className="text-md font-semibold text-gray-300 mb-3 flex items-center gap-2">
                <LightbulbIcon className="h-5 w-5 text-yellow-300"/>
                Sugestões de Prompt
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {ideas.map((idea, index) => (
                    <button
                        key={index}
                        onClick={() => onUseIdea(idea)}
                        className="text-left p-3 bg-gray-700/50 rounded-lg border border-gray-600 hover:bg-indigo-600/30 hover:border-indigo-500 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                        <p className="text-sm text-gray-300">{idea}</p>
                    </button>
                ))}
            </div>
        </div>
    );
};