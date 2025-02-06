// src/components/Quotes.jsx
import React, { useState, useEffect } from 'react';

const Quotes = () => {
    const [quote, setQuote] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const API_URL = 'https://api.api-ninjas.com/v1/quotes';  // External API URL
    const API_KEY = 'v62URsZ9ZNQXp7x5f3qQAUyT2PE8KhRFkCDtXcng';  // Your API Key

    const fetchQuotes = async () => {
        setLoading(true);
        setError('');
        try {
            const response = await fetch(API_URL, {
                method:'GET',
                headers: {
                    'X-Api-Key': API_KEY,  // API Key in headers
                },
            });

            if (!response.ok) {
                throw new Error('Failed to fetch');
            }

            const data = await response.json(); // Parse the response as JSON
            if (data && data.length > 0) {
                setQuote(data[0].quote);  // Assuming the response contains a 'quote' field
            } else {
                setError('No quote found');
            }
        } catch (err) {
            setError('Failed to fetch quote');
            console.error(err);  // Log any errors for debugging
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchQuotes();  // Fetch quote on component mount
    }, []);

    return (
        <div className="quote-container">
            {loading && <p>Loading...</p>}
            {error && <p className="error">{error}</p>}
            {quote && !loading && <blockquote>{quote}</blockquote>}
            <button onClick={fetchQuotes}  disabled={loading}>
                {loading ? 'Loading...' : 'Get New Quote'}
            </button>
        </div>
    );
};

export default Quotes;





