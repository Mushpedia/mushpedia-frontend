import { motion } from "framer-motion";

export default function Suggestions({ searchbarState, data, handleSubmit }) {
    const { query, setQuery, viewSugg } = searchbarState;

    if (!viewSugg || !data || !query) return null;

    return (
        <div
            className="bg-custom_orange mt-2 rounded-xl"
        >
            {data.map((suggestion, index) => (
                <div
                    className={`pl-5 text-black ${index != 0 && "border-t-2"} border-black cursor-pointer`}
                    onClick={(e) => {
                        setQuery(suggestion.complete);
                        handleSubmit(e, suggestion.complete);
                    }}
                    key={suggestion._id}
                >
                    <motion.p
                        whileHover={{
                            scale: 1.3,
                            transition: { duration: 0.2 },
                        }}
                        whileTap={{ scale: 0.9 }}
                        style={{ transformOrigin: 'left center' }}
                    >
                        {suggestion.complete}
                    </motion.p>
                </div>
            ))}
        </div>
    );

}