import React, { useEffect, useState } from 'react';

interface ImageModalProps {
    src: string | null;
    imageIndex: number | null;
    onClose: () => void;
    onNext: () => void;
    onPrevious: () => void;
    showNavigation: boolean;
}

const CloseIcon: React.FC<{className?: string}> = ({className}) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className={className}>
      <path d="M6.28 5.22a.75.75 0 0 0-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 1 0 1.06 1.06L10 11.06l3.72 3.72a.75.75 0 1 0 1.06-1.06L11.06 10l3.72-3.72a.75.75 0 0 0-1.06-1.06L10 8.94 6.28 5.22Z" />
    </svg>
);

const DownloadIcon: React.FC<{className?: string}> = ({className}) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className={className}>
      <path d="M10.75 2.75a.75.75 0 0 0-1.5 0v8.614L6.295 8.235a.75.75 0 1 0-1.09 1.03l4.25 4.5a.75.75 0 0 0 1.09 0l4.25-4.5a.75.75 0 0 0-1.09-1.03l-2.955 3.129V2.75Z" />
      <path d="M3.5 12.75a.75.75 0 0 0-1.5 0v2.5A2.75 2.75 0 0 0 4.75 18h10.5A2.75 2.75 0 0 0 18 15.25v-2.5a.75.75 0 0 0-1.5 0v2.5c0 .69-.56 1.25-1.25 1.25H4.75c-.69 0-1.25-.56-1.25-1.25v-2.5Z" />
    </svg>
);


const ChevronLeftIcon: React.FC<{className?: string}> = ({className}) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path fillRule="evenodd" d="M7.72 12.53a.75.75 0 0 1 0-1.06l7.5-7.5a.75.75 0 1 1 1.06 1.06L9.31 12l6.97 6.97a.75.75 0 1 1-1.06 1.06l-7.5-7.5Z" clipRule="evenodd" />
    </svg>
);

const ChevronRightIcon: React.FC<{className?: string}> = ({className}) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path fillRule="evenodd" d="M16.28 11.47a.75.75 0 0 1 0 1.06l-7.5 7.5a.75.75 0 0 1-1.06-1.06L14.69 12 7.72 5.03a.75.75 0 0 1 1.06-1.06l7.5 7.5Z" clipRule="evenodd" />
    </svg>
);

export const ImageModal: React.FC<ImageModalProps> = ({ src, imageIndex, onClose, onNext, onPrevious, showNavigation }) => {
    const [show, setShow] = useState(false);

    useEffect(() => {
        if (src) {
            const timer = setTimeout(() => setShow(true), 10);
            return () => clearTimeout(timer);
        }
    }, [src]);

    const handleClose = () => {
        setShow(false);
        setTimeout(onClose, 300); 
    };

    const handleDownload = () => {
        if (!src || imageIndex === null) return;
        const link = document.createElement('a');
        link.href = src;
        const mimeType = src.match(/data:(image\/\w+);/)?.[1] || 'image/jpeg';
        const extension = mimeType.split('/')[1] || 'jpg';
        link.download = `generated-image-${imageIndex + 1}.${extension}`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (!src) return;
            if (e.key === 'Escape') {
                handleClose();
            }
            if (showNavigation) {
                if (e.key === 'ArrowRight') {
                    onNext();
                } else if (e.key === 'ArrowLeft') {
                    onPrevious();
                }
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [src, showNavigation, onNext, onPrevious, onClose]);

    if (!src) {
        return null;
    }

    return (
        <div 
            className={`fixed inset-0 flex items-center justify-center z-50 p-4 transition-opacity duration-300 ease-in-out ${show ? 'opacity-100' : 'opacity-0'}`}
            onClick={handleClose}
            role="dialog"
            aria-modal="true"
        >
            <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />
            <div 
                className={`relative w-full h-full flex items-center justify-center transition-transform duration-300 ease-in-out ${show ? 'scale-100' : 'scale-95'}`}
                onClick={e => e.stopPropagation()} 
            >
                {showNavigation && (
                    <button
                        onClick={onPrevious}
                        className="absolute left-0 top-1/2 -translate-y-1/2 z-10 p-2 bg-black/40 text-white rounded-full hover:bg-black/70 transition-colors focus:outline-none focus:ring-2 focus:ring-white"
                        aria-label="Imagem anterior"
                    >
                        <ChevronLeftIcon className="h-8 w-8" />
                    </button>
                )}

                <div className="relative">
                    <img src={src} alt="Visualização ampliada" className="block max-w-full max-h-[calc(100vh-4rem)] object-contain rounded-lg shadow-2xl" />
                    
                    <div className="absolute top-0 right-0 m-2 flex items-center gap-2">
                         <button
                            onClick={handleDownload}
                            className="text-white bg-black/50 rounded-full p-2 hover:bg-indigo-600 transition-colors"
                            aria-label="Baixar imagem"
                        >
                            <DownloadIcon className="h-6 w-6" />
                        </button>
                        <button
                            onClick={handleClose}
                            className="text-white bg-black/50 rounded-full p-2 hover:bg-red-600 transition-colors"
                            aria-label="Fechar visualização"
                        >
                            <CloseIcon className="h-6 w-6" />
                        </button>
                    </div>
                </div>

                {showNavigation && (
                     <button
                        onClick={onNext}
                        className="absolute right-0 top-1/2 -translate-y-1/2 z-10 p-2 bg-black/40 text-white rounded-full hover:bg-black/70 transition-colors focus:outline-none focus:ring-2 focus:ring-white"
                        aria-label="Próxima imagem"
                    >
                        <ChevronRightIcon className="h-8 w-8" />
                    </button>
                )}
            </div>
        </div>
    );
};