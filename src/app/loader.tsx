import { Spinner } from "@geist-ui/core";

export default function Loading() {
  return (
    <div className="grid place-items-center w-screen h-screen">
      <Spinner />
    </div>
  );
}