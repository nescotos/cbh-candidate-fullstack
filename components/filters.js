export const Filters = ({ categoryName, items }) => {
  const parseCategoryName = (catName) => catName.split('_').join(' ');
  return (
    <div>
       <h3 className="font-bold uppercase">{parseCategoryName(categoryName)}</h3>

        <ul>
          {items.map((element, index) => {
            return (
              <li key={index}>{element.key} | <span className="text-gray-400">{element.doc_count}</span></li>
            )
          })}
        </ul>
    </div>
           
  )
}