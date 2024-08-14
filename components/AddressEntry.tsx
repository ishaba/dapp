import UilCopy from "~icons/uil/copy";

export default function AddressEntry({ address }: { address: string }) {
  return (
    <div>
      <span className="opacity-50">Address:</span> {address}
      <button className="ml-2 inline-block align-top opacity-50 transition-opacity duration-300 ease-out hover:opacity-100 active:scale-95" title="Copy to clipboard">
        <UilCopy />
      </button>
    </div>
  );
}
