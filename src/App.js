import React, { useState, useEffect } from 'react';

// Mock data - in the future this will be replaced with imported CSV data
const mockData = {
  // colleges: [
  //   { name: "Agriculture and Natural Resources", exposure: -2.1},
  //   { name: "Arts and Letters", exposure: -2.4},
  //   { name: "Assoc prov undergraduate education", exposure: -5.3},
  //   { name: "Business", exposure: -1.5},
  //   { name: "Communication Arts and Sciences", exposure: -3.2},
  //   { name: "Education", exposure: -4.2},
  //   { name: "Engineering", exposure: -1.1},
  //   { name: "James Madison College", exposure: -3.9},
  //   { name: "Lyman Briggs College", exposure: -2.1},
  //   { name: "Music", exposure: -2.4},
  //   { name: "Natural Science", exposure: -5.3},
  //   { name: "Nursing", exposure: -1.5},
  //   { name: "Resdntl Coll Arts and Humanities", exposure: -3.2},
  //   { name: "Social Science", exposure: -4.2},
  //   { name: "Veterinary Science", exposure: -1.1}
  // ],
  occupations: [
    { name: "Software Developer", exposure: -2.1},
    { name: "Registered Nurse", exposure: -2.4},
    { name: "Statician", exposure: -5.3},
    { name: "Detective", exposure: -1.5},
    { name: "Elementary Teacher", exposure: -3.2},
    { name: "Marketing Manager", exposure: 4.2},
    { name: "Professor", exposure: 1.1},
    { name: "Accountant", exposure: 3.9}
  ],
  majors: [
    { name: "ag,food & natural resources ed", exposure: -2.1},
    { name: "agr & nat res - exploratory", exposure: -2.7},
    { name: "agribusiness management", exposure: -4.2},
    { name: "animal science", exposure: -0.64},
    { name: "construction management", exposure: -3.5},
    { name: "dietetics", exposure: -1.3},
    { name: "entomology", exposure: 1.1},
    { name: "envir studies & sustainability", exposure: 2.1},
    { name: "environmental economics & mgt", exposure: 1.5},
    { name: "environmental economics&policy", exposure: 2.5},
    { name: "fisheries and wildlife", exposure: -2.1},
    { name: "food industry management", exposure: -2.7},
    { name: "food science", exposure: -4.2},
    { name: "forestry", exposure: -0.64},
    { name: "interior design", exposure: -3.5},
    { name: "landscape architecture", exposure: -1.3},
    { name: "nutritional sciences", exposure: 1.1},
    { name: "packaging", exposure: 2.1},
    { name: "sustainable parks,rec and tour", exposure: 1.5},
    { name: "apparel and textile design", exposure: 2.5},
    { name: "apparel and textiles", exposure: -2.1},
    { name: "arabic", exposure: -2.7},
    { name: "art education", exposure: -4.2},
    { name: "art history and visual culture", exposure: -0.64},
    { name: "arts & letters - exploratory", exposure: -3.5},
    { name: "chinese", exposure: -1.3},
    { name: "english", exposure: 1.1},
    { name: "experience architecture", exposure: 2.1},
    { name: "film studies", exposure: 1.5},
    { name: "french", exposure: 2.5},
    { name: "german", exposure: -2.1},
    { name: "global stdys arts & humanities", exposure: -2.7},
    { name: "graphic design", exposure: -4.2},
    { name: "humanities-prelaw", exposure: -0.64},
    { name: "interdisciplinary humanities", exposure: -3.5},
    { name: "japanese", exposure: -1.3},
    { name: "linguistics", exposure: 1.1},
    { name: "philosophy", exposure: 2.1},
    { name: "professional writing", exposure: 2.1},
    { name: "religious studies", exposure: 1.5},
    { name: "russian", exposure: 2.5},
    { name: "spanish", exposure: -2.1},
    { name: "studio art", exposure: -2.7},
    { name: "theatre", exposure: -4.2},
    { name: "women's and gender studies", exposure: -0.64},
    { name: "exploratory preference", exposure: -3.5},
    { name: "accounting", exposure: -1.3},
    { name: "business", exposure: 1.1},
    { name: "finance", exposure: 2.1},
    { name: "general management", exposure: 1.5},
    { name: "hospitality business", exposure: 2.5},
    { name: "human resource management", exposure: -2.1},
    { name: "management", exposure: -2.7},
    { name: "marketing", exposure: -4.2},
    { name: "supply chain management", exposure: -0.64},
    { name: "advertising", exposure: -3.5},
    { name: "advertising creative", exposure: -1.3},
    { name: "advertising management", exposure: 1.1},
    { name: "communication", exposure: 2.1},
    { name: "communication leader &strategy", exposure: 2.1},
    { name: "journalism", exposure: 1.5},
    { name: "media and information", exposure: 2.1},
    { name: "athletic training", exposure: -3.5},
    { name: "education", exposure: -1.3},
    { name: "kinesiology", exposure: 1.1},
    { name: "special ed-learn disabilities", exposure: 2.1},
    { name: "applied engineering sciences", exposure: -3.5},
    { name: "biosystems engineering", exposure: -1.3},
    { name: "chemical engineering", exposure: 1.1},
    { name: "civil engineering", exposure: 2.1},
    { name: "communication leader &strategy", exposure: 2.1},
    { name: "computer engineering", exposure: 1.5},
    { name: "computer science", exposure: 2.1},
    { name: "electrical engineering", exposure: -3.5},
    { name: "engineering - exploratory", exposure: -1.3},
    { name: "environmental engineering", exposure: 1.1},
    { name: "materials sci and engineering", exposure: 2.1},
    { name: "mechanical engineering", exposure: -1.3},
    { name: "international relations", exposure: 1.1},
    { name: "james madison", exposure: 2.1},
    { name: "pol theory&constitutional dem", exposure: 1.1},
    { name: "social relations and policy", exposure: 2.1},
    { name: "actuarial science", exposure: -3.5},
    { name: "astrophysics", exposure: -1.3},
    { name: "biochem & molecular bio/biotech", exposure: 1.1},
    { name: "biochemistry & molecular biol", exposure: 2.1},
    { name: "biology", exposure: -3.5},
    { name: "biosystems engineering", exposure: -1.3},
    { name: "biomedical laboratory science", exposure: 1.1},
    { name: "chemistry", exposure: 2.1},
    { name: "earth science", exposure: 2.1},
    { name: "envir biology/microbiology", exposure: 1.5},
    { name: "environmental biology/zoology", exposure: 2.1},
    { name: "environmental geosciences", exposure: -3.5},
    { name: "environmental sci & mgt", exposure: -1.3},
    { name: "genomics & molecular genetics", exposure: 1.1},
    { name: "geological sciences", exposure: 2.1},
    { name: "hist,philosophy & soc of sci", exposure: -1.3},
    { name: "human biology", exposure: 1.1},
    { name: "lyman briggs", exposure: 2.1},
    { name: "mathematics", exposure: 1.1},
    { name: "mathematics, advanced", exposure: 2.1},
    { name: "microbiology", exposure: -3.5},
    { name: "neuroscience", exposure: -1.3},
    { name: "physics", exposure: 1.1},
    { name: "physiology", exposure: 2.1},
    { name: "plant biology", exposure: -3.5},
    { name: "statistics", exposure: -1.3},
    { name: "zoology", exposure: 1.1},
    { name: "composition", exposure: 1.1},
    { name: "jazz studies", exposure: 2.1},
    { name: "music", exposure: -3.5},
    { name: "music education", exposure: -1.3},
    { name: "music performance", exposure: 1.1},
    { name: "biological science-interdept", exposure: 1.1},
    { name: "clinical laboratory sciences", exposure: 2.1},
    { name: "computational mathematics", exposure: 1.1},
    { name: "environmental biol/plant biol", exposure: 2.1},
    { name: "integrative biology", exposure: -1.3},
    { name: "medical laboratory science", exposure: -1.3},
    { name: "natural science - exploratory", exposure: 1.1},
    { name: "physical science", exposure: 2.1},
    { name: "predental", exposure: -3.5},
    { name: "premedical", exposure: -1.3},
    { name: "preoptometry", exposure: 1.1},
    { name: "nursing", exposure: -1.3},
    { name: "prenursing", exposure: 1.1},
    { name: "arts and humanities", exposure: 1.1},
    { name: "anthropology", exposure: 1.1},
    { name: "child development", exposure: 2.1},
    { name: "criminal justice", exposure: 1.1},
    { name: "economic geography", exposure: 2.1},
    { name: "economics", exposure: -1.3},
    { name: "environmental geography", exposure: -1.3},
    { name: "geographic information science", exposure: 1.1},
    { name: "global & area studies-soc sci", exposure: 2.1},
    { name: "global & intl stdys in soc sci", exposure: -3.5},
    { name: "history", exposure: -1.3},
    { name: "history education", exposure: 1.1},
    { name: "human capital and society", exposure: -1.3},
    { name: "human devel and family studies", exposure: 1.1},
    { name: "human geography", exposure: 1.1},
    { name: "intr stdys soc sci: soc sci ed", exposure: 1.1},
    { name: "intr studies in social science", exposure: 1.1},
    { name: "political science", exposure: -1.3},
    { name: "political science-prelaw", exposure: 1.1},
    { name: "psychology", exposure: -1.3},
    { name: "public policy", exposure: 1.1},
    { name: "social work", exposure: 1.1},
    { name: "sociology", exposure: 1.1},
    { name: "urban and regional planning", exposure: 1.1},
    { name: "world politics", exposure: 1.1},
    { name: "preveterinary", exposure: 1.1},
    { name: "veterinary technology", exposure: 1.1}
  ]
};

