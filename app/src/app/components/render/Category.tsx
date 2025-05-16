

function Category({ category }: { category: string }) {
    return (
        <div className="flex  items-center justify-start w-full text-start ">
            <h2 className='text-white text-center text-xl font-bold  rounded-t-lg'>{category}...</h2>
        </div>
    );
}

export default Category;


