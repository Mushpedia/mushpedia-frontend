import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import stopWords from "./stopWords";
import { fetchSuggestions } from "../../utils/queryFunctions/queries";
import Suggestions from "./suggestions";
import SearchInput from "./searchInput";

export default function Searchbar({ onSearch }) {
    const [viewSugg, setViewSugg] = useState(false);
    const [query, setQuery] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const searchbarState = {
        viewSugg, setViewSugg,
        query, setQuery
    };

    const { data, refetch, } = useQuery({
        queryKey: ['autoComplete'],
        queryFn: () => fetchSuggestions(searchTerm),
        enabled: false
    });

    const handleInputChange = (e) => {
        const newQuery = e.target.value;
        setQuery(newQuery);
        setViewSugg(true);
        console.log(`uri: ${process.env.BACKEND_URI}`);
        if (newQuery.length > 1) {
            const filteredWords = newQuery
                .split(' ')
                .filter((word, index) => index === 0 || !stopWords.includes(word))
                .join(' ');

            if (filteredWords.length < 9) {
                setSearchTerm(filteredWords);
                refetch();
            }
        }
    };

    const handleSubmit = (e, suggestion) => {
        e.preventDefault();
        if (suggestion) {
            // search via autocomplete
            onSearch(suggestion);
        } else {
            // search via enter
            onSearch(query);
        }
        setViewSugg(false);
    };

    return (
        <section className={`px-8 mb-4 mt-[15px] z-20 text-custom_orange font-PT_Serif`}>
            <SearchInput
                searchbarState={searchbarState}
                handleSubmit={handleSubmit}
                handleInputChange={handleInputChange}
            />
            <Suggestions
                searchbarState={searchbarState}
                handleSubmit={handleSubmit}
                data={data}
            />
        </section>
    );
}
