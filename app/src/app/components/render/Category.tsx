

function Category({ category }: { category: string }) {
    return (
        <div className="flex  items-center justify-start w-full text-start py-2">
            <p className="text-blue-400 text-start text-sm">{category}...</p>
        </div>
    );
}

export default Category;


