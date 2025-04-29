import { APP_NAME } from "@/constants/common";
import CDialogHolder from "../holders/CDialogHolder";
import { Separator } from "../ui/separator";

const Footer = () => {
  return (
    <div className="flex items-center justify-center gap-2 bg-primary/5 text-primary w-full p-4 rounded-lg lg:rounded-t-lg text-sm border lg:border-t lg:border-x border-primary/50 border-dashed m-auto mb-0">
      <CDialogHolder
        trigger={
          <div className="underline underline-offset-4 font-bold cursor-pointer">
            What is {APP_NAME}?
          </div>
        }
        title={`What is ${APP_NAME}?`}
        contentClassName="min-w-[90%] xl:min-w-3/5"
      >
        <div className="flex flex-col items-start gap-4 leading-loose text-sm sm:text-base">
          <div>
            <strong>Athena</strong> is an innovative AI-powered learning platform designed to revolutionize how you learn! It automatically generates personalized educational courses 📚 tailored specifically to your needs.
          </div>
          <div>
            {`Simply tell Athena the topic you want to explore (like "Quantum Physics" ⚛️ or "History of Jazz" 🎷) and specify your learning preferences – maybe you want a beginner level overview 🌱, an advanced deep dive 🎓, or a course of a specific duration ⏱️. Athena takes this input and gets to work! ✨`}
          </div>
          <div className="flex flex-col gap-2">
            <div className="text-lg font-bold">
              How does it work? 🤔
            </div>
            <div>Athena uses a sophisticated multi-agent AI system built with the AutoGen framework. Think of it like a team of specialized AI assistants 🤝 working together:</div>
            <ul className="list-disc list-inside space-y-1 pl-4">
              <li>A <strong>Planner Agent</strong> 🗺️ designs a logical course structure (modules and lessons).</li>
              <li>A <strong>Research Agent</strong> 🔍 scours the web for relevant and up-to-date information.</li>
              <li>A <strong>Writer Agent</strong> ✍️ crafts clear explanations, examples, and analogies tailored to your level and focus.</li>
              <li>A <strong>Validator Agent</strong> ✅ checks the content for factual accuracy.</li>
              <li>An <strong>Activity Agent</strong> 📝 creates interactive quizzes, fill-in-the-blanks, and other exercises to reinforce your learning.</li>
              <li>A <strong>Snippet Agent</strong> 💡 generates concise summaries for each module.</li>
              <li>A <strong>Critique Agent</strong> 🧐 reviews everything for pedagogical quality, clarity, and engagement.</li>
            </ul>
          </div>
          <div>
            {`These agents collaborate 🤝, sometimes revising content based on feedback, to assemble a complete, cohesive, and personalized course 🧩 just for you. This overcomes the limitations of "one-size-fits-all" learning, saving you time and providing a truly dynamic and effective educational experience. 🚀`}
          </div>
          <Separator className="bg-gradient-to-r from-primary to-transparent" />
          <div>Created by Dhilip and Indrajit for the Github AI agents hackathon.</div>
        </div>
      </CDialogHolder>
      <div className="hidden xsm:block">|</div>
      <div className="hidden xsm:block">
        Created by <span className="font-bold">Dhilip</span>
        {" and "}
        <span className="font-bold">Indrajit</span>
      </div>
    </div>
  );
};

export default Footer;
