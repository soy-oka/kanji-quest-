import React, { useState, useEffect, useRef } from 'react';

// --- Data: N5 Kanji Modules ---
const MODULES = [
    {
        id: 1,
        title: "N5 Basics: Nature & People",
        kanji: [
            { char: "日", on: "にち", kun: "ひ", meaning: "Day / Sun", description: "The sun radical. Represents the sun or a day." },
            { char: "木", on: "もく", kun: "き", meaning: "Tree", description: "Looks like a tree with branches and roots." },
            { char: "人", on: "じん", kun: "ひと", meaning: "Person", description: "A person walking, viewed from the side." },
            { char: "水", on: "すい", kun: "みず", meaning: "Water", description: "Ripples of water flowing in a stream." },
            { char: "火", on: "か", kun: "ひ", meaning: "Fire", description: "Flames reaching upwards." },
            { char: "山", on: "さん", kun: "やま", meaning: "Mountain", description: "Three peaks of a mountain range." },
            { char: "川", on: "せん", kun: "かわ", meaning: "River", description: "Lines representing the flow of a river." },
            { char: "田", on: "でん", kun: "た", meaning: "Rice Field", description: "A field divided into four sections for irrigation." },
            { char: "口", on: "こう", kun: "くち", meaning: "Mouth", description: "An open mouth." },
            { char: "目", on: "もく", kun: "め", meaning: "Eye", description: "An eye with the pupil in the center." }
        ]
    },
    {
        id: 2,
        title: "N5 Basics: Numbers 1-10",
        kanji: [
            { char: "一", on: "いち", kun: "ひと", meaning: "One", description: "One horizontal line." },
            { char: "二", on: "に", kun: "ふた", meaning: "Two", description: "Two horizontal lines." },
            { char: "三", on: "さん", kun: "み", meaning: "Three", description: "Three horizontal lines." },
            { char: "四", on: "し", kun: "よん", meaning: "Four", description: "A box with legs inside." },
            { char: "五", on: "ご", kun: "いつ", meaning: "Five", description: "Number 5." },
            { char: "六", on: "ろく", kun: "む", meaning: "Six", description: "A lid over legs." },
            { char: "七", on: "しち", kun: "なな", meaning: "Seven", description: "Number 7, looks like an upside down 7 with a slash." },
            { char: "八", on: "はち", kun: "や", meaning: "Eight", description: "Two lines parting ways." },
            { char: "九", on: "きゅう", kun: "ここの", meaning: "Nine", description: "Number 9." },
            { char: "十", on: "じゅう", kun: "とお", meaning: "Ten", description: "A cross shape." }
        ]
    },
    {
        id: 3,
        title: "N5 Basics: Directions & Concepts",
        kanji: [
            { char: "上", on: "じょう", kun: "うえ", meaning: "Up / Above", description: "A line indicating a position above the ground." },
            { char: "下", on: "か", kun: "した", meaning: "Down / Below", description: "A line indicating a position below the ground." },
            { char: "左", on: "さ", kun: "ひだり", meaning: "Left", description: "A hand holding a tool (work)." },
            { char: "右", on: "う", kun: "みぎ", meaning: "Right", description: "A hand holding a mouth (eating)." },
            { char: "中", on: "ちゅう", kun: "なか", meaning: "Middle / Inside", description: "A line cutting through the center of a rectangle." },
            { char: "大", on: "だい", kun: "おお", meaning: "Big", description: "A person stretching their arms out wide." },
            { char: "小", on: "しょう", kun: "ちい", meaning: "Small", description: "Something small or split." },
            { char: "本", on: "ほん", kun: "もと", meaning: "Book / Origin", description: "A tree with a mark at the root." },
            { char: "円", on: "えん", kun: "まる", meaning: "Yen / Circle", description: "A round object or currency." },
            { char: "年", on: "ねん", kun: "とし", meaning: "Year", description: "Harvest of rice." }
        ]
    },
    {
        id: 4,
        title: "N5 Basics: Time & Space",
        kanji: [
            { char: "時", on: "じ", kun: "とき", meaning: "Time / Hour", description: "Sun + Temple/Government office (standard)." },
            { char: "分", on: "ふん", kun: "わ", meaning: "Minute / Part", description: "To split/divide something with a knife." },
            { char: "半", on: "はん", kun: "なか", meaning: "Half", description: "Three lines divided down the middle." },
            { char: "今", on: "こん", kun: "いま", meaning: "Now", description: "A roof with a clock pendulum (conceptually)." },
            { char: "先", on: "せん", kun: "さき", meaning: "Before / Ahead", description: "A person moving ahead of others." },
            { char: "間", on: "かん", kun: "あいだ", meaning: "Interval / Between", description: "Sun shining through the gates." },
            { char: "午", on: "ご", kun: "うま", meaning: "Noon", description: "Derived from the pestle radical." },
            { char: "前", on: "ぜん", kun: "まえ", meaning: "Before / Front", description: "To cut hair/trim before a ceremony." },
            { char: "後", on: "ご", kun: "あと", meaning: "After / Behind", description: "Moving slowly on a road." },
            { char: "何", on: "か", kun: "なに", meaning: "What", description: "A person carrying a burden, asking 'what is it?'" }
        ]
    },
    {
        id: 5,
        title: "N5 Basics: Actions & Adjectives",
        kanji: [
            { char: "行", on: "こう", kun: "い", meaning: "Go", description: "An intersection of roads." },
            { char: "来", on: "らい", kun: "く", meaning: "Come", description: "A wheat plant (ancient meaning related to coming)." },
            { char: "食", on: "しょく", kun: "た", meaning: "Eat", description: "A mouth under a roof collecting food." },
            { char: "飲", on: "いん", kun: "の", meaning: "Drink", description: "Food + Yawning (mouth open)." },
            { char: "見", on: "けん", kun: "み", meaning: "See", description: "An eye on top of legs." },
            { char: "聞", on: "ぶん", kun: "き", meaning: "Hear", description: "An ear inside a gate." },
            { char: "高", on: "こう", kun: "たか", meaning: "Tall / Expensive", description: "A tall tower or building." },
            { char: "安", on: "あん", kun: "やす", meaning: "Cheap / Safe", description: "A woman under a roof (peaceful)." },
            { char: "新", on: "しん", kun: "あたら", meaning: "New", description: "Standing up a tree with an axe (freshly cut)." },
            { char: "古", on: "こ", kun: "ふる", meaning: "Old", description: "Ten mouths (stories passed down generations)." }
        ]
    }
];

