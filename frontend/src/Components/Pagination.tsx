export type Props = {
    page: number; //current page
    pages: number; //all pages
    onPageChange: (page: number)=>void 
}

const Pagination = ({page, pages, onPageChange}: Props)=>{
    const pageNumbers = [];
    for(let i = 1 ; i<=pages; i++){
        pageNumbers.push(i);
    }

    return (
        <div className="flex justify-center">
            <ul className="flex border border-slate-300">
                {pageNumbers.map((n)=>(
                    <li className={`px-2 py-1 ${page==n ? "bg-gray-200": "" }`}>
                        <button onClick={()=>onPageChange(n)}>{n}</button>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default Pagination;