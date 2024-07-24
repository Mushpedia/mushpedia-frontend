import { useRef, useMemo, useCallback } from 'react';
import Card from './card';

export default function CardsContainer({ query }) {
    const flatData = useMemo(
        () => (query.data ? query.data.pages.flatMap(page => page.mushrooms.data) : []),
        [query.data]
    );

    const totalCount = query.data?.pages[0]?.mushrooms?.metadata?.totalCount ?? 0;

    const observer = useRef();
    const lastElement = useCallback(
        (element) => {
            if (query.isLoading || flatData.length >= totalCount) return;
            if (observer.current) observer.current.disconnect();
            observer.current = new IntersectionObserver(entries => {
                if (entries[0].isIntersecting && query.hasNextPage && !query.isFetchingNextPage) {
                    query.fetchNextPage();
                }
            });
            if (element) observer.current.observe(element);
        },
        [query, flatData.length, totalCount]
    );

    if (query.isPending) return 'Loading...'

    if (query.error) return 'An error has occurred: ' + query.error?.message;

    return (
        <div
            className="flex-grow w-[99vw] p-8 pt-4 mb-8 grid sm:grid-cols-1 gap-2 md:grid-cols-3 md:gap-4 lg:grid-cols-5 lg:gap-6 overflow-auto scrollbar scrollbar-thumb-custom_orange"
        >
            {flatData.map((mushroom, index) => (
                <li className=''
                    key={mushroom._id}
                    ref={flatData.length === index + 1 ? lastElement : null}
                >
                    <Card data={mushroom} />
                </li>
            ))}
        </div>
    );
}