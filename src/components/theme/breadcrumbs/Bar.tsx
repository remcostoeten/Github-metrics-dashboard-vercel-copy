import AddressBar from "./AddressBar";

export default function Bar() {
  return (
    <div className="rounded-lg bg-vc-border-gradient p-px shadow-lg shadow-black/20">
      <div className="rounded-lg bg-black">
        <AddressBar />
      </div>
    </div>
  );
}
