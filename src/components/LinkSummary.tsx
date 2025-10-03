import Truncate from "react-truncate-markup";
import Card from "./Card";
import Tag from "./Tag";

interface TagType {
  tagId: string;
  title: string;
}

interface LinkSummaryProps {
  link: {
    linkId: string;
    url: string;
    title: string;
    tags?: TagType[];
  };
  onEdit: (id: string) => void;
}

const LinkSummary: React.FC<LinkSummaryProps> = ({ link, onEdit }) => {
  if (!link) return null;

  const hostname = new URL(link.url).hostname;

  const handleEdit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    onEdit(link.linkId);
  };
console.log({link});

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

          {/* Title */}
          <Truncate lines={3}>
            <h2 className="text-gray-800 text-base font-medium">{link.title}</h2>
          </Truncate>

          {/* Tags */}
          {link.tags && link.tags.length > 0 && (
            <div className="mt-auto mt-2">
                <div className="flex space-x-2 flex-wrap">
                  {link.tags.map((tag) => (
                    <div key={tag.tagId}>
                      <Tag title={tag.title} />
                    </div>
                  ))}
                </div>
            </div>
          )}
        </div>
      </Card>
    </a>
  );
};

export default LinkSummary;
