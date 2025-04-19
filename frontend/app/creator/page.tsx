/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useEffect, useState } from 'react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import Head from 'next/head';
import { Loader2, BarChart2, ArrowRight } from 'lucide-react';
import Link from 'next/link';

interface GithubProfile {
    login: string;
    avatar_url: string;
    bio?: string;
    name: string;
    public_repos?: number;
    followers?: number;
    html_url: string;
    company?: string;
    blog?: string;
    location?: string;
    email?: string;
}

const fallbackProfiles: Record<string, GithubProfile> = {
    "SayanDas07": {
        login: "SayanDas07",
        avatar_url: "/images/sayan-das.jpeg",
        bio: "Lead Developer and Creator of EV Registrations Analysis. Data Analyst and Full Stack Web Developer.",
        name: "Sayan Das",
        html_url: "https://github.com/SayanDas07",
        location: "Kolkata, India"
    }
};

const GithubCreator: React.FC<{
    username: string;
    linkedinUrl?: string;
}> = ({
    username,
    linkedinUrl
}) => {
        const [profileData, setProfileData] = useState<GithubProfile | null>(null);
        const [loading, setLoading] = useState(true);
        const [error, setError] = useState<string | null>(null);
        const [usingFallback, setUsingFallback] = useState(false);

        useEffect(() => {
            const fetchGithubData = async () => {
                try {
                    setLoading(true);

                    const profileResponse = await fetch(`https://api.github.com/users/${username}`);

                    if (profileResponse.status === 403) {
                        console.warn("GitHub API rate limit likely exceeded, using fallback data");

                        if (fallbackProfiles[username]) {
                            setProfileData(fallbackProfiles[username]);
                            setUsingFallback(true);
                        } else {
                            throw new Error(`Rate limit exceeded and no fallback data for ${username}`);
                        }
                    } else if (!profileResponse.ok) {
                        throw new Error(`Failed to fetch GitHub profile for ${username}`);
                    } else {
                        const fetchedProfileData: GithubProfile = await profileResponse.json();
                        setProfileData(fetchedProfileData);
                        setUsingFallback(false);
                    }

                    setLoading(false);
                } catch (error) {
                    console.error(`Error fetching data for ${username}:`, error);

                    if (fallbackProfiles[username]) {
                        console.log(`Using fallback data for ${username}`);
                        setProfileData(fallbackProfiles[username]);
                        setUsingFallback(true);
                        setError(null);
                    } else {
                        setError(`Failed to load GitHub profile for ${username}`);
                    }

                    setLoading(false);
                }
            };

            fetchGithubData();
        }, [username]);

        if (loading) {
            return (
                <div className="flex flex-col items-center justify-center bg-gray-800/50 rounded-lg p-12 backdrop-blur-sm border border-gray-700 shadow-lg">
                    <Loader2 className="h-12 w-12 animate-spin text-blue-400 mb-4" />
                    <p className="text-gray-300">Loading GitHub profile...</p>
                </div>
            );
        }

        if (error || !profileData) {
            return (
                <div className="bg-red-900/30 border border-red-700 text-red-200 p-6 rounded-lg shadow-lg">
                    <p>{error || "Failed to load GitHub profile"}</p>
                    <a
                        href={`https://github.com/${username}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block mt-4 text-white bg-red-700/50 hover:bg-red-700 px-4 py-2 rounded-md transition-colors"
                    >
                        Visit GitHub profile directly
                    </a>
                </div>
            );
        }

        return (
            <div className="flex flex-col bg-gradient-to-br from-gray-800/70 to-gray-900/90 rounded-xl p-8 backdrop-blur-sm border border-gray-700 hover:border-blue-500 transition-all duration-300 shadow-xl">
                {usingFallback && (
                    <div className="mb-4 text-amber-400 text-sm bg-amber-900/20 border border-amber-700/30 rounded p-2">
                        Note: Using cached profile data due to GitHub API limits. Data may not be current.
                    </div>
                )}
                <div className="flex flex-col md:flex-row items-center mb-6">
                    <div className="w-36 h-36 md:w-48 md:h-48 relative rounded-full overflow-hidden border-4 border-blue-600/30 mb-4 md:mb-0 md:mr-8 shadow-lg shadow-blue-500/10">
                        {profileData.avatar_url && (
                            <img
                                src={profileData.avatar_url}
                                alt={profileData.name || username}
                                className="w-full h-full object-cover"
                            />
                        )}
                    </div>
                    <div className="flex-1">
                        <h3 className="text-2xl font-bold text-white mb-1">{profileData.name || username}</h3>
                        <p className="text-blue-400 text-lg mb-2">@{profileData.login}</p>

                        {profileData.bio && (
                            <p className="text-gray-300 mb-4 leading-relaxed">{profileData.bio}</p>
                        )}

                        <div className="flex flex-wrap gap-3 mb-4">
                            {profileData.location && (
                                <span className="text-sm bg-gray-700/60 px-3 py-1.5 rounded-full text-gray-300 border border-gray-600">
                                    📍 {profileData.location}
                                </span>
                            )}
                            {profileData.company && (
                                <span className="text-sm bg-gray-700/60 px-3 py-1.5 rounded-full text-gray-300 border border-gray-600">
                                    🏢 {profileData.company}
                                </span>
                            )}
                            {profileData.blog && (
                                <a
                                    href={profileData.blog.startsWith('http') ? profileData.blog : `https://${profileData.blog}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-sm bg-gray-700/60 px-3 py-1.5 rounded-full text-blue-300 hover:text-blue-200 border border-gray-600"
                                >
                                    🔗 {profileData.blog.replace(/^https?:\/\//, '')}
                                </a>
                            )}
                        </div>

                        <div className="flex space-x-4">
                            <a
                                href={profileData.html_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white transition-colors duration-200 px-4 py-2 rounded-md border border-gray-700"
                            >
                                <FaGithub className="mr-2 text-xl" />
                                <span>GitHub</span>
                            </a>
                            {linkedinUrl && (
                                <a
                                    href={linkedinUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white transition-colors duration-200 px-4 py-2 rounded-md border border-gray-700"
                                >
                                    <FaLinkedin className="mr-2 text-xl" />
                                    <span>LinkedIn</span>
                                </a>
                            )}
                        </div>

                        {(profileData.public_repos !== undefined || profileData.followers !== undefined) && (
                            <div className="mt-6 flex space-x-6">
                                {profileData.public_repos !== undefined && (
                                    <div className="text-gray-300 bg-gray-800/60 px-4 py-2 rounded-lg border border-gray-700">
                                        <span className="font-bold text-blue-400">{profileData.public_repos}</span> repositories
                                    </div>
                                )}
                                {profileData.followers !== undefined && (
                                    <div className="text-gray-300 bg-gray-800/60 px-4 py-2 rounded-lg border border-gray-700">
                                        <span className="font-bold text-blue-400">{profileData.followers}</span> followers
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        );
    };

const CreatorsPage: React.FC = () => {
    const githubUsernames = [
        {
            username: "SayanDas07",
            linkedin: "https://www.linkedin.com/in/sayan-das-643a85252/"
        }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-850 to-gray-800">
            <nav className="px-6 py-4 flex justify-between items-center border-b border-gray-700 backdrop-blur-sm bg-gray-900/80 sticky top-0 z-10">
                <div className="flex items-center gap-2">
                    <div className="bg-blue-600 rounded-full p-1.5 shadow-lg shadow-blue-500/20">
                        <BarChart2 size={20} />
                    </div>
                    <Link href="/" className="font-bold text-xl tracking-tight text-white">
                        EV Registrations Analysis
                    </Link>
                </div>
                <div className="hidden md:flex items-center gap-6">
                    <Link href="/dashboard" className="text-gray-300 hover:text-white transition-colors font-medium">Dashboard</Link>
                    <Link
                        href="/"
                        className="bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white rounded-md px-4 py-2 transition-all duration-300 font-medium shadow-md hover:shadow-lg shadow-blue-700/20"
                    >
                        Home
                    </Link>
                </div>
            </nav>

            <div className="py-16 px-4 sm:px-6 lg:px-8">
                <Head>
                    <title>EV Registrations Analysis - Creator</title>
                    <meta name="description" content="Meet the creators of EV Registrations Analysis - a platform for visualizing and analyzing electric vehicle data" />
                </Head>

                <div className="max-w-5xl mx-auto">
                    <div className="text-center mb-16">
                        <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-teal-400">
                            Meet The Creator
                        </h1>

                        <div className="mt-8 w-24 h-1 bg-gradient-to-r from-blue-500 to-teal-500 mx-auto rounded-full"></div>
                    </div>

                    <div className="space-y-12">
                        {githubUsernames.map((item) => (
                            <GithubCreator
                                key={item.username}
                                username={item.username}
                                linkedinUrl={item.linkedin}
                            />
                        ))}
                    </div>

                </div>
            </div>

            <footer className="px-6 py-8 border-t border-gray-800 bg-gray-900/50 backdrop-blur-sm">
                <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center">
                    <div className="mb-4 md:mb-0">
                        <p className="text-sm text-gray-400 mt-2">© {new Date().getFullYear()} • All rights reserved</p>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="text-gray-400">Created by</span>
                        <Link
                            href="https://github.com/SayanDas07"
                            className="text-blue-400 hover:text-blue-300 flex items-center gap-1 transition-colors group"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <span>Sayan Das</span>
                            <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
                        </Link>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default CreatorsPage;