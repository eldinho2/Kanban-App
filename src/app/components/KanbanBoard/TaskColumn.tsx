import { SortableItem } from "./SortableItem";

export default function TaskColumn({name, items}) {
  return (
    <div>
    <div className="h-full w-[300px] bg-slate-900 m-4" >
      <div>
        {name}
      </div>
      <div>
        {!items.length ? <SortableItem key={'sem Items'} id={'sem Items'} index={'sem Items'} /> : items.map((item, index) => (
          <SortableItem key={item} id={item} index={index} />
        ))}
      </div>
    </div>
    </div>
  )
}