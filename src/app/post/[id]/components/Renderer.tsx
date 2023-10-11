"use client";

import Renderer from "editorjs-react-renderer";

export const JsonRenderer = ({ data }: { data: any }) => {
  return <Renderer data={data} />;
};
