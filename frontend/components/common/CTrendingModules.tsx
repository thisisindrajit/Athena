"use client";

import { useQuery } from "@tanstack/react-query";
import Loader from "./Loader";
import Error from "./Error";
import { fetchTrendingModules } from "@/queries/fetchTrendingModules";
import { FC } from "react";
import { cn } from "@/lib/utils";
import ModuleCard from "../cards/ModuleCard";
import { IModule } from "@/interfaces/IModule";
import { ITEMS_LIMIT } from "@/constants/common";

interface ITrendingModulesProps {
    className?: string;
    setLimit?: boolean
}

const CTrendingModules: FC<ITrendingModulesProps> = ({ className, setLimit = false }) => {
    const { isPending, isError, data: trendingModules, error } = useQuery<IModule[]>({
        queryKey: setLimit ? ['trending-modules', ITEMS_LIMIT] : ['trending-modules'],
        queryFn: setLimit ? async () => await fetchTrendingModules(ITEMS_LIMIT) : async () => await fetchTrendingModules(),
        refetchInterval: 1000 * 60 * 2, // 2 minutes
    });

    if (isPending) {
        return <Loader loadingText="Loading trending modules" className="my-32" />;
    }

    if (isError) {
        console.log(error);
        return <Error errorText="Error while loading trending modules!" className="my-32" />;
    }

    return trendingModules.length === 0 ? (
        <div className="w-full my-16 text-center">
            No trending modules found 😭. Please check back later!
        </div>
    ) :
        <div className={cn("grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3 gap-4", className)}>
            {trendingModules.map((module, index) => (
                <ModuleCard
                    key={index}
                    module={module}
                />
            ))}
        </div>;
}

export default CTrendingModules;