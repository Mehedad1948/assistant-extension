interface TagProps {
    active?: boolean;
    onClick?: () => void;
    title: string;
}

const Tag: React.FC<TagProps> = ({ active = false, onClick, title }) => {
    const canClick = typeof onClick === "function";
console.log('❌❌❌', title);

    return (
        <button
            onClick={canClick ? onClick : undefined}
            className={`
        inline-block text-xs px-2 py-1 rounded 
        ${active ? "border-black" : "border-gray-300"} border 
        bg-gray-100/50 
        text-gray-800
        ${canClick ? "cursor-pointer hover:border-black" : "cursor-default"}
      `}
        >
            {title}
        </button>
    );
};

export default Tag;
