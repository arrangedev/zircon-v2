import { Suspense, useEffect, useState } from "react";

interface BasePreviewProps {
  previewSrc: string;
}

export default function BasePreview({ previewSrc }: BasePreviewProps) {
  const [domLoaded, setDomLoaded] = useState(false);

  useEffect(() => {
    setDomLoaded(true);
  }, []);

  return (
    domLoaded && (
      <Suspense>
        <div className="w-full h-full">
          <iframe src={previewSrc} className="w-full h-full" title="Preview" />
        </div>
      </Suspense>
    )
  );
}
