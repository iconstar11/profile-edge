import './Jobs.css';
import React, { useState, useEffect } from 'react';
import mockJobs from './mockJobs.json'


// Mock job data with email included


const JobCard = ({ job, onApply, onSave, saved }) => {
  const getJobTypeColor = (type) => {
    switch (type) {
      case 'Full-time': return 'job-type-fulltime';
      case 'Part-time': return 'job-type-parttime';
      case 'Internship': return 'job-type-internship';
      case 'Contract': return 'job-type-contract';
      default: return 'job-type-default';
    }
  };

  const getRemoteColor = (remote) => {
    switch (remote) {
      case 'Remote': return 'remote-remote';
      case 'Hybrid': return 'remote-hybrid';
      case 'On-site': return 'remote-onsite';
      default: return 'remote-default';
    }
  };

  return (
    <div className="job-card">
      <div className="job-card-header">
        <div className="job-card-company">
          <img 
            src={job.logo} 
            alt={job.company} 
            className="company-logo"
          />
          <div className="job-card-info">
            <h3 className="job-title">{job.title}</h3>
            <p className="company-name">
              <span className="icon-building"></span>
              {job.company}
            </p>
          </div>
        </div>
        <div className="job-card-actions">
          {job.matchScore && (
            <div className={`match-score ${job.matchScore >= 80 ? 'high-match' : job.matchScore >= 60 ? 'medium-match' : 'low-match'}`}>
              <span className="icon-star"></span>
              {job.matchScore}%
            </div>
          )}
          <button 
            onClick={() => onSave(job.id)}
            className="bookmark-button"
            aria-label={saved ? "Unsave job" : "Save job"}
          >
            {saved ? (
              <span className="icon-bookmark-filled"></span>
            ) : (
              <span className="icon-bookmark"></span>
            )}
          </button>
        </div>
      </div>
      
      <div className="job-location">
        <span className="icon-map"></span>
        {job.location}
      </div>
      
      <div className="job-posted">
        <span className="icon-clock"></span>
        {job.posted}
      </div>
      
      <div className="job-tags">
        <span className={`job-tag ${getJobTypeColor(job.type)}`}>
          {job.type}
        </span>
        <span className={`job-tag ${getRemoteColor(job.remote)}`}>
          {job.remote}
        </span>
      </div>
      
      <div className="job-card-buttons">
        <button 
          onClick={() => onApply(job.id)}
          className="btn-primary btn-apply"
        >
          <span className="icon-file"></span>
          Apply Now
        </button>
        <button className="btn-secondary btn-view">
          <span className="icon-external"></span>
          View
        </button>
      </div>
    </div>
  );
};

