import Truncate from "react-truncate-markup";
import Card from "./Card";

const LinkSummary = () => {
  return (
    <a
      href="https://www.google.com"
      target="_blank"
      rel="noopener noreferrer"
      className="relative no-underline group"
    >
      <Card fullHeight>
        <button
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
            google.com
          </span>

          {/* Title with truncate */}
          <Truncate  lines={3}>
            <h2 className="text-gray-800 text-base font-medium">Google</h2>
          </Truncate>
        </div>
      </Card>
    </a>
  );
};

export default LinkSummary;
