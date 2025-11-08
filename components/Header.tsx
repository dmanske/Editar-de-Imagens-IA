import React from 'react';

const SparkleIcon: React.FC<{className?: string}> = ({className}) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path fillRule="evenodd" d="M9.315 7.584C12.195 3.883 16.695 1.5 21.75 1.5a.75.75 0 0 1 .75.75c0 5.056-2.383 9.555-6.084 12.436A6.75 6.75 0 0 1 9.75 22.5a.75.75 0 0 1-.75-.75v-7.19c0-.861.431-1.652 1.125-2.128a5.993 5.993 0 0 0-1.815-1.862Z" clipRule="evenodd" />
        <path d="M3 13.5a.75.75 0 0 1 .75-.75h4.5a.75.75 0 0 1 0 1.5h-4.5a.75.75 0 0 1-.75-.75Z" />
        <path d="M3.75 17.25a.75.75 0 0 1 .75-.75h2.25a.75.75 0 0 1 0 1.5H4.5a.75.75 0 0 1-.75-.75Z" />
        <path d="M6.75 21a.75.75 0 0 1 .75-.75h4.5a.75.75 0 0 1 0 1.5h-4.5a.75.75 0 0 1-.75-.75Z" />
        <path d="M9 4.5a.75.75 0 0 1 .75-.75h4.5a.75.75 0 0 1 0 1.5h-4.5A.75.75 0 0 1 9 4.5Z" />
        <path d="M9.75 8.25a.75.75 0 0 1 .75-.75h2.25a.75.75 0 0 1 0 1.5H10.5a.75.75 0 0 1-.75-.75Z" />
    </svg>
);


export const Header: React.FC = () => {
    return (
        <header className="bg-gray-800/50 backdrop-blur-sm border-b border-gray-700 sticky top-0 z-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-center sm:justify-start h-16">
                    <div className="flex items-center space-x-3">
                        <SparkleIcon className="h-8 w-8 text-indigo-400" />
                        <h1 className="text-xl sm:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-500">
                            Estúdio de Imagens com IA
                        </h1>
                    </div>
                </div>
            </div>
        </header>
    );
};