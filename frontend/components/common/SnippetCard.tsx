import { Separator } from "@/components/ui/separator";

const SnippetCard = () => {
  return (
    <div className="p-4 rounded-lg border border-foreground/25 dark:bg-foreground/5 flex flex-col gap-2 shadow-lg">
      {/* Title */}
      <div className="text-lg font-bold">Snippet Title</div>
      <Separator className="bg-gradient-to-r from-primary to-transparent" />
      {/* Description */}
      <div className="text-base/loose text-justify text-muted-foreground">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip exea
        commodo consequat. Duis aute irure dolor in reprehenderit in voluptate.
      </div>
      {/* Did you know */}
      <div className="text-sm/loose text-justify bg-secondary/10 dark:bg-foreground/10 p-4 rounded-lg flex flex-col gap-2">
        <div className="font-bold uppercase w-fit bg-secondary px-2 text-secondary-foreground">
          Did you know!
        </div>
        <div className="text-sm/loose text-justify">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </div>
      </div>
    </div>
  );
};

export default SnippetCard;