// --- Styles ---
const styles = `
    @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;700&family=Fredoka:wght@400;600&display=swap');

    .font-fredoka { font-family: 'Fredoka', sans-serif; }
    .font-kanji { font-family: 'Noto Sans JP', sans-serif; }
    
    .stroke-order-svg {
        width: 100%;
        height: 100%;
    }
    .stroke-order-svg path {
        fill: none;
        stroke: #334155;
        stroke-width: 3;
        stroke-linecap: round;
        stroke-linejoin: round;
    }
    .stroke-order-svg text {
        font-size: 8px;
        fill: #94a3b8;
        font-family: sans-serif;
    }
    
    .pop-in { animation: popIn 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards; }
    @keyframes popIn { from { opacity: 0; transform: scale(0.9); } to { opacity: 1; transform: scale(1); } }
`;

// --- Component: Stroke Order Viewer (KanjiVG) ---
const StrokeOrderViewer = ({ char }) => {
    const [svgContent, setSvgContent] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchKanji = async () => {
            setLoading(true);
            try {
                const hex = char.codePointAt(0).toString(16).padStart(5, '0');
                const response = await fetch(`https://raw.githubusercontent.com/KanjiVG/kanjivg/master/kanji/${hex}.svg`);
                if (response.ok) {
                    const text = await response.text();
                    setSvgContent(text);
                } else {
                    setSvgContent(null);
                }
            } catch (e) {
                console.error("Failed to load stroke order", e);
                setSvgContent(null);
            } finally {
                setLoading(false);
            }
        };
        fetchKanji();
    }, [char]);

    if (loading) return <div className="w-40 h-40 flex items-center justify-center text-slate-400">Loading strokes...</div>;
    if (!svgContent) return <div className="font-kanji text-9xl text-slate-800">{char}</div>;

    return (
        <div
            className="w-56 h-56 border-4 border-slate-100 rounded-3xl bg-white p-4 shadow-inner stroke-order-svg"
            dangerouslySetInnerHTML={{ __html: svgContent }}
        />
    );
};

