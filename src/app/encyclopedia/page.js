'use client';

import { useState } from 'react';
import CardsContainer from "./cards/cardsContainer";
import Searchbar from './searchbar/searchbar';
import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchMushrooms } from '../utils/queryFunctions/queries';

export default function Encyclopedia() {
    const [search, setSearch] = useState('');

    const query = useInfiniteQuery({
        queryKey: ['mushrooms', search],
        queryFn: ({ pageParam = { term: search, limit: 10, offset: 0 } }) => fetchMushrooms({ pageParam }),
        defaultPageParam: { term: '', limit: 10, offset: 0 },
        getNextPageParam: (lastPage, pages) => {
            const { totalCount, offset, limit } = lastPage.mushrooms.metadata;
            const newOffset = offset + limit;
            return newOffset < totalCount ? { term: search, limit, offset: newOffset } : false;
        },
    });

    return (
        <section id="encyclopedia" className="flex flex-col h-screen z-50 bg-black">
            <div className="w-[100vw] h-16 flex bg-black z-20">
                <Searchbar onSearch={setSearch} />
            </div>
            <CardsContainer query={query} />
        </section>
    );
}