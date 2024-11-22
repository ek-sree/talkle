import React, { useState, useEffect } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import status from '../../constant/Userstatus.json';

const StatusModal = ({ onClose, isOpen }) => {
    const [currentUserIndex, setCurrentUserIndex] = useState(0);
    const [currentStatusIndex, setCurrentStatusIndex] = useState(0);
    const [progressPercentage, setProgressPercentage] = useState(0);

    useEffect(() => {
        if (!isOpen || !status.length) return;

        const timer = setInterval(() => {
            setProgressPercentage(prev => {
                if (prev >= 100) {
                    const currentUser = status[currentUserIndex];

                    // Move to next status or next user
                    const nextStatusIndex = (currentStatusIndex + 1) % currentUser.statuses.length;

                    if (nextStatusIndex === 0) {
                        // If we've cycled through all statuses, move to next user
                        const nextUserIndex = (currentUserIndex + 1) % status.length;
                        setCurrentUserIndex(nextUserIndex);
                    }

                    setCurrentStatusIndex(nextStatusIndex);
                    return 0;
                }
                return prev + 2; // Increase speed of progress
            });
        }, 100);

        return () => clearInterval(timer);
    }, [currentUserIndex, currentStatusIndex, isOpen]);

    if (!isOpen || !status.length) return null;

    const currentUser = status[currentUserIndex];
    const currentStatus = currentUser.statuses[currentStatusIndex];

    const handlePrevious = () => {
        const prevUserIndex = currentUserIndex === 0 
            ? status.length - 1 
            : currentUserIndex - 1;
        setCurrentUserIndex(prevUserIndex);
        setCurrentStatusIndex(0);
        setProgressPercentage(0);
    };

    const handleNext = () => {
        const nextUserIndex = (currentUserIndex + 1) % status.length;
        setCurrentUserIndex(nextUserIndex);
        setCurrentStatusIndex(0);
        setProgressPercentage(0);
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
            <div className="relative w-96 h-[600px] bg-white rounded-xl overflow-hidden">
                {/* Close Button */}
                <button 
                    onClick={onClose} 
                    className="absolute top-4 right-4 z-10 bg-black/50 text-white rounded-full p-2 hover:bg-black/70"
                >
                    <X size={24} />
                </button>

                {/* Navigation Arrows */}
                <button 
                    onClick={handlePrevious} 
                    className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-black/50 text-white rounded-full p-2 hover:bg-black/70"
                >
                    <ChevronLeft size={24} />
                </button>
                <button 
                    onClick={handleNext} 
                    className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-black/50 text-white rounded-full p-2 hover:bg-black/70"
                >
                    <ChevronRight size={24} />
                </button>

                {/* Progress Bar */}
                <div className="absolute top-2 left-0 right-0 flex space-x-1 px-2">
                    {currentUser.statuses.map((_, index) => (
                        <div 
                            key={index} 
                            className="flex-1 h-1 bg-gray-300 relative"
                        >
                            {index === currentStatusIndex && (
                                <div 
                                    className="absolute top-0 left-0 h-1 bg-blue-500" 
                                    style={{ 
                                        width: `${progressPercentage}%`,
                                        transition: 'width 0.1s linear'
                                    }}
                                />
                            )}
                            {index < currentStatusIndex && (
                                <div className="absolute top-0 left-0 h-1 w-full bg-blue-500" />
                            )}
                        </div>
                    ))}
                </div>

                {/* Status Image */}
                <img 
                    src={currentStatus.imageUrl} 
                    alt="Status" 
                    className="w-full h-full object-cover"
                />

                {/* User Info */}
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-black/50 text-white">
                    <div className="flex justify-between">
                        <span>{currentUser.name}</span>
                        <span>{new Date(currentStatus.timestamp).toLocaleTimeString()}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StatusModal;