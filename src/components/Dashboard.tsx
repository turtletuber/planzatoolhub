import React, { useState } from 'react';

// Navbar Component (No changes needed here)
const Navbar: React.FC<{ onLessonSelect: (url: string) => void }> = ({ onLessonSelect }) => {
    return (
        <nav className="bg-gray-900 text-white p-4 relative">
            <div className="container mx-auto flex justify-between items-center">
                <h1 className="text-xl font-bold">Dashboard</h1>
            </div>
        </nav>
    );
};

// Floating Table of Contents Component (on the left)
const TableOfContents: React.FC<{ onLessonSelect: (url: string) => void }> = ({ onLessonSelect }) => {
    const [isTocExpanded, setIsTocExpanded] = useState(false); // Track whether TOC is expanded

    const lessons = [
        { title: 'Introduction to React', url: 'https://reactjs.org/' },
        { title: 'Arcade Game and Machine: Engineering and Design', url: 'https://planza.app/public-gallery/arcade-machine-game-design' }, // New lesson
        { title: 'JavaScript Basics', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide' },
    ];

    return (
        <div
            className={`fixed top-0 left-0 h-full bg-gray-100 shadow-lg transition-all duration-300 z-20 ${
                isTocExpanded ? 'w-64' : 'w-16'
            }`}
            onMouseEnter={() => setIsTocExpanded(true)} // Expand on hover
            onMouseLeave={() => setIsTocExpanded(false)} // Collapse when mouse leaves
        >
            <div className="h-full flex flex-col p-2">
                {/* Icon for TOC when collapsed */}
                <div className={`text-3xl ${isTocExpanded ? 'hidden' : 'block'} text-center mt-4`}>
                    📚
                </div>

                {/* TOC Header and Items (hidden when collapsed) */}
                <h2
                    className={`font-semibold text-lg text-gray-800 mb-2 transition-opacity duration-300 ${
                        isTocExpanded ? 'opacity-100' : 'opacity-0'
                    }`}
                >
                    Table of Contents
                </h2>
                {lessons.map((lesson, index) => (
                    <button
                        key={index}
                        onClick={() => onLessonSelect(lesson.url)}
                        className={`text-left text-gray-700 hover:bg-gray-200 p-2 mb-1 rounded transition-opacity duration-300 ${
                            isTocExpanded ? 'opacity-100' : 'opacity-0'
                        }`}
                    >
                        {lesson.title}
                    </button>
                ))}
            </div>
        </div>
    );
};

// Floating Tools Component (on the right)
const ToolsPanel: React.FC = () => {
    const [isToolsExpanded, setIsToolsExpanded] = useState(false); // Track whether Tools is expanded

    const tools = [
        { title: 'Submit Creations', icon: '📤', link: 'https://form.jotform.com/233086631442049' }, // New tool opens in a new tab
        { title: 'Code Editor', icon: '💻' },
        { title: 'Debugger', icon: '🐞' },
        { title: 'Terminal', icon: '🖥️' },
        { title: 'Version Control', icon: '🔀' },
    ];

    return (
        <div
            className={`fixed top-0 right-0 h-full bg-gray-100 shadow-lg transition-all duration-300 z-20 ${
                isToolsExpanded ? 'w-64' : 'w-16'
            }`}
            onMouseEnter={() => setIsToolsExpanded(true)} // Expand on hover
            onMouseLeave={() => setIsToolsExpanded(false)} // Collapse when mouse leaves
        >
            <div className="h-full flex flex-col p-2">
                {/* Icon for Tools when collapsed */}
                <div className={`text-3xl ${isToolsExpanded ? 'hidden' : 'block'} text-center mt-4`}>
                    🛠️
                </div>

                {/* Tools Header and Items (hidden when collapsed) */}
                <h2
                    className={`font-semibold text-lg text-gray-800 mb-2 transition-opacity duration-300 ${
                        isToolsExpanded ? 'opacity-100' : 'opacity-0'
                    }`}
                >
                    Tools
                </h2>
                {tools.map((tool, index) => (
                    <div
                        key={index}
                        className={`text-left text-gray-700 hover:bg-gray-200 p-2 mb-1 rounded transition-opacity duration-300 ${
                            isToolsExpanded ? 'opacity-100' : 'opacity-0'
                        }`}
                    >
                        <span className="mr-2">{tool.icon}</span>
                        <a
                            href={tool.link}
                            target={tool.link ? '_blank' : '_self'} // Open in new tab if the link exists (for Submit Creations)
                            rel="noopener noreferrer"
                        >
                            {tool.title}
                        </a>
                    </div>
                ))}
            </div>
        </div>
    );
};

// Main Dashboard Component
const Dashboard: React.FC = () => {
    // State to track which lesson is selected
    const [selectedLesson, setSelectedLesson] = useState<string | null>(null);

    return (
        <div className="min-h-screen bg-gray-100 relative">
            <Navbar onLessonSelect={(url) => setSelectedLesson(url)} />
            <TableOfContents onLessonSelect={(url) => setSelectedLesson(url)} />
            <ToolsPanel />

            {/* Full-Body Webpage Viewer */}
            {selectedLesson ? (
                <iframe
                    src={selectedLesson}
                    title="Lesson Content"
                    className="absolute top-16 left-16 w-[calc(100%-128px)] h-[calc(100vh-64px)]"
                    frameBorder="0"
                />
            ) : (
                <div className="flex items-center justify-center h-[calc(100vh-64px)] ml-16">
                    <p className="text-lg">Select a lesson from the Table of Contents to view the content.</p>
                </div>
            )}
        </div>
    );
};

export default Dashboard;
