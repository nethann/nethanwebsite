import React, { useState, useEffect } from 'react'

import "../../../../CSS/Projects/GitCard.css"
import github from "../../Icons/github.png"

import Tilt from 'react-parallax-tilt';

export default function DynamicGitCard({ gitName, description, Git_Link, language, stars, lastUpdated, languagesUrl }) {
  const [allLanguages, setAllLanguages] = useState([]);
  const [loadingLanguages, setLoadingLanguages] = useState(true);

  useEffect(() => {
    const fetchLanguages = async () => {
      if (!languagesUrl) {
        setLoadingLanguages(false);
        return;
      }

      try {
        const response = await fetch(languagesUrl);
        if (response.ok) {
          const languagesData = await response.json();
          const languageNames = Object.keys(languagesData);
          setAllLanguages(languageNames);
        }
      } catch (error) {
        console.error('Error fetching languages:', error);
      } finally {
        setLoadingLanguages(false);
      }
    };

    fetchLanguages();
  }, [languagesUrl]);

  const getLanguageStyle = (lang) => {
    if (!lang) return {
      background: 'rgba(255, 255, 255, 0.08)',
      color: 'rgba(255, 255, 255, 0.7)',
      border: '1px solid rgba(255, 255, 255, 0.15)'
    };
    
    const normalizedLang = lang.toLowerCase();
    switch(normalizedLang) {
      case 'javascript':
        return {
          background: 'rgba(241, 196, 15, 0.15)',
          color: 'rgba(241, 196, 15, 0.95)',
          border: '1px solid rgba(241, 196, 15, 0.3)'
        };
      case 'typescript':
        return {
          background: 'rgba(52, 152, 219, 0.15)',
          color: 'rgba(52, 152, 219, 0.95)',
          border: '1px solid rgba(52, 152, 219, 0.3)'
        };
      case 'python':
        return {
          background: 'rgba(52, 168, 83, 0.15)',
          color: 'rgba(52, 168, 83, 0.95)',
          border: '1px solid rgba(52, 168, 83, 0.3)'
        };
      case 'java':
        return {
          background: 'rgba(231, 76, 60, 0.15)',
          color: 'rgba(231, 76, 60, 0.95)',
          border: '1px solid rgba(231, 76, 60, 0.3)'
        };
      case 'html':
        return {
          background: 'rgba(230, 126, 34, 0.15)',
          color: 'rgba(230, 126, 34, 0.95)',
          border: '1px solid rgba(230, 126, 34, 0.3)'
        };
      case 'css':
        return {
          background: 'rgba(155, 89, 182, 0.15)',
          color: 'rgba(155, 89, 182, 0.95)',
          border: '1px solid rgba(155, 89, 182, 0.3)'
        };
      case 'react':
      case 'jsx':
        return {
          background: 'rgba(97, 218, 251, 0.15)',
          color: 'rgba(97, 218, 251, 0.95)',
          border: '1px solid rgba(97, 218, 251, 0.3)'
        };
      case 'c':
      case 'c++':
        return {
          background: 'rgba(149, 165, 166, 0.15)',
          color: 'rgba(149, 165, 166, 0.95)',
          border: '1px solid rgba(149, 165, 166, 0.3)'
        };
      case 'php':
        return {
          background: 'rgba(142, 68, 173, 0.15)',
          color: 'rgba(142, 68, 173, 0.95)',
          border: '1px solid rgba(142, 68, 173, 0.3)'
        };
      case 'go':
        return {
          background: 'rgba(29, 233, 182, 0.15)',
          color: 'rgba(29, 233, 182, 0.95)',
          border: '1px solid rgba(29, 233, 182, 0.3)'
        };
      case 'rust':
        return {
          background: 'rgba(206, 84, 57, 0.15)',
          color: 'rgba(206, 84, 57, 0.95)',
          border: '1px solid rgba(206, 84, 57, 0.3)'
        };
      case 'swift':
        return {
          background: 'rgba(255, 149, 0, 0.15)',
          color: 'rgba(255, 149, 0, 0.95)',
          border: '1px solid rgba(255, 149, 0, 0.3)'
        };
      case 'kotlin':
        return {
          background: 'rgba(126, 87, 194, 0.15)',
          color: 'rgba(126, 87, 194, 0.95)',
          border: '1px solid rgba(126, 87, 194, 0.3)'
        };
      case 'dart':
        return {
          background: 'rgba(66, 165, 245, 0.15)',
          color: 'rgba(66, 165, 245, 0.95)',
          border: '1px solid rgba(66, 165, 245, 0.3)'
        };
      case 'shell':
      case 'bash':
        return {
          background: 'rgba(76, 175, 80, 0.15)',
          color: 'rgba(76, 175, 80, 0.95)',
          border: '1px solid rgba(76, 175, 80, 0.3)'
        };
      default:
        return {
          background: 'rgba(255, 255, 255, 0.08)',
          color: 'rgba(255, 255, 255, 0.8)',
          border: '1px solid rgba(255, 255, 255, 0.15)'
        };
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return 'Updated yesterday';
    if (diffDays < 30) return `Updated ${diffDays} days ago`;
    if (diffDays < 365) return `Updated ${Math.floor(diffDays / 30)} months ago`;
    return `Updated ${Math.floor(diffDays / 365)} years ago`;
  };

  return (
    <Tilt glareEnable={true} glareMaxOpacity={0.3} glareColor="#ffffff" glarePosition="bottom" glareBorderRadius='8px' tiltMaxAngleX={2} tiltMaxAngleY={2}>
      <div className='gitcard-holder'>
        <a href={Git_Link} target="_blank" rel='noreferrer' className='Git-Card glass glass-subtle'>

          <div className='Git-Card-FirstSection'>
            <img src={github} className='Git-Img' alt='GitHub Logo' />
            <p className='Git-Name'>{gitName}</p>
          </div>

          <div className='Git-Card-SecondSection'>
            <ul className='Ul'>
              <li className='git-Description'>{description}</li>
            </ul>

            <div className='repo-meta' style={{ marginTop: '0.75rem' }}>
              <div className='Lang-Container' style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginBottom: '0.5rem' }}>
                {loadingLanguages ? (
                  <div style={{
                    fontSize: '0.75rem',
                    padding: '0.25rem 0.6rem',
                    borderRadius: '12px',
                    background: 'rgba(255, 255, 255, 0.08)',
                    color: 'rgba(255, 255, 255, 0.7)',
                    border: '1px solid rgba(255, 255, 255, 0.15)'
                  }}>
                    Loading...
                  </div>
                ) : allLanguages.length > 0 ? (
                  allLanguages.slice(0, 3).map((lang, index) => {
                    const langStyle = getLanguageStyle(lang);
                    return (
                      <div 
                        key={index} 
                        style={{
                          margin: 0,
                          fontSize: '0.75rem',
                          fontWeight: '500',
                          padding: '0.25rem 0.6rem',
                          borderRadius: '12px',
                          ...langStyle
                        }}
                      >
                        {lang}
                      </div>
                    );
                  })
                ) : (
                  <div style={{
                    fontSize: '0.75rem',
                    fontWeight: '500', 
                    padding: '0.25rem 0.6rem',
                    borderRadius: '12px',
                    ...getLanguageStyle(language)
                  }}>
                    {language || 'Unknown'}
                  </div>
                )}
                {allLanguages.length > 3 && (
                  <div style={{
                    margin: 0,
                    fontSize: '0.75rem',
                    fontWeight: '500',
                    padding: '0.25rem 0.6rem',
                    borderRadius: '12px',
                    background: 'rgba(255, 255, 255, 0.08)',
                    color: 'rgba(255, 255, 255, 0.7)',
                    border: '1px solid rgba(255, 255, 255, 0.15)'
                  }}>
                    +{allLanguages.length - 3}
                  </div>
                )}
              </div>
              
              {stars > 0 && (
                <div style={{ fontSize: '0.75rem', color: 'rgba(255, 255, 255, 0.6)', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                  <span>⭐</span>
                  <span>{stars}</span>
                </div>
              )}
            </div>

            {lastUpdated && (
              <div style={{ fontSize: '0.7rem', color: 'rgba(255, 255, 255, 0.5)', marginTop: '0.5rem' }}>
                {formatDate(lastUpdated)}
              </div>
            )}
          </div>

        </a>
      </div>
    </Tilt>
  )
}