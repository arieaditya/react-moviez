import React, { useState, useEffect } from 'react';
import queryString from 'query-string';
import { getBrowse } from './../api/APIUtils';
import Loading from './../components/utils/Loading';
import MovieList from '../components/MovieList';
import Pagination from '../components/Pagination';
import AppError from './../components/utils/AppError';
import styled from "styled-components";

const Browse = props => {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    const type = props.match.params.type.replace(/-/g, '_');
    const page = queryString.parse(props.location.search).page || 1;

    const typeFormatted = type.replace(/_/g, ' ');

    const loadData = (type, page) => {
        getBrowse(type, page)
            .then(res => {
                setLoading(true);
                setMovies(res.data);
                setLoading(false);
                setError(false);
            })
            .catch(err => {
                setError(true);
            });
    };

    useEffect(() => {
        loadData(type, page);
        window.scrollTo(0, 0);
    }, [type, page]);

    if (loading) {
        return (
            <div className="wrapper">
                <Loading />
            </div>
        );
    }

    if (error || !movies) {
        return (
            <div className="wrapper">
                <AppError />
            </div>
        );
    }

    const Title = styled.section`
        font-size: 3rem;
        text-transform: capitalize;
        position: relative;
        display: flex;
        align-items: center;
        color: ${props => props.theme.pageBackground};
        margin: 0;
        z-index: 10;
        transition: all 2s ease-in-out;
        &:hover {
            color: $primary-color;
        }

        span {
            margin: -3px 5px 0 0;
            font-size: 3.2rem;
        }
    `;

    return (
        <div className="wrapper">
            <div className="container">
                <div className="content">
                    <div className="heading">
                        <Title>{typeFormatted} Movies</Title>
                        <h2 className="page-desc">
                            Browse thousands of {type.replace(/_/g, ' ')} movies
                            through TMDb API.
                        </h2>
                    </div>
                    <MovieList movies={movies} />
                    <Pagination
                        page={movies.page}
                        totalPages={movies.total_pages}
                    />
                </div>
            </div>
        </div>
    );
};

export default Browse;
