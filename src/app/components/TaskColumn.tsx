import { useDraggable } from "@dnd-kit/core"
import { useDroppable } from "@dnd-kit/core"


const Task = ({title, index, parent}) => {

  const { attributes, listeners, setNodeRef, transform, transition } = useDraggable({
    id: title,
    data: {title: title, parent: parent, index: index}
  })

  return (
    <div className="bg-slate-900 p-5 text-zinc-200" ref={setNodeRef} style={{transform: transform ? `translate3d(${transform.x}px, ${transform.y}px, 0)` : undefined, transition: transition ? transition : undefined}} {...attributes} {...listeners}>
      <div>
        <h2>{title}</h2>
      </div>
    </div>
  )
}


export default function TaskColumn({name, items}) {
  const { attributes, listeners, setNodeRef, transform, transition } = useDroppable({
    id: name
  })

  return (
    <div ref={setNodeRef} style={{transform: transform ? `translate3d(${transform.x}px, ${transform.y}px, 0)` : undefined, transition: transition ? transition : undefined}} {...attributes} {...listeners}>
      <div>
        <h1>{name}</h1>
        {items.map((item, index) => {
          return <Task key={index} title={item.title} index={index} parent={name} />
        })}
      </div>
    </div>
  )
}