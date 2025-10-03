import Card from "./Card";
import Input from "./Input";
import Select from "./Select";
import TagFilter from './TagFilter';

const options = [
  { value: 1, text: "Newest first" },
  { value: 2, text: "Oldest first" },
];

interface FiltersProps {
  filters: {
    search: string;
    sortBy: number;
    tags: string[];
  };
  setFilters: (filters: { search: string; sortBy: number; tags: string[] }) => void;
}

const Filters = ({ filters, setFilters }: FiltersProps) => {
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters({
      ...filters,
      search: e.target.value,
    });
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilters({
      ...filters,
      sortBy: Number(e.target.value),
    });
  };

  const handleTagChange = (tagId: string) => {
    let newTags;
    if (filters.tags.includes(tagId)) {
      newTags = filters.tags.filter((t) => t !== tagId);
    } else {
      newTags = [...filters.tags, tagId];
    }

    setFilters({
      ...filters,
      tags: newTags,
    });
  };

  const handleReset = () => {
    setFilters({
      search: "",
      sortBy: 1,
      tags: [],
    });
  };

  return (
    <Card>
      <div className="space-y-4">
        <div>
          <Input
            value={filters.search}
            onChange={handleSearch}
            placeholder="Enter your search term"
            label="Search"
          />
        </div>
        <div>
          <Select
            value={filters.sortBy}
            onChange={handleSortChange}
            label="Sort by"
            options={options}
          />
        </div>
        <div>
          <TagFilter selected={filters.tags} onSelect={handleTagChange} />
        </div>
        <div>
          <button
            onClick={handleReset}
            className="text-primary font-semibold hover:text-primary/80 transition-colors"
          >
            Reset filters
          </button>
        </div>
      </div>
    </Card>
  );
};

export default Filters;
