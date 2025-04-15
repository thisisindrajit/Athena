import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export default function Home() {
  return (
    <>
      {/* TopBar */}
      <div className="flex items-center justify-between">
        <div className="font-medium uppercase underline underline-offset-4">
          Athena
        </div>
        <div>
          <Button size="sm" className="font-semibold">Login</Button>
        </div>
      </div>
      {/* Motto */}
      <div className="text-2xl/snug xs:text-3xl/snug lg:text-4xl/snug font-bold self-center text-center sm:my-2 lg:my-4">
        <div className="hidden xs:block sm:hidden">
          <div>Where Knowledge is </div>
          <div className="text-primary">Crafted for you.</div>
        </div>
        <div className="block xs:hidden sm:block">
          Where Knowledge is{" "}
          <span className="text-primary">Crafted for You.</span>
        </div>
      </div>
      {/* Trending snippets */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <div className="text-lg md:text-xl min-w-fit">
            <span className="font-bold uppercase">Trending</span> Snippets
          </div>
          <Separator className="shrink-1 bg-gradient-to-r from-primary to-transparent" />
        </div>
        <div className="h-[100vh] w-full flex items-center justify-center bg-foreground/5">
          Content
        </div>
      </div>
    </>
  );
}