// --- Main Application Component ---
export default function App() {
    const [activeModule, setActiveModule] = useState(MODULES[0]);
    const [phase, setPhase] = useState('menu'); // 'menu', 'study', 'test', 'summary'
    const [currentIndex, setCurrentIndex] = useState(0);
    const [revealAnswer, setRevealAnswer] = useState(false);
    const [score, setScore] = useState(0);
    const [results, setResults] = useState([]);
    const [testPromptType, setTestPromptType] = useState('meaning'); // 'meaning' or 'reading'

    // --- Game Logic ---

    const startStudy = () => {
        setPhase('study');
        setCurrentIndex(0);
        setRevealAnswer(false);
    };

    const startTest = () => {
        setPhase('test');
        setCurrentIndex(0);
        setScore(0);
        setResults([]);
        setRevealAnswer(false);
    };

    const prevCard = () => {
        if (currentIndex > 0) {
            setCurrentIndex(c => c - 1);
            setRevealAnswer(false);
        }
    };

    const nextCard = () => {
        if (currentIndex < activeModule.kanji.length - 1) {
            setCurrentIndex(c => c + 1);
            setRevealAnswer(false);
        } else {
            if (phase === 'study') {
                startTest();
            } else {
                setPhase('summary');
            }
        }
    };

    const handleSelfGrade = (correct) => {
        const currentKanji = activeModule.kanji[currentIndex];
        setResults(prev => [...prev, { char: currentKanji.char, correct }]);
        if (correct) setScore(s => s + 1);
        nextCard();
    };

    const exitToMenu = () => {
        setPhase('menu');
        setCurrentIndex(0);
        setResults([]);
        setScore(0);
    };

    const currentItem = activeModule.kanji[currentIndex];
    const progress = ((currentIndex) / activeModule.kanji.length) * 100;

    // --- Render Helpers ---

    const MenuScreen = () => (
        <div className="flex-1 flex flex-col items-center justify-center p-6 space-y-8 pop-in">
            <div className="text-center space-y-2">
                <h1 className="text-4xl font-bold text-slate-800">Kanji Quest</h1>
                <p className="text-slate-500">Pen & Paper Mastery</p>
            </div>

            <div className="w-full max-w-sm flex flex-col gap-4 h-[400px] overflow-y-auto pr-2">
                {MODULES.map(mod => (
                    <button
                        key={mod.id}
                        onClick={() => setActiveModule(mod)}
                        className={`p-6 rounded-2xl border-2 text-left transition-all flex-shrink-0 ${activeModule.id === mod.id ? 'border-indigo-500 bg-indigo-50 shadow-indigo-100 shadow-lg' : 'border-slate-200 bg-white hover:border-indigo-200'}`}
                    >
                        <div className="flex justify-between items-center mb-2">
                            <span className="font-bold text-indigo-900 uppercase tracking-wider text-xs">Module {mod.id}</span>
                            <span className="bg-indigo-200 text-indigo-800 text-xs px-2 py-1 rounded-full font-bold">{mod.kanji.length} Kanji</span>
                        </div>
                        <h3 className="text-xl font-bold text-slate-800">{mod.title}</h3>
                    </button>
                ))}
            </div>

            <button
                onClick={startStudy}
                className="w-full max-w-sm py-4 bg-indigo-600 text-white rounded-xl font-bold text-lg shadow-lg shadow-indigo-200 active:scale-95 transition-transform flex items-center justify-center gap-2"
            >
                <span>Start Module</span>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
            </button>
        </div>
    );

    const SummaryScreen = () => (
        <div className="flex-1 flex flex-col items-center justify-center p-6 pop-in">
            <div className="text-6xl mb-4">{score === activeModule.kanji.length ? '🏆' : '📝'}</div>
            <h2 className="text-3xl font-bold text-slate-800 mb-2">Module Complete!</h2>
            <p className="text-slate-500 mb-8">You scored {score} / {activeModule.kanji.length}</p>

            <div className="w-full max-w-sm bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden mb-8">
                <div className="grid grid-cols-5 gap-px bg-slate-100">
                    {results.map((r, i) => (
                        <div key={i} className={`p-3 flex items-center justify-center font-kanji text-lg ${r.correct ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
                            {r.char}
                        </div>
                    ))}
                </div>
            </div>

            <div className="flex gap-4 w-full max-w-sm">
                <button
                    onClick={exitToMenu}
                    className="flex-1 py-3 bg-slate-200 text-slate-700 rounded-xl font-bold active:scale-95 transition-transform"
                >
                    Menu
                </button>
                <button
                    onClick={startStudy}
                    className="flex-1 py-3 bg-indigo-600 text-white rounded-xl font-bold shadow-lg shadow-indigo-200 active:scale-95 transition-transform"
                >
                    Retry
                </button>
            </div>
        </div>
    );

    const StudyCard = () => (
        <div className="flex-1 w-full flex flex-col items-center pop-in max-w-md mx-auto">
            {/* Header Controls */}
            <div className="w-full flex justify-between items-center p-4">
                <button onClick={exitToMenu} className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors">
                    <span className="text-xs font-bold uppercase">Exit</span>
                </button>
                <div className="text-xs font-bold text-indigo-400 uppercase tracking-wider">Study Mode</div>
                <button onClick={startTest} className="p-2 text-indigo-500 hover:text-indigo-700 hover:bg-indigo-50 rounded-lg transition-colors">
                    <span className="text-xs font-bold uppercase">Test Now</span>
                </button>
            </div>

            <div className="w-full bg-indigo-50 p-4 rounded-3xl mb-6 relative">
                {/* Index Indicator */}
                <div className="absolute top-4 right-4 text-xs font-bold text-indigo-300">
                    {currentIndex + 1} / {activeModule.kanji.length}
                </div>

                <div className="text-center space-y-1 mt-2">
                    <h2 className="text-2xl font-bold text-indigo-900">{currentItem.meaning}</h2>
                    <p className="text-indigo-600/60 text-sm">{currentItem.description}</p>
                </div>
            </div>

            {/* Stroke Order Visualization */}
            <div className="mb-6 relative group">
                <StrokeOrderViewer char={currentItem.char} />
                <div className="absolute bottom-2 right-2 text-xs text-slate-400 bg-white/80 px-2 rounded">KanjiVG</div>
            </div>

            {/* Details Grid */}
            <div className="w-full grid grid-cols-2 gap-4 mb-8 px-4">
                <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm text-center">
                    <span className="text-xs text-slate-400 uppercase tracking-wider block mb-1">Onyomi</span>
                    <span className="font-bold text-slate-700 text-lg">{currentItem.on}</span>
                </div>
                <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm text-center">
                    <span className="text-xs text-slate-400 uppercase tracking-wider block mb-1">Kunyomi</span>
                    <span className="font-bold text-slate-700 text-lg">{currentItem.kun}</span>
                </div>
            </div>

            <div className="mt-auto w-full px-4 pb-6 flex gap-4">
                <button
                    onClick={prevCard}
                    disabled={currentIndex === 0}
                    className={`flex-1 py-4 rounded-xl font-bold transition-all ${currentIndex === 0 ? 'bg-slate-100 text-slate-300' : 'bg-slate-200 text-slate-600 hover:bg-slate-300 active:scale-95'}`}
                >
                    Back
                </button>
                <button
                    onClick={nextCard}
                    className="flex-[2] py-4 bg-slate-800 text-white rounded-xl font-bold shadow-lg active:scale-95 transition-transform"
                >
                    Next
                </button>
            </div>
        </div>
    );

    const TestCard = () => (
        <div className="flex-1 w-full flex flex-col items-center pop-in max-w-md mx-auto">
            {/* Progress Bar */}
            <div className="w-full h-1.5 bg-slate-100 relative">
                <div className="h-full bg-green-500 transition-all duration-300" style={{ width: `${progress}%` }} />
            </div>

            {/* Exit Control for Test Mode */}
            <div className="w-full flex justify-start p-4">
                <button onClick={exitToMenu} className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors">
                    <span className="text-xs font-bold uppercase">Exit Test</span>
                </button>
            </div>

            <div className="w-full flex-1 flex flex-col p-6 pt-0">
                <div className="flex justify-center mb-6">
                    <div className="bg-slate-100 p-1 rounded-lg flex text-sm font-bold">
                        <button
                            onClick={() => setTestPromptType('meaning')}
                            className={`px-4 py-2 rounded-md transition-all ${testPromptType === 'meaning' ? 'bg-white shadow text-slate-800' : 'text-slate-400'}`}
                        >
                            English
                        </button>
                        <button
                            onClick={() => setTestPromptType('reading')}
                            className={`px-4 py-2 rounded-md transition-all ${testPromptType === 'reading' ? 'bg-white shadow text-slate-800' : 'text-slate-400'}`}
                        >
                            Readings
                        </button>
                    </div>
                </div>

                <div className="text-center mb-12 mt-4">
                    <span className="inline-block px-3 py-1 bg-red-100 text-red-600 rounded-full text-xs font-bold uppercase tracking-wider mb-4">Test Mode</span>

                    {testPromptType === 'meaning' ? (
                        <>
                            <h2 className="text-4xl font-bold text-slate-800 mb-4">{currentItem.meaning}</h2>
                            <p className="text-slate-400">Write the Kanji for this meaning</p>
                        </>
                    ) : (
                        <>
                            <h2 className="text-3xl font-bold text-slate-800 mb-4">{currentItem.on} / {currentItem.kun}</h2>
                            <p className="text-slate-400">Write the Kanji for these readings</p>
                        </>
                    )}
                </div>

                {/* Reveal Area */}
                <div className="flex-1 flex flex-col items-center justify-center min-h-[200px]">
                    {revealAnswer ? (
                        <div className="flex flex-col items-center pop-in">
                            <div className="font-kanji text-8xl text-slate-800 mb-4">{currentItem.char}</div>

                            {/* Show the info that wasn't in the prompt */}
                            {testPromptType === 'meaning' ? (
                                <div className="flex gap-4 text-sm text-slate-500">
                                    <span>{currentItem.on}</span>
                                    <span className="text-slate-300">|</span>
                                    <span>{currentItem.kun}</span>
                                </div>
                            ) : (
                                <div className="text-xl font-bold text-slate-700">
                                    {currentItem.meaning}
                                </div>
                            )}
                        </div>
                    ) : (
                        <div className="w-40 h-40 border-2 border-dashed border-slate-300 rounded-3xl flex items-center justify-center bg-slate-50">
                            <span className="text-4xl text-slate-300">?</span>
                        </div>
                    )}
                </div>

                <div className="mt-auto space-y-4">
                    {!revealAnswer ? (
                        <button
                            onClick={() => setRevealAnswer(true)}
                            className="w-full py-4 bg-indigo-600 text-white rounded-xl font-bold shadow-lg shadow-indigo-200 active:scale-95 transition-transform"
                        >
                            Reveal Answer
                        </button>
                    ) : (
                        <div className="grid grid-cols-2 gap-4">
                            <button
                                onClick={() => handleSelfGrade(false)}
                                className="py-4 bg-red-100 text-red-700 rounded-xl font-bold hover:bg-red-200 active:scale-95 transition-transform flex items-center justify-center gap-2"
                            >
                                <span>Incorrect</span>
                                <span className="text-lg">✕</span>
                            </button>
                            <button
                                onClick={() => handleSelfGrade(true)}
                                className="py-4 bg-green-100 text-green-700 rounded-xl font-bold hover:bg-green-200 active:scale-95 transition-transform flex items-center justify-center gap-2"
                            >
                                <span>Correct</span>
                                <span className="text-lg">✓</span>
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );

    // --- Main UI Router ---
    return (
        <div className="min-h-screen w-full bg-white font-fredoka text-slate-800 flex justify-center bg-slate-50">
            <style>{styles}</style>
            <div className="w-full max-w-md bg-white shadow-2xl min-h-screen flex flex-col relative">
                {phase === 'menu' && <MenuScreen />}
                {phase === 'study' && <StudyCard />}
                {phase === 'test' && <TestCard />}
                {phase === 'summary' && <SummaryScreen />}
            </div>
        </div>
    );
}