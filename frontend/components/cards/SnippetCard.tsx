import { Separator } from "@/components/ui/separator";
import { PREFERENCES } from "@/constants/common";
import { Button } from "../ui/button";
import { ArrowRight } from "lucide-react";
import { FC } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Link from "next/link";
import { ISnippet } from "@/interfaces/ISnippet";

interface SnippetCardProps {
  snippet: ISnippet;
}

const SnippetCard: FC<SnippetCardProps> = ({ snippet }) => {
  return (
    <div className="p-4 rounded-lg border border-foreground/25 dark:bg-foreground/5 flex flex-col gap-2 shadow-lg">
      {/* Title */}
      <div className="text-lg font-bold line-clamp-1">{snippet.moduleTitle.toLowerCase().includes("module") ? snippet.moduleTitle.split(":")[1].trim() : snippet.moduleTitle}</div>
      <Separator className="bg-gradient-to-r from-primary to-transparent" />
      {/* Description */}
      <div className="text-base/loose text-justify text-muted-foreground line-clamp-6 prose dark:prose-invert min-w-full">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{snippet.moduleDescription}</ReactMarkdown>
      </div>
      {/* Did you know (TODO later) */}
      {/* <div className="text-sm/loose text-justify bg-secondary/10 p-4 rounded-lg flex flex-col gap-2">
        <div className="font-bold uppercase w-fit bg-secondary px-2 text-secondary-foreground">
          Did you know!
        </div>
        <div className="text-sm/loose text-justify">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </div>
      </div> */}
      <Separator />
      {/* Part of course */}
      <div className="flex flex-col gap-3 mt-2">
        <div className="text-sm font-medium w-fit">
          Part of course <span className="underline text-primary">{snippet.courseTopic}</span>
        </div>
        <div className="flex gap-2 flex-wrap">
          <div className="border border-dashed border-foreground/25 py-1 px-2 rounded-md text-sm">{PREFERENCES["LEVEL"].filter((pref) => pref.toLowerCase().includes(snippet.preferences.level.toLowerCase()))}</div>
          <div className="border border-dashed border-foreground/25 py-1 px-2 rounded-md text-sm">{PREFERENCES["DURATION"].filter((pref) => pref.toLowerCase().includes(snippet.preferences.duration.toLowerCase()))}</div>
          <div className="border border-dashed border-foreground/25 py-1 px-2 rounded-md text-sm">{PREFERENCES["FOCUS"].filter((pref) => pref.toLowerCase().includes(snippet.preferences.focus.toLowerCase()))}</div>
        </div>
        <div className="flex flex-col lg:flex-row items-center gap-3">
          {/* TODO: Add save and share snippets */}
          <Link href={`/course/${snippet.courseId}`} className="w-full lg:w-fit m-auto mr-0">
            <Button variant="outline" className="hover:bg-primary hover:text-primary-foreground dark:hover:bg-primary dark:hover:text-primary-foreground">
              View Course
              <ArrowRight />
            </Button>
          </Link>
        </div>
      </div>

    </div>
  );
};

export default SnippetCard;
