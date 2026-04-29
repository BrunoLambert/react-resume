import enResume from "./helpers/EN_Resume.json";
import ptResume from "./helpers/PT_Resume.json";
import ResumeClient from "./ui/resume/ResumeClient";
import type { Resume } from "./helpers/types";

export default function Home() {
  return (
    <ResumeClient
      en={enResume as Resume}
      pt={ptResume as Resume}
    />
  );
}
