import React, { useState, useEffect } from 'react';

// Mock data - in the future this will be replaced with imported CSV data
const mockData = {
    occupations: [
        { id: 0, name: "Software Developer", exposure: -2.1, count: 0, time: 0, major: ["Computer Science"], occupation: [7] },
        { id: 1, name: "Registered Nurse", exposure: -2.4, count: 0, time: 0, major: ["Nursing"], occupation: [0] },
        { id: 2, name: "Statistician", exposure: -5.3, count: 0, time: 0, major: ["Statistics"], occupation: [1] },
        { id: 3, name: "Detective", exposure: -1.5, count: 0, time: 0, major: ["Criminal Justice"], occupation: [2] },
        { id: 4, name: "Elementary Teacher", exposure: -3.2, count: 0, time: 0, major: ["Education"], occupation: [3] },
        { id: 5, name: "Marketing Manager", exposure: 4.2, count: 0, time: 0, major: ["Advertising"], occupation: [4] },
        { id: 6, name: "Professor", exposure: 1.1, count: 0, time: 0, major: ["Chinese", "Computer Science"], occupation: [5] },
        { id: 7, name: "Accountant", exposure: 3.9, count: 0, time: 0, major: ["Accounting"], occupation: [6, 0] },
    ]
};

function AIExposureVisualization() {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchTerms, setSearchTerms] = useState('');
    const [ranked, setRanked] = useState(null);
    const [selectedItem, setSelectedItem] = useState(null);
    const [list, setList] = useState([]);
    const [showSearch, setShowSearch] = useState(true);
    const [showTop, setShowTop] = useState(false);
    const [timeSpent, setTimeSpent] = useState(0);
    const [timeSpentPages, setTimeSpentPages] = useState([0, 0, 0]);
    const [timeSpentDetailStart, setTimeSpentDetailStart] = useState(0);
    const [timeSpentDetail, setTimeSpentDetail] = useState(mockData.occupations);

    // Set timer
    useEffect(() => {
        const timer = setInterval(() => {
            setTimeSpent(prev => prev + 1);
        }, 1000);

        // Cleanup interval on unmount
        return () => clearInterval(timer);
    }, []);

    // Colors for the bars
    const negativeColor = ['#ffcccb'];
    const neutralColor = ['#c0c0c0'];
    const positiveColor = ['#ccffcc'];

    // Updated getColor function to accept a type parameter
    const getColor = (value) => {
        const colors = [negativeColor, neutralColor, positiveColor]
        if (value <= -2) return colors[0];
        if (value >= 2) return colors[2];
        return colors[1];
    };

    // Filter and sort data
    let data = [...mockData['occupations']];

    // Apply search filter
    if (searchTerm) {
        data = data.filter(item => item.name.toLowerCase().includes(searchTerm.toLowerCase()));
    }

    // Handle item selection
    const handleItemClick = (item) => {
        if (!list.find(i => i.name === item.name) & list.length < 6) {
            setList([...list, item]);
            if (searchTerms == '') {
                setSearchTerms(searchTerm);
            }
            else {
                setSearchTerms(searchTerms + ', ' + searchTerm);
            }
        }
    };

    // Map to create a new array with the updated item
    const updateTimeSpentDetail = (indexToUpdate, newValue) => {
        setTimeSpentDetail(newtimeSpentDetail => newtimeSpentDetail.map(item =>
            item.id === indexToUpdate ? { ...item, time: item.time + newValue } : item
        ));
    };

    const updateTimeSpentPages = (indexToUpdate, newValue) => {
        setTimeSpentPages(timeSpentPages.map((item, index) => index === indexToUpdate ? newValue + item : item)); // Map to create a new array with the updated item
    };

    const handleItemClickDetailed = (item) => {
        if (selectedItem) {
            updateTimeSpentDetail(selectedItem.id, timeSpent - timeSpentDetailStart);
        }
        if ((selectedItem && selectedItem !== item) || !selectedItem) {
            item.count++;
        }
        setSelectedItem(selectedItem?.name === item.name ? null : item);
        setTimeSpentDetailStart(timeSpent);
    };

    // Handler to clear all items from the list
    const handleClearItems = () => {
        // Optional: confirm before clearing
        if (window.confirm('Are you sure you want to clear the list?')) {
            setList([]);
        }
    };

    const handleRemove = (id) => {
        setList(list.filter((item) => item.name !== id));
    };

    const handleSubmit = () => {
        if (list.length === 6) {
            const sortedList = [...list].sort((a, b) => b.exposure - a.exposure);
            setRanked(sortedList);
            setShowSearch(false);
            updateTimeSpentPages(0, timeSpent);
            setTimeSpent(0);
        }
    };

    const handleNext = () => {
        setShowTop(true);
        setRanked(null);
        if (selectedItem) {
            updateTimeSpentDetail(selectedItem.id, timeSpent - timeSpentDetailStart)
        }
        setSelectedItem(null);
        updateTimeSpentPages(1, timeSpent);
        setTimeSpent(0);
    };

    const handleBack = () => {
        setShowTop(false);
        handleSubmit();
        if (selectedItem) {
            updateTimeSpentDetail(selectedItem.id, timeSpent - timeSpentDetailStart)
        }
        setSelectedItem(null);
        updateTimeSpentPages(2, timeSpent);
        setTimeSpent(0);
    };

    const handleEnd = () => {
        setShowTop(false);
        if (selectedItem) {
            updateTimeSpentDetail(selectedItem.id, timeSpent - timeSpentDetailStart)
        }
        setSelectedItem(null);
        updateTimeSpentPages(2, timeSpent);
        setTimeSpent(0);
    };

    return (
        <div style={{
            maxWidth: '800px',
            margin: '0 auto',
            padding: '20px',
            backgroundColor: '#f9f9f9',
            borderRadius: '10px',
            boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
            fontFamily: 'Arial, sans-serif'
        }}>
            <h1 style={{
                fontSize: '28px',
                fontWeight: 'bold',
                textAlign: 'center',
                marginBottom: '20px',
                color: '#333'
            }}>AI Exposure Explorer</h1>
            {showSearch && (
                <p style={{
                    textAlign: 'center',
                    marginBottom: '30px',
                    color: 'black'
                }}>
                    Explore how different occupations may be impacted by generative AI
                </p>
            )}
            {ranked && showTop && (
                <p style={{
                    textAlign: 'center',
                    marginBottom: '30px',
                    color: 'black'
                }}>
                    Click on an occupation to learn more detailed information about related occupations and fields of study.
                </p>
            )}

            {showSearch && (
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                    gap: '15px',
                    marginBottom: '30px'
                }}>
                    {/* Search Section */}
                    <div style={{
                        backgroundColor: 'white',
                        padding: '15px',
                        borderRadius: '8px',
                        boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
                    }}>
                        <label style={{
                            display: 'block',
                            fontSize: '14px',
                            fontWeight: '500',
                            marginBottom: '10px',
                            color: 'black'
                        }}>
                            Use the below search bar to search for your preferred occupations. Please click an occupation to add it to your list of preferred occupations, with the first occupation being your most desired and so on. You must select six occupations to go to the next page.
                        </label>
                        <div style={{ position: 'relative' }}>
                            <input
                                type="text"
                                placeholder='Search for occupations'
                                onChange={(e) => setSearchTerm(e.target.value)}
                                style={{
                                    width: '100%',
                                    padding: '10px 10px 10px 35px',
                                    borderRadius: '6px',
                                    border: '1px solid #d1d5db',
                                    outline: 'none',
                                    fontSize: '14px',
                                    boxSizing: 'border-box'
                                }}
                            />
                            <div style={{
                                position: 'absolute',
                                left: '10px',
                                top: '50%',
                                transform: 'translateY(-50%)',
                                color: '#9ca3af'
                            }}>
                                🔍
                            </div>
                        </div>
                        <div
                            style={{
                                height: '250px',
                                overflowY: 'scroll'
                            }}
                        >
                            {data.map((item, index) => {
                                return (
                                    <div
                                        key={index}
                                        onClick={() => handleItemClick(item)}
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '10px',
                                            padding: '8px',
                                            borderRadius: '6px',
                                            border: '2px solid transparent',
                                            cursor: 'pointer',
                                            transition: 'all 0.2s ease',
                                            backgroundColor: 'transparent'
                                        }}
                                    >
                                        <div style={{
                                            width: '150px',
                                            overflow: 'hidden',
                                            textOverflow: 'ellipsis',
                                            whiteSpace: 'nowrap',
                                            fontWeight: 'normal',
                                            fontSize: '15px'
                                        }}>
                                            {item.name}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                        gap: '15px',
                        marginBottom: '30px'
                    }}>
                        <div style={{
                            backgroundColor: 'white',
                            padding: '15px',
                            borderRadius: '8px',
                            boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
                        }}>
                            <label style={{
                                display: 'block',
                                fontSize: '18px',
                                fontWeight: '500',
                                marginBottom: '10px',
                                color: 'black'
                            }}>
                                Preferred Occupations
                            </label>
                            <div>
                                <ol>
                                    {list.map(item => (
                                        <li key={item.name}>{item.name}
                                            <button
                                                onClick={() => handleRemove(item.name)}
                                                style={{
                                                    marginLeft: '16px',
                                                    backgroundColor: 'white',
                                                    color: 'red',
                                                    border: 'none',
                                                    fontSize: '1rem',
                                                    fontWeight: 'bold',
                                                    cursor: 'pointer',
                                                }}
                                            >
                                                &#x2715;
                                            </button>
                                        </li>
                                    ))}
                                </ol>
                                <button
                                    onClick={handleClearItems}
                                    disabled={list.length === 0}
                                    style={{
                                        cursor: 'pointer',
                                    }}
                                >
                                    Clear List
                                </button>
                                <button
                                    onClick={handleSubmit}
                                    disabled={list.length === 0}
                                    style={{
                                        marginLeft: '16px',
                                        cursor: 'pointer',
                                        float: 'right'
                                    }}
                                >
                                    Submit
                                </button>

                            </div>
                        </div>
                    </div>
                </div>
            )}
            {/* Ordered List */}
            {ranked && (
                <>
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                        gap: '15px',
                        marginBottom: '30px'
                    }}>
                        <div style={{
                            backgroundColor: 'white',
                            padding: '15px',
                            borderRadius: '8px',
                            boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
                        }}>
                            <label style={{
                                display: 'block',
                                fontSize: '16px',
                                fontWeight: 'bold',
                                marginBottom: '10px',
                                color: 'black'
                            }}>
                                Preferred Occupations Predicted Effects from Generative AI Ranked from Most Postive to Most Negative
                            </label>
                            <div>
                                <ol>
                                    {ranked.map(item => {
                                        return (
                                            <li key={item.name}
                                                onClick={() => handleItemClickDetailed(item)}
                                                style={{
                                                    cursor: 'pointer',
                                                    backgroundColor: getColor(item.exposure)
                                                }}
                                            >{item.name}: {item.exposure}%</li>
                                        )
                                    })}
                                </ol>
                                <button
                                    onClick={handleNext}
                                    style={{
                                        cursor: 'pointer',
                                        float: 'right'
                                    }}
                                >
                                    Next
                                </button>
                            </div>
                        </div>
                    </div>
                </>
            )}
            {showTop && (
                <>
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                        gap: '15px',
                        marginBottom: '30px'
                    }}>
                        <div style={{
                            backgroundColor: 'white',
                            padding: '15px',
                            borderRadius: '8px',
                            boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
                        }}>
                            <label style={{
                                display: 'block',
                                fontSize: '16px',
                                fontWeight: 'bold',
                                marginBottom: '10px',
                                color: 'black'
                            }}>
                                Top 3 Occupations that have the Most Postive Predicted Effects from Generative AI
                            </label>
                            <div>
                                <ol>
                                    <li
                                        onClick={() => handleItemClickDetailed(mockData.occupations[5])}
                                        style={{
                                            cursor: 'pointer',
                                            backgroundColor: getColor(mockData.occupations[5].exposure)
                                        }}
                                    >{mockData.occupations[5].name}: {mockData.occupations[5].exposure}%</li>
                                    <li
                                        onClick={() => handleItemClickDetailed(mockData.occupations[7])}
                                        style={{
                                            cursor: 'pointer',
                                            backgroundColor: getColor(mockData.occupations[7].exposure)
                                        }}
                                    >{mockData.occupations[7].name}: {mockData.occupations[7].exposure}%</li>
                                    <li
                                        onClick={() => handleItemClickDetailed(mockData.occupations[6])}
                                        style={{
                                            cursor: 'pointer',
                                            backgroundColor: getColor(mockData.occupations[6].exposure)
                                        }}
                                    >{mockData.occupations[6].name}: {mockData.occupations[6].exposure}%</li>
                                </ol>
                            </div>
                            <label style={{
                                display: 'block',
                                fontSize: '16px',
                                fontWeight: 'bold',
                                marginBottom: '10px',
                                color: 'black'
                            }}>
                                Top 3 Occupations that have the Most Negative Predicted Effects from Generative AI
                            </label>
                            <div>
                                <ol>
                                    <li
                                        onClick={() => handleItemClickDetailed(mockData.occupations[2])}
                                        style={{
                                            cursor: 'pointer',
                                            backgroundColor: getColor(mockData.occupations[2].exposure)
                                        }}
                                    >{mockData.occupations[2].name}: {mockData.occupations[2].exposure}%</li>
                                    <li
                                        onClick={() => handleItemClickDetailed(mockData.occupations[4])}
                                        style={{
                                            cursor: 'pointer',
                                            backgroundColor: getColor(mockData.occupations[4].exposure)
                                        }}
                                    >{mockData.occupations[4].name}: {mockData.occupations[4].exposure}%</li>
                                    <li
                                        onClick={() => handleItemClickDetailed(mockData.occupations[1])}
                                        style={{
                                            cursor: 'pointer',
                                            backgroundColor: getColor(mockData.occupations[1].exposure)
                                        }}
                                    >{mockData.occupations[1].name}: {mockData.occupations[1].exposure}%</li>
                                </ol>
                                <button
                                    onClick={handleBack}
                                    style={{
                                        cursor: 'pointer',
                                        float: 'left'
                                    }}
                                >
                                    Back
                                </button>
                                <button
                                    onClick={handleEnd}
                                    style={{
                                        cursor: 'pointer',
                                        float: 'right'
                                    }}
                                >
                                    End
                                </button>
                            </div>
                        </div >
                    </div >
                </>
            )
            }
            {!showTop && !ranked && !showSearch && (
                <>
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                        gap: '15px',
                        marginBottom: '30px'
                    }}>

                        <div style={{
                            backgroundColor: 'white',
                            padding: '15px',
                            borderRadius: '8px',
                            boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
                        }}>
                            <label style={{
                                display: 'block',
                                fontSize: '16px',
                                fontWeight: 'bold',
                                marginBottom: '10px',
                                color: 'black'
                            }}>
                                Number of clicks and time spent on detailed information for each occupation
                            </label>
                            <div>
                                <ul>
                                    {mockData.occupations.map(occupation => {
                                        return (
                                            <li key={occupation.name}>{occupation.name}: {occupation.count} clicks and {timeSpentDetail[occupation.id].time} seconds</li>
                                        )
                                    })}
                                </ul>
                            </div>
                            <label style={{
                                display: 'block',
                                fontSize: '16px',
                                fontWeight: 'bold',
                                marginBottom: '10px',
                                color: 'black'
                            }}>
                                Amount of time spent on each page
                            </label>
                            <div>
                                <ul>
                                    <li>Page 1: {timeSpentPages[0]} seconds</li>
                                    <li>Page 2: {timeSpentPages[1]} seconds</li>
                                    <li>Page 3: {timeSpentPages[2]} seconds</li>
                                </ul>
                            </div>
                            <label style={{
                                display: 'block',
                                fontSize: '16px',
                                fontWeight: 'bold',
                                marginBottom: '10px',
                                color: 'black'
                            }}>
                                What the user searched for
                            </label>
                            <div>
                                <p>Search Terms: {searchTerms}</p>
                            </div>
                        </div >
                    </div >
                </>
            )
            }
            {/* Detail view when an item is selected */}
            {
                selectedItem && (
                    <div style={{
                        backgroundColor: 'white',
                        padding: '20px',
                        borderRadius: '10px',
                        boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                        marginBottom: '20px'
                    }}>
                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(2, 1fr)',
                            gap: '20px',
                            marginBottom: '20px'
                        }}>
                        </div>
                        <div style={{
                            marginTop: '20px',
                            padding: '15px',
                            backgroundColor: '#f0f9ff',
                            borderRadius: '6px',
                            border: '1px solid #bfdbfe'
                        }}>
                            <h4 style={{ marginBottom: '10px', fontWeight: 'bold', color: '#1e40af' }}>
                                Generative AI Impact Analysis
                            </h4>
                            <p style={{ marginBottom: '10px', lineHeight: '1.5', color: 'black' }}>
                                {selectedItem.exposure > 2 ?
                                    `${selectedItem.name}s have a projected big increase (${selectedItem.exposure}%) in money earned.` :
                                    selectedItem.exposure > 0 ?
                                        `${selectedItem.name}s have a projected small increase (${selectedItem.exposure}%) in money earned.` :
                                        selectedItem.exposure < -2 ?
                                            `${selectedItem.name}s have a projected big decrease (${selectedItem.exposure}%) in money earned.` :
                                            `${selectedItem.name}s have a projected small decrease (${selectedItem.exposure}%) in money earned.`
                                }
                            </p>
                            <p style={{ lineHeight: '1.5', color: 'black' }}>
                                {`The potential effects of generative AI on occupations similar to ${selectedItem.name} are shown below.`}
                            </p>
                            <p style={{ lineHeight: '1.5', color: 'black' }}>
                                <ol style={{ paddingLeft: '20px', marginBottom: '10px', lineHeight: '1.6', color: 'black' }}>
                                    {(selectedItem.occupation).map(occupation_number => {
                                        return (
                                            <li key={occupation_number}
                                                onClick={() => handleItemClickDetailed(mockData.occupations[occupation_number])}
                                                style={{
                                                    cursor: 'pointer',
                                                    backgroundColor: getColor(mockData.occupations[occupation_number].exposure)
                                                }}
                                            >{mockData.occupations[occupation_number].name}: {mockData.occupations[occupation_number].exposure}%</li>
                                        )
                                    })}
                                </ol>
                            </p>
                            <p style={{ lineHeight: '1.5', color: 'black' }}>
                                {`The majors most helpful to pursuing a career as a ${selectedItem.name} are shown below.`}
                            </p>
                            <p style={{ lineHeight: '1.5', color: 'black' }}>
                                <ol style={{ paddingLeft: '20px', marginBottom: '10px', lineHeight: '1.6', color: 'black' }}>
                                    {(selectedItem.major).map(major => {
                                        return (
                                            <li key={major}>{major}</li>
                                        )
                                    })}
                                </ol>
                            </p>
                        </div>
                    </div>
                )
            }
        </div >
    );
}

export default AIExposureVisualization;