"use client";

import { useQuery } from "@tanstack/react-query";
import { FC } from "react";
import Loader from "../common/Loader";
import Error from "../common/Error";
import SnippetCard from "../cards/SnippetCard";
import { ISnippet } from "@/interfaces/ISnippet";
import { fetchUserSnippets } from "@/queries/fetchUserSnippets";

interface ICUserSnippetsProps {
    userId: string;
}

const CUserSnippets: FC<ICUserSnippetsProps> = ({ userId }) => {
    const { isPending, isError, data: userSnippets, error } = useQuery<ISnippet[]>({
        queryKey: ['user-snippets', userId],
        queryFn: async () => await fetchUserSnippets(userId),
    });

    if (isPending) {
        return <Loader loadingText="Loading user snippets" className="my-32" />;
    }

    if (isError) {
        console.log(error);
        return <Error errorText="Error while loading user snippets!" className="my-32" />;
    }

    return userSnippets.length === 0 ? (
        <div className="w-full my-16 text-center">
            No snippets found 😭. Please check back later!
        </div>
    ) :
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3 gap-4">
            {userSnippets.map((snippet, index) => (
                <SnippetCard
                    key={index}
                    snippet={snippet}
                />
            ))}
        </div>;
}

export default CUserSnippets;