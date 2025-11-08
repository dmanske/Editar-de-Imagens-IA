import React from 'react';

interface ErrorDisplayProps {
    error: string | null;
}

const ErrorIcon: React.FC<{className?: string}> = ({className}) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm-1.72 6.97a.75.75 0 0 1 1.06 0L12 9.94l.72-.72a.75.75 0 1 1 1.06 1.06L13.06 12l.72.72a.75.75 0 1 1-1.06 1.06L12 13.06l-.72.72a.75.75 0 0 1-1.06-1.06l.72-.72-.72-.72a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
    </svg>
);


export const ErrorDisplay: React.FC<ErrorDisplayProps> = ({ error }) => {
    if (!error) {
        return null;
    }

    return (
        <div className="bg-red-900/40 border border-red-700 text-red-300 px-4 py-3 rounded-lg relative" role="alert">
            <div className="flex items-center">
                <ErrorIcon className="h-5 w-5 mr-3"/>
                <div>
                    <strong className="font-bold">Erro: </strong>
                    <span className="block sm:inline">{error}</span>
                </div>
            </div>
        </div>
    );
};