// Mapping majors to colleges
// const fieldsOfStudy = {
const majors_match_colleges = {
  "Agriculture and Natural Resources": ["ag,food & natural resources ed", "agr & nat res - exploratory", "agribusiness management",
   "animal science", "construction management", "dietetics", "entomology", "envir studies & sustainability", "environmental economics & mgt",
  "environmental economics&policy", "fisheries and wildlife", "food industry management", "food science", "forestry", "interior design", 
  "landscape architecture", "nutritional sciences", "packaging", "sustainable parks,rec and tour"],
  "Arts and Letters": ["apparel and textile design", "apparel and textiles", "arabic", "art education", "art history and visual culture", 
   "arts & letters - exploratory", "chinese", "english", "experience architecture", "film studies", "french", "german", "global stdys arts & humanities",
   "graphic design", "humanities-prelaw", "interdisciplinary humanities", "japanese", "linguistics", "philosophy", "professional writing", 
   "religious studies", "russian", "spanish", "studio art", "theatre", "women's and gender studies"], 
  "Assoc prov undergraduate education": ["exploratory preference"],
  "Business": ["accounting", "business", "finance", "general management", "hospitality business", "human resource management", 
    "management", "marketing", "supply chain management"],
  "Communication Arts and Sciences": ["advertising", "advertising creative", "advertising management", "communication", "communication leader &strategy", 
    "journalism", "media and information"],
  "Education": ["athletic training", "education", "kinesiology", "special ed-learn disabilities"],
  "Engineering": ["applied engineering sciences", "biosystems engineering", "chemical engineering", "civil engineering", "communication leader &strategy", 
    "computer engineering", "computer science", "electrical engineering", "engineering - exploratory", "environmental engineering", 
  "materials sci and engineering", "mechanical engineering", "environmental engineering", ],
  "James Madison College": ["international relations", "james madison", "pol theory&constitutional dem", "social relations and policy"],
  "Lyman Briggs College": ["actuarial science", "astrophysics", "biochem & molecular bio/biotech", "biochemistry & molecular biol", "biology", 
    "biosystems engineering", "biomedical laboratory science", "chemistry", "earth science", "envir biology/microbiology", "environmental biology/zoology", 
    "environmental geosciences", "environmental sci & mgt", "genomics & molecular genetics", "geological sciences", "hist,philosophy & soc of sci", 
    "human biology", "lyman briggs", "mathematics", "mathematics, advanced", "microbiology", "neuroscience", "physics", "physiology", "plant biology", 
    "statistics", "zoology", "animal science", "computer science", "fisheries and wildlife", "food science", "nutritional sciences"],
  "Music": ["composition", "jazz studies", "music", "music education", "music performance"],
  "Natural Science": ["biological science-interdept", "clinical laboratory sciences", "computational mathematics", "environmental biol/plant biol", 
    "integrative biology", "medical laboratory science", "natural science - exploratory", "physical science", "predental", "premedical", "preoptometry", 
  "actuarial science", "astrophysics", "biochem & molecular bio/biotech", "biochemistry & molecular biol", "biomedical laboratory science", 
    "chemistry", "earth science", "envir biology/microbiology", "environmental biology/zoology", "environmental geosciences", "genomics & molecular genetics", 
    "geological sciences", "human biology", "mathematics", "mathematics, advanced", "microbiology", "neuroscience", "physics", "physiology", "plant biology", 
    "statistics", "zoology"],
  "Nursing": ["nursing", "prenursing",],
  "Resdntl Coll Arts and Humanities": ["arts and humanities"],
  "Social Science": ["anthropology", "child development", "criminal justice", "economic geography", "economics", "environmental geography", 
    "geographic information science", "global & area studies-soc sci", "global & intl stdys in soc sci", "history", "history education", 
  "human capital and society", "human devel and family studies", "human geography", "intr stdys soc sci: soc sci ed", "intr studies in social science", 
  "political science", "political science-prelaw", "psychology", "public policy", "social work", "sociology", "urban and regional planning",
    "world politics"],
  "Veterinary Science": ["preveterinary", "veterinary technology"]
};

