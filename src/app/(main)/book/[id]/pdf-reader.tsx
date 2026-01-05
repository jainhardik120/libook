'use client';

import { useRef, useState } from 'react';

import {
  PdfLoader,
  PdfHighlighter,
  TextHighlight,
  AreaHighlight,
  useHighlightContainerContext,
  type PdfHighlighterUtils,
} from 'react-pdf-highlighter-plus';

import './style/style.css';

const PDFReader = ({ pdfFileUrl }: { pdfFileUrl: string }) => {
  const [highlights, setHighlights] = useState([]);
  const highlighterUtilsRef = useRef<PdfHighlighterUtils | null>(null);
  const hasInitializedUtilsRef = useRef(false);
  const [, forceUpdate] = useState({});

  return (
    <PdfLoader
      document={pdfFileUrl}
      workerSrc="https://unpkg.com/pdfjs-dist@4.10.38/build/pdf.worker.min.mjs"
    >
      {(pdfDocument) => (
        <PdfHighlighter
          enableAreaSelection={(e) => e.altKey}
          highlights={highlights}
          pdfDocument={pdfDocument}
          utilsRef={(_pdfHighlighterUtils) => {
            highlighterUtilsRef.current = _pdfHighlighterUtils;
            // Only force update ONCE to prevent infinite re-render loop
            if (!hasInitializedUtilsRef.current) {
              hasInitializedUtilsRef.current = true;
              forceUpdate({});
            }
          }}
        >
          <HighlightContainer />
        </PdfHighlighter>
      )}
    </PdfLoader>
  );
};

const HighlightContainer = () => {
  const { highlight, isScrolledTo } = useHighlightContainerContext();

  return highlight.type === 'text' ? (
    <TextHighlight highlight={highlight} isScrolledTo={isScrolledTo} />
  ) : (
    <AreaHighlight highlight={highlight} isScrolledTo={isScrolledTo} />
  );
};

export default PDFReader;
