import React, { useEffect, useState } from "react";
import "../../../CSS/Projects/ComputerScience/ContributionCalendar.css";

export default function ContributionCalendar() {
  const [contributionData, setContributionData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const getColor = (level) => {
    // GitHub's actual color scheme based on contribution levels
    switch(level) {
      case 0: return "#161b22";  // No contributions
      case 1: return "#0e4429";  // Low contributions  
      case 2: return "#006d32";  // Medium-low contributions
      case 3: return "#26a641";  // Medium-high contributions
      case 4: return "#39d353";  // High contributions
      default: return "#161b22";
    }
  };

  useEffect(() => {
    const fetchRealContributions = async () => {
      const username = 'nethann';
      
      try {
        // Use GitHub's scraping API for real contribution data (2025 specific)
        const response = await fetch(`https://github-contributions-api.jogruber.de/v4/${username}?y=2025`);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('Raw GitHub data received:', data);
        
        // Set the raw data - the API returns properly formatted contribution data
        setContributionData(data);
        setLoading(false);
        
      } catch (err) {
        console.error('Failed to fetch GitHub contributions:', err);
        setError(`Failed to load GitHub contributions: ${err.message}`);
        setLoading(false);
      }
    };

    fetchRealContributions();
  }, []);

  if (loading) return <p className="status-message">Loading GitHub contributions...</p>;
  if (error) return <p className="status-message error">{error}</p>;
  if (!contributionData || !contributionData.contributions) {
    return <p className="status-message error">No contribution data available</p>;
  }

  // Filter contributions to show only the last 365 days ending today
  const today = new Date();
  const oneYearAgo = new Date(today);
  oneYearAgo.setDate(today.getDate() - 364); // 365 days total including today
  
  const contributions = contributionData.contributions.filter(day => {
    const dayDate = new Date(day.date);
    return dayDate >= oneYearAgo && dayDate <= today;
  });
  
  console.log('Today:', today.toISOString().split('T')[0]);
  console.log('Total contributions loaded:', contributionData.contributions.length);
  console.log('Filtered contributions (last 365 days):', contributions.length);
  console.log('Last 5 contributions:', contributions.slice(-5));
  console.log('First contribution date:', contributions[0]?.date);
  console.log('Last contribution date:', contributions[contributions.length - 1]?.date);
  
  // Organize contributions into a proper weekly grid
  const organizeIntoWeeks = () => {
    const weeks = [];
    let currentWeek = [];
    
    contributions.forEach((day, index) => {
      const date = new Date(day.date);
      const dayOfWeek = date.getDay(); // 0 = Sunday, 6 = Saturday
      
      // If this is the first day, pad the beginning of the week if needed
      if (index === 0 && dayOfWeek !== 0) {
        for (let i = 0; i < dayOfWeek; i++) {
          currentWeek.push(null);
        }
      }
      
      currentWeek.push(day);
      
      // If we've filled a week or reached the end
      if (currentWeek.length === 7 || index === contributions.length - 1) {
        // Pad the end of the week if needed
        while (currentWeek.length < 7) {
          currentWeek.push(null);
        }
        weeks.push([...currentWeek]);
        currentWeek = [];
      }
    });
    
    return weeks;
  };
  
  const weeks = organizeIntoWeeks();
  console.log('Organized into', weeks.length, 'weeks');

  return (
    <div className="calendar-scroll-wrapper">
      <div className="contrib-stats" style={{ 
        textAlign: 'center', 
        marginBottom: '1rem', 
        color: 'rgba(255, 255, 255, 0.7)',
        fontSize: '0.9rem'
      }}>
        <strong>{contributionData.total.lastYear}</strong> contributions in the last year
      </div>
      
      <div 
        className="contrib-calendar" 
        style={{ 
          display: 'grid',
          gridTemplateColumns: `repeat(${weeks.length}, 1fr)`,
          gridTemplateRows: 'repeat(7, 1fr)',
          gap: '2px',
          padding: '20px',
          justifyContent: 'center',
          maxWidth: '100%',
          overflowX: 'auto'
        }}
      >
        {weeks.flatMap((week, weekIndex) =>
          week.map((day, dayIndex) => {
            if (!day) {
              return (
                <div 
                  key={`empty-${weekIndex}-${dayIndex}`}
                  style={{ 
                    width: '11px',
                    height: '11px',
                    backgroundColor: 'transparent'
                  }}
                />
              );
            }

            return (
              <div className="tooltip-wrapper" key={day.date}>
                <div
                  className="contrib-day"
                  style={{ 
                    backgroundColor: getColor(day.level),
                    width: '11px',
                    height: '11px',
                    borderRadius: '2px',
                    border: '1px solid rgba(255,255,255,0.1)'
                  }}
                ></div>
                <span className="tooltip-text tooltip-center">
                  <strong>{day.count} contribution{day.count !== 1 ? 's' : ''}</strong> on{" "}
                  {new Date(day.date).toLocaleDateString("en-US", {
                    weekday: 'long',
                    month: 'long', 
                    day: 'numeric',
                    year: 'numeric'
                  })}
                </span>
              </div>
            );
          })
        )}
      </div>
      
      <div className="contrib-legend" style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '0.5rem',
        marginTop: '1rem',
        fontSize: '0.8rem',
        color: 'rgba(255, 255, 255, 0.6)'
      }}>
        <span>Less</span>
        {[0, 1, 2, 3, 4].map(level => (
          <div 
            key={level}
            style={{
              width: '10px',
              height: '10px',
              backgroundColor: getColor(level),
              borderRadius: '2px',
              border: '1px solid rgba(255,255,255,0.1)'
            }}
          />
        ))}
        <span>More</span>
      </div>
    </div>
  );
}
