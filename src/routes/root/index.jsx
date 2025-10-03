import Button from "../../components/Button";
import Filters from "../../components/Filters";
import Header from '../../components/Header';
import LinkSummary from '../../components/LinkSummary';

const RootRoute = () => {
  return (
    <div className="bg-gray-50 min-h-screen w-full">
      <Header />
      <div className="px-4">
        <div className="grid grid-cols-4 gap-8 max-w-6xl mx-auto my-12">
          {/* Left column */}
          <div className="col-span-1">
            <Filters />
          </div>

          {/* Right column */}
          <div className="col-span-3">
            <div className="flex items-center border-b border-gray-200 mb-4 pb-4">
              <h2 className="text-gray-800 font-semibold">My Link Saves (2)</h2>
              <div className="ml-auto">
                <Button>+ Add Link</Button>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-8">
              <LinkSummary />
              <LinkSummary />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RootRoute;
