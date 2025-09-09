import { React, useEffect, useState } from 'react'


import PythongitCard from "../computer-science/GitCards/PythongitCard"
import JavaScriptgitCard from '../computer-science/GitCards/JavaScriptgitCard';
import DynamicGitCard from './GitCards/DynamicGitCard';




import Aos from 'aos';
import "aos/dist/aos.css"

import "../../../CSS/Projects/GithubRep.css"

export default function GithubProjects() {
    const [repositories, setRepositories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        //gobal animation to every single component
        Aos.init({
            duration: 500,
            once: true
        });

        // Fetch pinned repositories using a scraping service
        const fetchPinnedRepositories = async () => {
            try {
                const username = 'nethann';
                
                // Use a GitHub profile scraping service to get pinned repos
                try {
                    const response = await fetch(`https://gh-pinned-repos.egoist.dev/?username=${username}`);
                    
                    if (response.ok) {
                        const pinnedData = await response.json();
                        
                        if (pinnedData && pinnedData.length > 0) {
                            // Fetch additional details for each pinned repo from GitHub API
                            const enrichedRepos = await Promise.all(
                                pinnedData.map(async (repo) => {
                                    try {
                                        const repoResponse = await fetch(`https://api.github.com/repos/${username}/${repo.repo}`);
                                        if (repoResponse.ok) {
                                            const fullRepoData = await repoResponse.json();
                                            return {
                                                id: fullRepoData.id,
                                                name: fullRepoData.name,
                                                description: fullRepoData.description || repo.description,
                                                html_url: fullRepoData.html_url,
                                                stargazers_count: fullRepoData.stargazers_count,
                                                language: fullRepoData.language || repo.language,
                                                languages_url: fullRepoData.languages_url,
                                                updated_at: fullRepoData.updated_at
                                            };
                                        } else {
                                            // Fallback to scraped data only
                                            return {
                                                id: repo.repo,
                                                name: repo.repo,
                                                description: repo.description,
                                                html_url: `https://github.com/${username}/${repo.repo}`,
                                                stargazers_count: 0,
                                                language: repo.language,
                                                languages_url: `https://api.github.com/repos/${username}/${repo.repo}/languages`,
                                                updated_at: new Date().toISOString()
                                            };
                                        }
                                    } catch (error) {
                                        console.warn(`Failed to fetch details for ${repo.repo}:`, error);
                                        return {
                                            id: repo.repo,
                                            name: repo.repo,
                                            description: repo.description,
                                            html_url: `https://github.com/${username}/${repo.repo}`,
                                            stargazers_count: 0,
                                            language: repo.language,
                                            languages_url: `https://api.github.com/repos/${username}/${repo.repo}/languages`,
                                            updated_at: new Date().toISOString()
                                        };
                                    }
                                })
                            );
                            
                            setRepositories(enrichedRepos.filter(repo => repo !== null));
                            setLoading(false);
                            return;
                        }
                    }
                } catch (pinnedError) {
                    console.warn('Pinned repos service failed, trying alternative:', pinnedError);
                }
                
                // Alternative approach: manually specify your actual pinned repositories
                // Update this list with your actual pinned repository names
                const knownPinnedRepos = [
                    "contentGenius",
                    "GPACalc",
                    "GTMovieStore",
                    "betterCanvas",
                    "GTWalkThrough"
                ];
                
                // Handle repositories from different users with manual descriptions as fallback
                const repoDetails = [
                    { 
                        name: "contentGenius", 
                        owner: username,
                        fallbackDescription: "AI-powered content generation tool for creating engaging and high-quality content"
                    },
                    { 
                        name: "GPACalc", 
                        owner: username,
                        fallbackDescription: "Simple and efficient GPA calculator for academic grade tracking"
                    },
                    { 
                        name: "GTMovieStore", 
                        owner: "nakulshah04",
                        fallbackDescription: "GTMovieStore is a web application that allows users to browse, review, and purchase movies with a seamless shopping cart experience"
                    },
                    { 
                        name: "betterCanvas", 
                        owner: username,
                        fallbackDescription: "A simple, interactive Tkinter-based GUI that connects to your Georgia Tech Canvas account and displays all upcoming assignments"
                    },
                    { 
                        name: "GTWalkThrough", 
                        owner: "nakulshah04",
                        fallbackDescription: "GTWalkThrough is a community-powered web app designed to help Georgia Tech students and staff navigate campus more efficiently by avoiding active construction zones"
                    }
                ];

                const pinnedRepoDetails = await Promise.all(
                    repoDetails.map(async ({ name, owner, fallbackDescription }) => {
                        try {
                            const response = await fetch(`https://api.github.com/repos/${owner}/${name}`);
                            if (response.ok) {
                                const repoData = await response.json();
                                console.log(`Fetched ${name}:`, repoData.description || 'Using fallback description');
                                
                                // Use GitHub description if available, otherwise use fallback
                                return {
                                    ...repoData,
                                    description: repoData.description || fallbackDescription
                                };
                            } else {
                                console.warn(`Failed to fetch ${owner}/${name}: ${response.status}`);
                                // Return basic repo info with fallback description if API fails
                                return {
                                    id: `${owner}-${name}`,
                                    name: name,
                                    description: fallbackDescription,
                                    html_url: `https://github.com/${owner}/${name}`,
                                    stargazers_count: 0,
                                    language: 'Unknown',
                                    languages_url: `https://api.github.com/repos/${owner}/${name}/languages`,
                                    updated_at: new Date().toISOString()
                                };
                            }
                        } catch (error) {
                            console.warn(`Error fetching ${owner}/${name}:`, error);
                            // Return basic repo info with fallback description if fetch fails
                            return {
                                id: `${owner}-${name}`,
                                name: name,
                                description: fallbackDescription,
                                html_url: `https://github.com/${owner}/${name}`,
                                stargazers_count: 0,
                                language: 'Unknown',
                                languages_url: `https://api.github.com/repos/${owner}/${name}/languages`,
                                updated_at: new Date().toISOString()
                            };
                        }
                    })
                );
                
                const validRepos = pinnedRepoDetails.filter(repo => repo !== null);
                
                if (validRepos.length > 0) {
                    setRepositories(validRepos);
                } else {
                    // Final fallback to most starred repos
                    const response = await fetch(`https://api.github.com/users/${username}/repos?sort=stars&per_page=6`);
                    const fallbackRepos = await response.json();
                    setRepositories(fallbackRepos.filter(repo => !repo.fork));
                }
                
                setLoading(false);
            } catch (err) {
                console.error('Error fetching pinned repositories:', err);
                setError(err.message);
                setLoading(false);
            }
        };

        fetchPinnedRepositories();
    }, []);

    const getLanguageComponent = (repo) => {
        const language = repo.language?.toLowerCase();
        
        switch(language) {
            case 'javascript':
            case 'typescript':
            case 'html':
            case 'css':
            case 'react':
                return JavaScriptgitCard;
            case 'python':
            default:
                return PythongitCard;
        }
    };

    return (
        <>
            <section className='ios-section' data-aos="fade-right">
                <h2 className='ios-title-medium' style={{textAlign: 'center', marginBottom: '2rem'}}>Pinned Repositories ⭐</h2>

                <div className='ios-grid'>
                    {loading && <p style={{color: 'rgba(255, 255, 255, 0.7)', textAlign: 'center'}}>Loading repositories...</p>}
                    {error && <p style={{color: 'rgba(255, 100, 100, 0.8)', textAlign: 'center'}}>Error loading repositories: {error}</p>}
                    
                    {!loading && !error && repositories.map((repo, index) => {
                        return (
                            <DynamicGitCard
                                key={repo.id}
                                gitName={repo.name}
                                description={repo.description || 'Repository description not available'}
                                Git_Link={repo.html_url}
                                language={repo.language}
                                stars={repo.stargazers_count}
                                lastUpdated={repo.updated_at}
                                languagesUrl={repo.languages_url}
                            />
                        );
                    })}
                </div>
            </section>
        </>
    )
}
