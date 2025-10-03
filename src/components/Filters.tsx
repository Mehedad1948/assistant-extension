import Card from "./Card";
import Input from "./Input";
import Select from "./Select";

const options = [
  { value: 1, text: "Newest first" },
  { value: 2, text: "Oldest first" },
];

const Filters = () => {
  return (
    <Card>
      <div className="space-y-4">
        <div>
          <Input
            value=""
            onChange={() => {}}
            placeholder="Enter your search term"
            label="Search"
          />
        </div>
        <div>
          <Select
            selected={'1'}
            onChange={() => {}}
            label="Sort by"
            options={options}
          />
        </div>
        <div>
          <button
            onClick={() => {}}
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
