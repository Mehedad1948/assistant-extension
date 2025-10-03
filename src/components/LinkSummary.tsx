import Truncate from "react-truncate-markup";
import Card from './Card';

interface LinkSummaryProps {
  link: {
    linkId: string;
    url: string;
    title: string;
  };
  onEdit: (id: string) => void;
}

const LinkSummary = ({ link, onEdit }: LinkSummaryProps) => {
  if (!link) return null;

  const hostname = new URL(link.url).hostname;

  const handleEdit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault(); // stop navigating when clicking Edit
    onEdit(link.linkId);
  };

  return (
    <a
      href={link.url}
      target="_blank"
      rel="noopener noreferrer"
      className="relative no-underline group"
    >
      <Card fullHeight>
        {/* Edit button (visible on hover) */}
        <button
          onClick={handleEdit}
          className="
            hidden group-hover:block
            absolute top-0 right-0
            p-2 text-xs font-semibold
            text-gray-400 hover:text-gray-700
            bg-transparent border-none cursor-pointer
          "
        >
          Edit
        </button>

        <div className="flex flex-col h-full">
          {/* Domain */}
          <span className="text-gray-400 text-xs font-semibold truncate">
            {hostname}
          </span>

          {/* Title with truncate */}
          <Truncate lines={3}>
            <h2 className="text-gray-800 text-base font-medium">
              {link.title}
            </h2>
          </Truncate>
        </div>
      </Card>
    </a>
  );
};

export default LinkSummary;
