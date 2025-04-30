"use client";

import { useQuery } from "@tanstack/react-query";
import { FC } from "react";
import Loader from "../common/Loader";
import Error from "../common/Error";
import ModuleCard from "../cards/ModuleCard";
import { IModule } from "@/interfaces/IModule";
import { fetchUserModules } from "@/queries/fetchUserModules";

interface ICUserModulesProps {
    userId: string;
}

const CUserModules: FC<ICUserModulesProps> = ({ userId }) => {
    const { isPending, isError, data: userModules, error } = useQuery<IModule[]>({
        queryKey: ['user-Modules', userId],
        queryFn: async () => await fetchUserModules(userId),
    });

    if (isPending) {
        return <Loader loadingText="Loading user modules" className="my-32" />;
    }

    if (isError) {
        console.log(error);
        return <Error errorText="Error while loading user modules!" className="my-32" />;
    }

    return userModules.length === 0 ? (
        <div className="w-full my-16 text-center">
            No modules found 😭. Please check back later!
        </div>
    ) :
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3 gap-4">
            {userModules.map((module, index) => (
                <ModuleCard
                    key={index}
                    module={module}
                />
            ))}
        </div>;
}

export default CUserModules;