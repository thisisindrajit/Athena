import { Separator } from "@/components/ui/separator";

export default function Home() {
  return (
    <>
      <div className="font-medium uppercase underline underline-offset-4">Athena</div>
      {/* Motto */}
      <div className="sm:inline-flex gap-3 text-3xl/snug lg:text-4xl/snug font-bold self-center text-center my-2 lg:my-4">
        <div>Where Knowledge is </div>
        <div className="text-primary">Crafted for You.</div>
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
