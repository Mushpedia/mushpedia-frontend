import axios from "axios";

export const fetchSuggestions = async (term) => {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_API}mushroom/search/autocomplete?term=${term}`);

    if (response.status !== 200) {
        throw new Error('Network response was not ok');
    }

    return response.data.mushrooms.data;
};

export const fetchMushrooms = async ({ pageParam = { term: "", limit: 10, offset: 0 } }) => {
    const { term, limit, offset } = pageParam;
    let response
    if (term === '') {
        response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_API}mushrooms?limit=${limit}&offset=${offset}`);
    } else {
        response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_API}mushroom/search?term=${term}&limit=${limit}&offset=${offset}`);
    }

    if (response.status !== 200) {
        throw new Error('Network response was not ok');
    }

    return response.data;
};