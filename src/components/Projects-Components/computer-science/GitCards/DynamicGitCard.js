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

  const getLanguageClass = (lang) => {
    if (!lang) return 'Languages';
    
    const normalizedLang = lang.toLowerCase();
    switch(normalizedLang) {
      case 'javascript':
      case 'typescript':
      case 'html':
      case 'css':
        return 'Special-JS Languages';
      case 'python':
        return 'Special-Py Languages';
      default:
        return 'Languages';
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
        <a href={Git_Link} target="_blank" rel='noreferrer' className='Git-Card'>

          <div className='Git-Card-FirstSection'>
            <img src={github} className='Git-Img' alt='GitHub Logo' />
            <p className='Git-Name'>{gitName}</p>
          </div>

          <div className='Git-Card-SecondSection'>
            <ul className='Ul'>
              <li className='git-Description'>{description}</li>
            </ul>

            <div className='repo-meta' style={{ marginTop: '0.75rem' }}>
              <div className='Lang-Container' style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '0.5rem' }}>
                {loadingLanguages ? (
                  <p className="Languages" style={{ fontSize: '0.7rem' }}>Loading...</p>
                ) : allLanguages.length > 0 ? (
                  allLanguages.slice(0, 3).map((lang, index) => (
                    <p key={index} className={getLanguageClass(lang)} style={{ margin: 0, fontSize: '0.7rem', padding: '0.2rem 0.5rem' }}>
                      {lang}
                    </p>
                  ))
                ) : (
                  <p className={getLanguageClass(language)}>{language || 'Unknown'}</p>
                )}
                {allLanguages.length > 3 && (
                  <p className="Languages" style={{ margin: 0, fontSize: '0.7rem', padding: '0.2rem 0.5rem' }}>
                    +{allLanguages.length - 3}
                  </p>
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