// Mapping occupations to majors
// const sectors = {
const occupations_match_majors = {
  "nursing": ["Registered Nurse"],
  "computer science": ["Software Developer"],
  "statistics": ["Statician"],
  "accouting": ["Accountant"],
  "education": ["Elementary Teacher"],
  "criminal justice": ["Detective"],
  "advertising": ["Marketing Manager"],
  "chinese": ["Professor"]
};

function AIExposureVisualization() {
  const [dataType, setDataType] = useState('occupations');
  // const [exposureType, setExposureType] = useState('negative');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState('default');
  const [selectedItem, setSelectedItem] = useState(null);
  const [compareMode, setCompareMode] = useState(false);
  const [comparedItems, setComparedItems] = useState([]);
  // const [collegeFilter, setCollegeFilter] = useState('all'); // For colleges
  // const [fieldFilter, setFieldFilter] = useState('all'); // For majors
  // const [sectorFilter, setSectorFilter] = useState('all'); // For occupations
  const [majorFilter, setMajorFilter] = useState('all'); // For majors
  const [occupationFilter, setOccupationFilter] = useState('all'); // For occupations
  
  // Colors for the bars
  // const negativeColors = ['#ffcccb', '#ff6666', '#ff0000', '#cc0000', '#8b0000'];
  // const positiveColors = ['#ccffcc', '#66ff66', '#00ff00', '#00cc00', '#008b00'];
  const negativeColor = ['#ffcccb'];
  const neutralColor = ['#c0c0c0'];
  const positiveColor = ['#ccffcc'];

  // Updated getColor function to accept a type parameter
  const getColor = (value) => {
    const colors = [negativeColor,neutralColor,positiveColor]
    // if (value < 20) return colors[0];
    if (value <= -2) return colors[0];
    if (value >= 2) return colors[2];
    // if (value < 40) return colors[1];
    // if (value < 60) return colors[2];
    // if (value < 80) return colors[3];
    // return colors[4];
    return colors[1];
  };

  // Filter and sort data
  let data = [...mockData[dataType]];

  // Apply filter based on data type
  // if (dataType === 'majors' && fieldFilter !== 'all') {
  //   data = data.filter(item => fieldsOfStudy[fieldFilter].includes(item.name));
  // }
  // if (dataType === 'occupations' && sectorFilter !== 'all') {
  //   data = data.filter(item => sectors[sectorFilter].includes(item.name));
  // }
  if (dataType === 'majors' && majorFilter !== 'all') {
    data = data.filter(item => majors_match_colleges[majorFilter].includes(item.name));
  }
  if (dataType === 'occupations' && occupationFilter !== 'all') {
    data = data.filter(item => occupations_match_majors[occupationFilter].includes(item.name));
  }
  
  // Apply search filter
  if (searchTerm) {
    data = data.filter(item => item.name.toLowerCase().includes(searchTerm.toLowerCase()));
  }
  
  // Apply sorting
  if (sortOrder === 'alphabetical') {
    data.sort((a, b) => a.name.localeCompare(b.name));
  } else if (sortOrder === 'lowest') {
    data.sort((a, b) =>
      // a[exposureType === 'negative' ? 'negativeExposure' : 'positiveExposure'] -
      // b[exposureType === 'negative' ? 'negativeExposure' : 'positiveExposure']
      a['exposure'] -
      b['exposure']
    );
  } else if (sortOrder === 'highest') {
    data.sort((a, b) =>
      // b[exposureType === 'negative' ? 'negativeExposure' : 'positiveExposure'] -
      // a[exposureType === 'negative' ? 'negativeExposure' : 'positiveExposure']
      b['exposure'] -
      a['exposure']
    );
  }

  // Handle item selection
  const handleItemClick = (item) => {
    if (compareMode) {
      if (comparedItems.find(i => i.name === item.name)) {
        setComparedItems(comparedItems.filter(i => i.name !== item.name));
      } else if (comparedItems.length < 3) {
        setComparedItems([...comparedItems, item]);
      }
    } else {
      setSelectedItem(selectedItem?.name === item.name ? null : item);
    }
  };

  // Clear selections when switching data types
  useEffect(() => {
    setComparedItems([]);
    setSelectedItem(null);
    // Reset filters when data type changes
    // setFieldFilter('all');
    // setSectorFilter('all');
    setMajorFilter('all');
    setOccupationFilter('all');
  }, [dataType]);

  // Get related occupations for a major
  // const getRelatedOccupations = (majorName) => {
  //   const mapping = {
  //     "Computer Science": ["Software Developer"],
  //     "Nursing": ["Registered Nurse"],
  //     "Finance": ["Financial Analyst"],
  //     "Graphic Design": ["Graphic Designer"],
  //     "Education": ["Elementary Teacher"],
  //     "Marketing": ["Marketing Manager"],
  //     "Civil Engineering": ["Civil Engineer"],
  //     "HR Management": ["HR Specialist"],
  //     "Accounting": ["Accountant"],
  //     "Psychology": ["HR Specialist"]
  //   };
    
  //   return mockData.occupations.filter(occ => mapping[majorName] && mapping[majorName].includes(occ.name));
  // };

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
      <p style={{
        textAlign: 'center',
        marginBottom: '30px',
        color: '#666'
      }}>
        Explore how different {dataType} may be impacted by generative AI
      </p>
      
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '15px',
        marginBottom: '30px'
      }}>
        {/* View By Section
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
            color: '#444'
          }}>
            View By
          </label>
          <div style={{display: 'flex', gap: '10px'}}>
            <button
              onClick={() => setDataType('occupations')}
              style={{
                flex: 1,
                padding: '10px',
                borderRadius: '6px',
                border: 'none',
                backgroundColor: dataType === 'occupations' ? '#3b82f6' : '#e5e7eb',
                color: dataType === 'occupations' ? 'white' : '#1f2937',
                fontWeight: '500',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
            >
              Occupations
            </button> */}
            {/* <button
              onClick={() => setDataType('majors')}
              style={{
                flex: 1,
                padding: '10px',
                borderRadius: '6px',
                border: 'none',
                backgroundColor: dataType === 'majors' ? '#3b82f6' : '#e5e7eb',
                color: dataType === 'majors' ? 'white' : '#1f2937',
                fontWeight: '500',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
            >
              College Majors
            </button> */}
          {/* </div>
        </div> */}
        
        {/* AI Impact Type Section
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
            color: '#444'
          }}>
            AI Impact Type
          </label>
          <div style={{display: 'flex', gap: '10px'}}>
            <button
              onClick={() => setExposureType('negative')}
              style={{
                flex: 1,
                padding: '10px',
                borderRadius: '6px',
                border: 'none',
                backgroundColor: exposureType === 'negative' ? '#ef4444' : '#e5e7eb',
                color: exposureType === 'negative' ? 'white' : '#1f2937',
                fontWeight: '500',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
            >
              Negatively Affected
            </button>
            <button
              onClick={() => setExposureType('positive')}
              style={{
                flex: 1,
                padding: '10px',
                borderRadius: '6px',
                border: 'none',
                backgroundColor: exposureType === 'positive' ? '#10b981' : '#e5e7eb',
                color: exposureType === 'positive' ? 'white' : '#1f2937',
                fontWeight: '500',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
            >
              Positively Affected
            </button>
          </div>
        </div> */}
        
        {/* Sort By Section */}
        {/* <div style={{
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
            color: '#444'
          }}>
            Sort By
          </label>
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            style={{
              width: '100%',
              padding: '10px',
              borderRadius: '6px',
              border: '1px solid #d1d5db',
              outline: 'none',
              cursor: 'pointer'
            }}
          >
            <option value="default">Default Order</option>
            <option value="alphabetical">Alphabetical (A-Z)</option>
            <option value="lowest">Most Negative Exposure First</option>
            <option value="highest">Most Positive Exposure First</option>
          </select>
        </div> */}
        
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
            color: '#444'
          }}>
            Search
          </label>
          <div style={{position: 'relative'}}>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder={`Search ${dataType}...`}
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
        </div>
      </div>
      
      {/* Filter Section
      {dataType === 'majors' && (
        <div style={{
          marginBottom: '20px',
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
            color: '#444'
          }}>
            Filter by College
          </label>
          <div style={{display: 'flex', flexWrap: 'wrap', gap: '10px'}}>
            <button
              // onClick={() => setFieldFilter('all')}
              onClick={() => setMajorFilter('all')}
              style={{
                padding: '8px 12px',
                borderRadius: '20px',
                border: 'none',
                // backgroundColor: fieldFilter === 'all' ? '#4b5563' : '#e5e7eb',
                // color: fieldFilter === 'all' ? 'white' : '#1f2937',
                backgroundColor: majorFilter === 'all' ? '#4b5563' : '#e5e7eb',
                color: majorFilter === 'all' ? 'white' : '#1f2937',
                fontWeight: '500',
                cursor: 'pointer',
                fontSize: '13px'
              }}
            >
              All Colleges
            </button>
            {Object.keys(majors_match_colleges).map(field => (
              <button
                key={field}
                // onClick={() => setFieldFilter(field)}
                onClick={() => setMajorFilter(field)}
                style={{
                  padding: '8px 12px',
                  borderRadius: '20px',
                  border: 'none',
                  // backgroundColor: fieldFilter === field ? '#4b5563' : '#e5e7eb',
                  // color: fieldFilter === field ? 'white' : '#1f2937',
                  backgroundColor: majorFilter === field ? '#4b5563' : '#e5e7eb',
                  color: majorFilter === field ? 'white' : '#1f2937',
                  fontWeight: '500',
                  cursor: 'pointer',
                  fontSize: '13px'
                }}
              >
                {field}
              </button>
            ))}
          </div>
        </div>
      )}
      {dataType === 'occupations' && (
        <div style={{
          marginBottom: '20px',
          backgroundColor: 'white',
          padding: '15px',
          borderRadius: '8px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
        }}>
          {/* <label style={{
            display: 'block',
            fontSize: '14px',
            fontWeight: '500',
            marginBottom: '10px',
            color: '#444'
          }}> */}
            {/* Filter by College
          </label>
          <div style={{display: 'flex', flexWrap: 'wrap', gap: '10px'}}>
            <button
              // onClick={() => setFieldFilter('all')}
              onClick={() => setMajorFilter('all')}
              style={{
                padding: '8px 12px',
                borderRadius: '20px',
                border: 'none',
                // backgroundColor: fieldFilter === 'all' ? '#4b5563' : '#e5e7eb',
                // color: fieldFilter === 'all' ? 'white' : '#1f2937',
                backgroundColor: majorFilter === 'all' ? '#4b5563' : '#e5e7eb',
                color: majorFilter === 'all' ? 'white' : '#1f2937',
                fontWeight: '500',
                cursor: 'pointer',
                fontSize: '13px'
              }}
            >
              All Colleges
            </button>
            {Object.keys(majors_match_colleges).map(field => (
              <button
                key={field}
                // onClick={() => setFieldFilter(field)}
                onClick={() => setMajorFilter(field)}
                style={{
                  padding: '8px 12px',
                  borderRadius: '20px',
                  border: 'none',
                  // backgroundColor: fieldFilter === field ? '#4b5563' : '#e5e7eb',
                  // color: fieldFilter === field ? 'white' : '#1f2937',
                  backgroundColor: majorFilter === field ? '#4b5563' : '#e5e7eb',
                  color: majorFilter === field ? 'white' : '#1f2937',
                  fontWeight: '500',
                  cursor: 'pointer',
                  fontSize: '13px'
                }}
              >
                {field}
              </button>
            ))}
          </div> */}
          {/* <label style={{
            display: 'block',
            fontSize: '14px',
            fontWeight: '500',
            marginBottom: '10px',
            color: '#444'
          }}>
            Filter by Major
          </label>
          <div style={{display: 'flex', flexWrap: 'wrap', gap: '10px'}}>
            <button
              // onClick={() => setSectorFilter('all')}
              onClick={() => setOccupationFilter('all')}
              style={{
                padding: '8px 12px',
                borderRadius: '20px',
                border: 'none',
                // backgroundColor: sectorFilter === 'all' ? '#4b5563' : '#e5e7eb',
                // color: sectorFilter === 'all' ? 'white' : '#1f2937',
                backgroundColor: occupationFilter === 'all' ? '#4b5563' : '#e5e7eb',
                color: occupationFilter === 'all' ? 'white' : '#1f2937',
                fontWeight: '500',
                cursor: 'pointer',
                fontSize: '13px'
              }}
            >
              All Majors
            </button>
            {Object.keys(occupations_match_majors).map(sector => (
              <button
                key={sector}
                // onClick={() => setSectorFilter(sector)}
                onClick={() => setOccupationFilter(sector)}
                style={{
                  padding: '8px 12px',
                  borderRadius: '20px',
                  border: 'none',
                  // backgroundColor: sectorFilter === sector ? '#4b5563' : '#e5e7eb',
                  // color: sectorFilter === sector ? 'white' : '#1f2937',
                  backgroundColor: occupationFilter === sector ? '#4b5563' : '#e5e7eb',
                  color: occupationFilter === sector ? 'white' : '#1f2937',
                  fontWeight: '500',
                  cursor: 'pointer',
                  fontSize: '13px'
                }}
              >
                {sector}
              </button>
            ))}
          </div>
        </div>
      )} */}
      
      {/* Comparison toggle
      <div style={{
        marginBottom: '20px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px'
        }}>
          <label style={{fontSize: '14px', fontWeight: '500', color: '#444'}}>
            Compare Mode
          </label>
          <div 
            style={{
              width: '44px',
              height: '24px',
              backgroundColor: compareMode ? '#3b82f6' : '#e5e7eb',
              borderRadius: '12px',
              cursor: 'pointer',
              position: 'relative',
              transition: 'background-color 0.2s ease'
            }}
            onClick={() => {
              const newCompareMode = !compareMode;
              setCompareMode(newCompareMode);
              setComparedItems([]);
              setSelectedItem(null);
            }}
          >
            <div 
              style={{
                width: '18px',
                height: '18px',
                backgroundColor: 'white',
                borderRadius: '50%',
                position: 'absolute',
                left: compareMode ? '22px' : '4px',
                top: '3px',
                transition: 'left 0.2s ease'
              }}
            />
          </div>
        </div>
        
        {compareMode && (
          <div style={{fontSize: '14px', color: '#666'}}>
            Select up to 2 items to compare ({comparedItems.length}/2)
          </div>
        )}
      </div> */}
      
      {/* Main visualization */}
      <div style={{
        backgroundColor: 'white',
        padding: '20px',
        borderRadius: '10px',
        boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
        marginBottom: '20px'
      }}>
        {compareMode && comparedItems.length > 1 ? (
          <div>
            <h3 style={{marginBottom: '15px', fontWeight: 'bold', color: '#333'}}>Comparison View</h3>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'auto 1fr',
              gap: '10px'
            }}>
              <div></div>
              <div style={{
                display: 'grid',
                gridTemplateColumns: `repeat(${comparedItems.length}, 1fr)`,
                gap: '10px',
                textAlign: 'center',
                fontWeight: 'bold',
                marginBottom: '10px'
              }}>
                {comparedItems.map((item, idx) => (
                  <div key={idx}>{item.name}</div>
                ))}
              </div>
              
              <div style={{fontWeight: '500', color: 'black'}}>Effect</div>
              <div style={{
                display: 'grid',
                gridTemplateColumns: `repeat(${comparedItems.length}, 1fr)`,
                gap: '10px'
              }}>
                {comparedItems.map((item, idx) => (
                  <div 
                    key={idx}
                    style={{
                      height: '30px',
                      backgroundColor: '#f3f4f6',
                      borderRadius: '4px',
                      overflow: 'hidden'
                    }}
                  >
                    <div
                      style={{
                        height: '100%',
                        width: `100%`,
                        backgroundColor: getColor(item.exposure),
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: item.exposure > 50 ? 'white' : 'black',
                        fontWeight: '500'
                      }}
                    >
                      {item.exposure}%
                    </div>
                  </div>
                ))}
              </div>
              
              {/* <div style={{fontWeight: '500', color: '#059669', marginTop: '10px'}}>Positively Affected</div>
              <div style={{
                display: 'grid',
                gridTemplateColumns: `repeat(${comparedItems.length}, 1fr)`,
                gap: '10px'
              }}>
                {comparedItems.map((item, idx) => (
                  <div 
                    key={idx}
                    style={{
                      height: '30px',
                      backgroundColor: '#f3f4f6',
                      borderRadius: '4px',
                      overflow: 'hidden'
                    }}
                  >
                    <div
                      style={{
                        height: '100%',
                        width: `${item.positiveExposure}%`,
                        backgroundColor: getColor(item.positiveExposure, 'positive'),
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: item.positiveExposure > 50 ? 'white' : 'black',
                        fontWeight: '500'
                      }}
                    >
                      {item.positiveExposure}%
                    </div>
                  </div>
                ))}
              </div> */}
              
              <div></div>
              <div style={{
                display: 'grid',
                gridTemplateColumns: `repeat(${comparedItems.length}, 1fr)`,
                gap: '10px',
                marginTop: '10px'
              }}>
                {comparedItems.map((item, idx) => (
                  <button
                    key={idx}
                    onClick={() => setComparedItems(comparedItems.filter(i => i.name !== item.name))}
                    style={{
                      padding: '5px',
                      borderRadius: '4px',
                      border: 'none',
                      backgroundColor: '#fee2e2',
                      color: '#b91c1c',
                      cursor: 'pointer',
                      fontSize: '12px'
                    }}
                  >
                    Remove
                  </button>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '10px'
          }}>
            {data.map((item, index) => {
              const value = item.exposure;
              const isSelected = selectedItem?.name === item.name || comparedItems.find(i => i.name === item.name);
              
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
                    border: isSelected ? '2px solid #3b82f6' : '2px solid transparent',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    backgroundColor: isSelected ? '#f0f9ff' : 'transparent'
                  }}
                >
                  <div style={{ 
                    width: '150px', 
                    overflow: 'hidden', 
                    textOverflow: 'ellipsis', 
                    whiteSpace: 'nowrap',
                    fontWeight: isSelected ? '600' : 'normal',
                    fontSize: '15px'
                  }}>
                    {item.name}
                  </div>
                  <div style={{ 
                    flex: 1, 
                    height: '28px', 
                    backgroundColor: '#f3f4f6', 
                    borderRadius: '6px', 
                    overflow: 'hidden',
                    boxShadow: '0 1px 2px rgba(0,0,0,0.05) inset'
                  }}>
                    <div
                      style={{
                        height: '100%',
                        width: `100%`,
                        backgroundColor: getColor(value),
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'flex-end',
                        paddingRight: '10px',
                        color: value > 50 ? 'white' : 'black',
                        fontWeight: '500',
                        fontSize: '14px',
                        transition: 'width 0.5s ease-out'
                      }}
                    >
                      {value}%
                    </div>
                  </div>
                  
                  {compareMode && (
                    <div style={{
                      width: '24px',
                      height: '24px',
                      borderRadius: '4px',
                      border: '2px solid #3b82f6',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      backgroundColor: isSelected ? '#3b82f6' : 'white',
                      color: isSelected ? 'white' : '#3b82f6',
                      fontWeight: 'bold'
                    }}>
                      {isSelected ? '✓' : ''}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Detail view when an item is selected */}
      {selectedItem && !compareMode && (
        <div style={{
          backgroundColor: 'white',
          padding: '20px',
          borderRadius: '10px',
          boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
          marginBottom: '20px'
        }}>
          {/* <h3 style={{marginBottom: '15px', fontWeight: 'bold', color: '#333'}}>
            {selectedItem.name} Details
          </h3> */}
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '20px',
            marginBottom: '20px'
          }}>
            {/* <div>
              <div style={{marginBottom: '10px', fontWeight: '500', color: 'black'}}>
                Effect
              </div>
              <div style={{height: '28px', backgroundColor: '#f3f4f6', borderRadius: '6px', overflow: 'hidden'}}>
                <div
                  style={{
                    height: '100%',
                    width: `100%`,
                    backgroundColor: getColor(selectedItem.exposure),
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: selectedItem.exposure > 50 ? 'white' : 'black',
                    fontWeight: '500'
                  }}
                >
                  {selectedItem.exposure}%
                </div>
              </div>
            </div> */}
            
            {/* <div>
              <div style={{marginBottom: '10px', fontWeight: '500', color: '#059669'}}>
                Positively Affected
              </div>
              <div style={{height: '28px', backgroundColor: '#f3f4f6', borderRadius: '6px', overflow: 'hidden'}}>
                <div
                  style={{
                    height: '100%',
                    width: `100%`,
                    backgroundColor: getColor(selectedItem.exposure),
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: selectedItem.exposure > 50 ? 'white' : 'black',
                    fontWeight: '500'
                  }}
                >
                  {selectedItem.positiveExposure}%
                </div>
              </div>
            </div> */}
          </div>
          
          {/* {dataType === 'majors' && (
            <div>
              <h4 style={{marginBottom: '10px', fontWeight: 'bold', color: '#555'}}>
                Related Occupations
              </h4>
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '10px'
              }}>
                {getRelatedOccupations(selectedItem.name).map((occ, idx) => (
                  <div key={idx} style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    padding: '10px',
                    backgroundColor: '#f3f4f6',
                    borderRadius: '6px'
                  }}>
                    <div>{occ.name}</div>
                    <div style={{display: 'flex', gap: '15px'}}>
                      <span style={{color: '#dc2626'}}>
                        Negative: {occ.negativeExposure}%
                      </span>
                      <span style={{color: '#059669'}}>
                        Positive: {occ.positiveExposure}%
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )} */}
          
          <div style={{
            marginTop: '20px',
            padding: '15px',
            backgroundColor: '#f0f9ff',
            borderRadius: '6px',
            border: '1px solid #bfdbfe'
          }}>
            <h4 style={{marginBottom: '10px', fontWeight: 'bold', color: '#1e40af'}}>
              AI Impact Analysis
            </h4>
            <p style={{marginBottom: '10px', lineHeight: '1.5', color: '#334155'}}>
              {selectedItem.exposure > 2 ?  
                `${selectedItem.name} shows significant potential (${selectedItem.exposure}%) for generative AI to enhance productivity in this field, creating new opportunities.` :

                selectedItem.exposure > 0 ?  
                `${selectedItem.name} shows moderate potential (${selectedItem.exposure}%) for generative AI to positively enhance work in this field.` :
                selectedItem.exposure < -2 ?
                `${selectedItem.name} shows a high negative impact (${selectedItem.exposure}%), suggesting many tasks in this field could be affected by generative AI.` :
                `${selectedItem.name} shows a moderate negative impact (${selectedItem.exposure}%), with some tasks potentially affected by generative AI.`
              }
            </p>
            <p style={{lineHeight: '1.5', color: '#334155'}}>
                {`The potential affects of genertaive AI on occupations most related to ${selectedItem.name} are shown below.`}
            </p>
            <p style={{lineHeight: '1.5', color: '#334155'}}>
              <ol style={{paddingLeft: '20px', marginBottom: '10px', lineHeight: '1.6', color: '#475569'}}>
                <li><span style={{fontWeight: '600', color: 'black'}}>Occupation 1:</span> -2.1%</li>
                <li><span style={{fontWeight: '600', color: 'black'}}>Occupation 2:</span> 2.7%</li>
                <li><span style={{fontWeight: '600', color: 'black'}}>Occupation 3:</span> -0.68%</li>
              </ol>
            </p>
            <p style={{lineHeight: '1.5', color: '#334155'}}>
                {`The majors most helpful to pursuing a career in ${selectedItem.name} are shown below.`}
            </p>
            <p style={{lineHeight: '1.5', color: '#334155'}}>
              <ol style={{paddingLeft: '20px', marginBottom: '10px', lineHeight: '1.6', color: '#475569'}}>
                <li><span style={{fontWeight: '600', color: 'black'}}>Major 1</span></li>
                <li><span style={{fontWeight: '600', color: 'black'}}>Major 2</span></li>
                <li><span style={{fontWeight: '600', color: 'black'}}>Major 3</span></li>
              </ol>
            </p>

          </div>
        </div>
      )}
      
      <div style={{
        padding: '20px',
        backgroundColor: '#f8fafc',
        borderRadius: '8px',
        border: '1px solid #e2e8f0',
        marginTop: '20px'
      }}>
        <h3 style={{fontWeight: 'bold', marginBottom: '15px', color: '#475569'}}>About This Visualization</h3>
        
        <div style={{marginBottom: '15px'}}>
          <h4 style={{fontWeight: '600', fontSize: '16px', marginBottom: '8px', color: '#334155'}}>What This Shows</h4>
          <p style={{marginBottom: '10px', lineHeight: '1.6', color: '#475569'}}>
            {/* This tool visualizes generatives AI's potential impact on careers and education */}
            This tool visualizes generatives AI's potential impact on occupations
          </p>
          {/* <ul style={{paddingLeft: '20px', marginBottom: '10px', lineHeight: '1.6', color: '#475569'}}>
            <li><span style={{fontWeight: '600', color: '#dc2626'}}>Negatively Affected:</span> An index showing potential negative exposure to AI-related changes.</li>
            <li><span style={{fontWeight: '600', color: '#059669'}}>Positively Affected:</span> An index showing potential positive exposure to AI-related changes.</li>
          </ul> */}
        </div>
        
        <div>
          <h4 style={{fontWeight: '600', fontSize: '16px', marginBottom: '8px', color: '#334155'}}>How To Use This Tool</h4>
          <p style={{marginBottom: '10px', lineHeight: '1.6', color: '#475569'}}>
          {/* <ul style={{paddingLeft: '20px', marginBottom: '10px', lineHeight: '1.6', color: '#475569'}}> */}
            {/* <li>Toggle between <strong>Occupations</strong> and <strong>College Majors</strong> to explore different perspectives</li> */}
            {/* <li>Use <strong>Compare Mode</strong> to directly compare up to 2 items side by side</li> */}
          {/* <p style={{marginBottom: '10px', lineHeight: '1.6', color: '#475569'}}> */}
            Click on any item to view detailed information about the effect, related occupations, and majors that are most helpful when
              pursuing the desired occupation
            {/* <li>For college majors, explore related occupations to understand career path implications</li> */}
          {/* </ul> */}
          </p>
          <p style={{fontSize: '14px', color: '#64748b', marginTop: '15px', fontStyle: 'italic'}}>
            Note: This visualization uses mock data for demonstration purposes.
          </p>
        </div>
      </div>
    </div>
  );
}

export default AIExposureVisualization;