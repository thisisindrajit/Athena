import { ArrowRight } from "lucide-react";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";

const CourseCard = () => {
    return <div className="p-4 rounded-lg border border-foreground/25 dark:bg-foreground/5 flex flex-col gap-2 shadow-lg">
        {/* Title */}
        <div className="text-lg font-bold">Course Title</div>
        <Separator className="bg-gradient-to-r from-primary to-transparent" />
        {/* Description */}
        <div className="text-base/loose text-justify text-muted-foreground">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod
            tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
            veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip exea
            commodo consequat. Duis aute irure dolor in reprehenderit in voluptate.
        </div>
        {/* Course details, Preferences and View course button */}
        <div className="flex flex-col gap-3">
            <div className="bg-primary/5 text-primary text-sm px-2 py-1 font-medium w-fit">
                3 modules, 10 lessons, 5 activities
            </div>
            <div className="flex gap-2 flex-wrap">
                <div className="border border-foreground/10 py-1 px-2 rounded-md text-sm">Beginner 🌱</div>
                <div className="border border-foreground/10 py-1 px-2 rounded-md text-sm">Short ⚡</div>
                <div className="border border-foreground/10 py-1 px-2 rounded-md text-sm">Broad 🌍</div>
            </div>
            <Button variant="outline" className="hover:bg-primary hover:text-primary-foreground dark:hover:bg-primary dark:hover:text-primary-foreground w-full lg:w-fit self-end">
                View Course
                <ArrowRight />
            </Button>
        </div>
    </div>;
}

export default CourseCard;