"use client";

import { useQuery } from "@tanstack/react-query";
import Loader from "./Loader";
import Error from "./Error";
import { fetchTrendingSnippets } from "@/queries/fetchTrendingSnippets";
import { FC } from "react";
import { cn } from "@/lib/utils";
import SnippetCard from "../cards/SnippetCard";
import { ISnippet } from "@/interfaces/ISnippet";

interface ITrendingSnippetsProps {
    className?: string;
}

const CTrendingSnippets: FC<ITrendingSnippetsProps> = ({ className }) => {
    const { isPending, isError, data: trendingSnippets, error } = useQuery<ISnippet[]>({
        queryKey: ['trending-snippets'],
        queryFn: async () => await fetchTrendingSnippets()
    });

    if (isPending) {
        return <Loader loadingText="Loading trending snippets" className="my-32" />;
    }

    if (isError) {
        console.log(error);
        return <Error errorText="Error while loading trending snippets!" className="my-32" />;
    }

    return trendingSnippets.length === 0 ? (
        <div className="w-full my-16 text-center">
            No trending snippets found 😭. Please check back later!
        </div>
    ) :
        <div className={cn("grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3 gap-4", className)}>
            {trendingSnippets.map((snippet, index) => (
                <SnippetCard
                    key={index}
                    snippet={snippet}
                />
            ))}
        </div>;
}

export default CTrendingSnippets;