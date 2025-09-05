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

        // Fetch repositories from GitHub API
        const fetchRepositories = async () => {
            try {
                // Fetch from GitHub API - public repositories, sorted by updated date
                const response = await fetch('https://api.github.com/users/nethann/repos?sort=updated&per_page=8&type=all');
                
                if (!response.ok) {
                    throw new Error('Failed to fetch repositories');
                }
                
                const repos = await response.json();
                
                // Filter out forks and select most relevant repos
                const filteredRepos = repos
                    .filter(repo => !repo.fork) // Remove forked repositories
                    .filter(repo => repo.description && repo.description.trim() !== '') // Only repos with descriptions
                    .slice(0, 6); // Limit to 6 most recent
                
                setRepositories(filteredRepos);
                setLoading(false);
            } catch (err) {
                console.error('Error fetching repositories:', err);
                setError(err.message);
                setLoading(false);
            }
        };

        fetchRepositories();
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
            <section className='Git-Container' data-aos="fade-right">
                <p className='Git-Title'>Github Repositories 🍁 : </p>

                <div className='Github-Grid'>
                    {loading && <p style={{color: 'rgba(255, 255, 255, 0.7)', textAlign: 'center'}}>Loading repositories...</p>}
                    {error && <p style={{color: 'rgba(255, 100, 100, 0.8)', textAlign: 'center'}}>Error loading repositories: {error}</p>}
                    
                    {!loading && !error && repositories.map((repo, index) => {
                        return (
                            <DynamicGitCard
                                key={repo.id}
                                gitName={repo.name}
                                description={repo.description || 'No description available'}
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
