import { SiteBanner } from "@/components/site-banner";
import ExampleCodeMirrorEditor from "@/components/ui/editor";
import { CodeMirrorEditor } from "@tutorialkit/components-react/core";

export default async function Page() {
  return (
    <div className="p-12">
      <ExampleCodeMirrorEditor />
    </div>
  );
}
