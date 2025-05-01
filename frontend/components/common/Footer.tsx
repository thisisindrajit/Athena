import { APP_NAME } from "@/constants/common";
import CDialogHolder from "../holders/CDialogHolder";
import { Separator } from "../ui/separator";

const Footer = () => {
  return (
    <div className="hidden lg:flex items-center justify-center gap-2 bg-primary/5 text-primary w-full p-4 rounded-t-lg text-sm border-t border-x border-primary/50 border-dashed self-end">
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
            <strong>Athena</strong> is an AI-powered application designed to revolutionize learning! It automatically generates personalized educational courses 📚 tailored specifically to your needs.
          </div>
          <div>
            {`Simply provide a topic you wish to learn (like "Quantum Physics" ⚛️ or "History of the Silk Road" 🧳) and specify your learning preferences – desired level 🎓, duration ⏱️, and focus. Athena - Where Knowledge is Crafted for You. ✨`}
          </div>
          <div className="flex flex-col gap-2">
            <div className="text-lg font-bold">
              How does it work? 🤔
            </div>
            <div>Athena employs a collaborative multi-agent system built using the AutoGen framework. These specialized AI agents work together:</div>
            <ul className="list-disc list-inside space-y-1 pl-4">
              <li>A <strong>Course Planner Agent</strong> 🗺️ designs a logical course structure (modules and lessons).</li>
              <li>A <strong>Module Research Agent</strong> 🔍 gathers relevant and up-to-date information for each section.</li>
              <li>A <strong>Lesson Writer Agent</strong> ✍️ synthesizes information into explanations, examples, and analogies tailored to your preferences.</li>
              <li>A <strong>Quiz Master Agent</strong> 📝 generates quizzes and other active learning activities to reinforce your understanding.</li>
              <li>A <strong>Course Assembler</strong> 🧩 checks content accuracy and assembles everything into a cohesive, structured course.</li>
            </ul>
          </div>
          <div>
            {`This multi-agent approach overcomes the "one-size-fits-all" limitation of traditional learning resources, providing a dynamic, efficient, and effective learning experience tailored just for you! 🚀`}
          </div>
          <Separator className="bg-gradient-to-r from-primary to-transparent" />
          <div>Project created by Dhilip and Indrajit for the Github AI Agents hackathon.</div>
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
