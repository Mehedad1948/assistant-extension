import Tag from './Tag';
import { useAppContext } from '../context';

const TagFilter = ({ selected, onSelect }) => {
    const { state } = useAppContext();

    return (
        <div>
            <p className="text-gray-700 text-sm mb-2 font-medium">Tag filter</p>
            <div className="flex flex-wrap -m-1">
                {state.tags.map((tag: { tagId: string; title: string }) => (
                    <div key={tag.tagId} className="m-1">
                        <Tag
                            tagId={tag.tagId}
                            title={tag.title}
                            active={selected.includes(tag.tagId)}
                            onClick={() => onSelect(tag.tagId)}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TagFilter;