const Filters = ({ filters, onFilterChange }) => {
  const jobTypes = ['Full-time', 'Part-time', 'Internship', 'Contract'];
  const experienceLevels = ['Entry', 'Mid', 'Senior'];
  const remoteOptions = ['Remote', 'Hybrid', 'On-site'];

  return (
    <div className="filters-card">
      <h3 className="filters-title">Filters</h3>
      
      <div className="filters-group">
        <label className="filters-label">Job Type</label>
        <div className="filters-buttons">
          {jobTypes.map(type => (
            <button
              key={type}
              onClick={() => onFilterChange('jobType', type)}
              className={`filter-btn ${filters.jobType === type ? 'active' : ''}`}
            >
              {type}
            </button>
          ))}
          {filters.jobType && (
            <button
              onClick={() => onFilterChange('jobType', '')}
              className="filter-btn clear-btn"
            >
              Clear
            </button>
          )}
        </div>
      </div>
      
      <div className="filters-group">
        <label className="filters-label">Experience Level</label>
        <div className="filters-buttons">
          {experienceLevels.map(level => (
            <button
              key={level}
              onClick={() => onFilterChange('experience', level)}
              className={`filter-btn ${filters.experience === level ? 'active' : ''}`}
            >
              {level}
            </button>
          ))}
          {filters.experience && (
            <button
              onClick={() => onFilterChange('experience', '')}
              className="filter-btn clear-btn"
            >
              Clear
            </button>
          )}
        </div>
      </div>
      
      <div className="filters-group">
        <label className="filters-label">Work Type</label>
        <div className="filters-buttons">
          {remoteOptions.map(option => (
            <button
              key={option}
              onClick={() => onFilterChange('remote', option)}
              className={`filter-btn ${filters.remote === option ? 'active' : ''}`}
            >
              {option}
            </button>
          ))}
          {filters.remote && (
            <button
              onClick={() => onFilterChange('remote', '')}
              className="filter-btn clear-btn"
            >
              Clear
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default function Jobs() {
  const [searchQuery, setSearchQuery] = useState('');
  const [location, setLocation] = useState('');
  const [jobs, setJobs] = useState(mockJobs);
  const [filteredJobs, setFilteredJobs] = useState(mockJobs);
  const [savedJobs, setSavedJobs] = useState(new Set());
  const [appliedJobs, setAppliedJobs] = useState(new Set());
  const [filters, setFilters] = useState({
    jobType: '',
    experience: '',
    remote: ''
  });
  const [activeTab, setActiveTab] = useState('all');

  // Apply filters
  useEffect(() => {
    let filtered = jobs;
    
    if (searchQuery) {
      filtered = filtered.filter(job => 
        job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.company.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    if (location && location.toLowerCase() !== 'remote') {
      filtered = filtered.filter(job => 
        job.location.toLowerCase().includes(location.toLowerCase())
      );
    }
    
    if (filters.jobType) {
      filtered = filtered.filter(job => job.type === filters.jobType);
    }
    
    if (filters.experience) {
      filtered = filtered.filter(job => job.experience === filters.experience);
    }
    
    if (filters.remote) {
      filtered = filtered.filter(job => job.remote === filters.remote);
    }
    
    setFilteredJobs(filtered);
  }, [searchQuery, location, filters, jobs]);

  const handleSearch = (e) => {
    e.preventDefault();
    // Search is handled by useEffect
  };

  const handleApply = (jobId) => {
    setAppliedJobs(prev => new Set([...prev, jobId]));
    alert('Application submitted successfully!');
  };

  const handleSave = (jobId) => {
    setSavedJobs(prev => {
      const newSet = new Set(prev);
      if (newSet.has(jobId)) {
        newSet.delete(jobId);
      } else {
        newSet.add(jobId);
      }
      return newSet;
    });
  };

  const getFilteredJobs = () => {
    if (activeTab === 'saved') {
      return filteredJobs.filter(job => savedJobs.has(job.id));
    } else if (activeTab === 'applied') {
      return filteredJobs.filter(job => appliedJobs.has(job.id));
    }
    return filteredJobs;
  };

  return (
    <div className="jobs-page">
      {/* Header */}
      <header className="jobs-header">
        <div className="container">
          <h1>Find Your Perfect Job</h1>
          <p className="header-subtitle">Search and apply for jobs that match your skills and experience</p>
        </div>
      </header>

      <div className="container">
        {/* Search Bar */}
        <form onSubmit={handleSearch} className="search-form">
          <div className="search-container">
            <div className="search-input-group">
              <span className="search-icon icon-search"></span>
              <input
                type="text"
                placeholder="Job title, keywords, or company"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="search-input"
              />
            </div>
            
            <div className="search-input-group">
              <span className="search-icon icon-map-pin"></span>
              <input
                type="text"
                placeholder="City, state, zip, or remote"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="search-input"
              />
            </div>
            
            <button
              type="submit"
              className="btn-primary search-button"
            >
              <span className="icon-search"></span>
              Search Jobs
            </button>
          </div>
        </form>

        <div className="jobs-layout">
          {/* Filters Sidebar */}
          <div className="filters-sidebar">
            <Filters 
              filters={filters} 
              onFilterChange={(key, value) => setFilters(prev => ({ ...prev, [key]: value }))}
            />
            
            {/* Tabs */}
            <div className="tabs-card">
              <h3 className="tabs-title">Job Status</h3>
              <div className="tabs-list">
                <button
                  onClick={() => setActiveTab('all')}
                  className={`tab-btn ${activeTab === 'all' ? 'active' : ''}`}
                >
                  All Jobs <span className="tab-count">({filteredJobs.length})</span>
                </button>
                <button
                  onClick={() => setActiveTab('saved')}
                  className={`tab-btn ${activeTab === 'saved' ? 'active' : ''}`}
                >
                  Saved Jobs <span className="tab-count">({Array.from(savedJobs).length})</span>
                </button>
                <button
                  onClick={() => setActiveTab('applied')}
                  className={`tab-btn ${activeTab === 'applied' ? 'active' : ''}`}
                >
                  Applied Jobs <span className="tab-count">({Array.from(appliedJobs).length})</span>
                </button>
              </div>
            </div>
          </div>

          {/* Job Results */}
          <div className="jobs-results">
            <div className="jobs-header-section">
              <h2>
                {activeTab === 'all' ? 'All Jobs' : 
                activeTab === 'saved' ? 'Saved Jobs' : 'Applied Jobs'} 
                <span className="jobs-count">({getFilteredJobs().length} jobs)</span>
              </h2>
            </div>

            {getFilteredJobs().length === 0 ? (
              <div className="no-jobs">
                <div className="no-jobs-icon">
                  <span className="icon-search-large"></span>
                </div>
                <h3>No jobs found</h3>
                <p>Try adjusting your search criteria or filters</p>
              </div>
            ) : (
              <div className="jobs-grid">
                {getFilteredJobs().map(job => (
                  <JobCard
                    key={job.id}
                    job={job}
                    onApply={handleApply}
                    onSave={handleSave}
                    saved={savedJobs.has(job.id)}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}