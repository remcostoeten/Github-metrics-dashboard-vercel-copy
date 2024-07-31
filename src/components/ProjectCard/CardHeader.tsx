import Link from 'next/link';

interface CardHeaderProps {
  href: string;
  title: string;
  onRemove: () => void;
}

export default function CardHeader({ href, title, onRemove }: CardHeaderProps) {
  return (
    <Link
      href={href}
      target="_blank"
      className="flex justify-between items-center px-4 py-4 gap-2"
    >
      <h2 className="text-2xl font-semibold tracking-tight text-white">
        {title}
      </h2>
      <button
        onClick={(e) => {
          e.preventDefault();
          onRemove();
        }}
        className="text-red-500 hover:text-red-700"
      >
        Remove
      </button>
    </Link>
  );
}
