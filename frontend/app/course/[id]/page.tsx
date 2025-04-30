import { Separator } from "@/components/ui/separator";
import { mockData } from "@/constants/common";
import ReactMarkdown from 'react-markdown'
// import remarkGfm from 'remark-gfm'

const Course = () => {
    // TODO: Get the data from Tanstack Query

    return <>
        <div className="text-xl sm:text-2xl font-bold text-primary">
            {mockData.topic}
        </div>
        <Separator className="bg-gradient-to-r from-foreground to-transparent" />
        <ReactMarkdown>{mockData.description}</ReactMarkdown>
    </>;
}

export default Course;