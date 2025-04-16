import { Button } from "@/components/ui/button";
import Link from "next/link";

const NotFound = () => {
  return (
    <div className="m-auto flex flex-col gap-3 items-center justify-center">
      <div className="text-2xl font-bold">Page not Found!</div>
      <Link href="/">
        <Button>Return Home</Button>
      </Link>
    </div>
  );
};

export default NotFound;
