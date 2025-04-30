import { Separator } from "@/components/ui/separator";
import { PREFERENCES } from "@/constants/common";
import { Button } from "../ui/button";
import { ArrowRight, Bookmark, Share } from "lucide-react";
import { FC } from "react";

interface SnippetCardProps {
  showSaveAndShare?: boolean;
}

const SnippetCard: FC<SnippetCardProps> = ({ showSaveAndShare = false }) => {
  return (
    <div className="p-4 rounded-lg border border-foreground/25 dark:bg-foreground/5 flex flex-col gap-2 shadow-lg">
      {/* Title */}
      <div className="text-lg font-bold">Snippet Title</div>
      <Separator className="bg-gradient-to-r from-primary to-transparent" />
      {/* Description */}
      <div className="text-base/loose text-justify text-muted-foreground line-clamp-6">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip exea
        commodo consequat. Duis aute irure dolor in reprehenderit in voluptate.
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
          Part of course <span className="underline text-primary">Course Title</span>
        </div>
        <div className="flex gap-2 flex-wrap">
          <div className="border border-dashed border-foreground/25 py-1 px-2 rounded-md text-sm">{PREFERENCES["LEVEL"][0]}</div>
          <div className="border border-dashed border-foreground/25 py-1 px-2 rounded-md text-sm">{PREFERENCES["DURATION"][0]}</div>
          <div className="border border-dashed border-foreground/25 py-1 px-2 rounded-md text-sm">{PREFERENCES["FOCUS"][0]}</div>
        </div>
        <div className="flex flex-col lg:flex-row items-center gap-3">
          {/* Save and share icon */}
          {showSaveAndShare && <div className="grid grid-cols-2 w-full lg:w-fit">
            <Button variant="outline"><Bookmark className="h-4 w-4" />Save</Button>
            <Button variant="link"><Share className="h-4 w-4" />Share</Button>
          </div>}
          <Button variant="outline" className="hover:bg-primary hover:text-primary-foreground dark:hover:bg-primary dark:hover:text-primary-foreground w-full lg:w-fit m-auto mr-0">
            View Snippet
            <ArrowRight />
          </Button>
        </div>
      </div>

    </div>
  );
};

export default SnippetCard;
