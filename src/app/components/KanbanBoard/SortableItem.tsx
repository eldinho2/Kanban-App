import { DragOverlay } from "@dnd-kit/core";
import { useSortable } from "@dnd-kit/sortable";
import {CSS} from "@dnd-kit/utilities";

import { useEffect } from "react";

export function SortableItem(props) {

    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({id: props.id});

    console.log('css', setNodeRef);
    

    const style = {
        transform: CSS.Transform.toString(transform),
        backgroundColor: isDragging ? 'red' : 'rgb(71 85 105)',
        transition,
        duration: 150,
        easing:'cubic-bezier(0.25, 1, 0.5, 1)',
    }

    if (props.id === 'sem Items') return (
        <div className="flex flex-col bg-red-600" ref={setNodeRef} style={style}>
            <div className="m-3">{props.id}</div>
        </div>
    )

    useEffect(() => {
        console.log('style', transform);
    }, [transform])

    return (
        <div className={`flex flex-col bg-slate-600`} style={style} ref={setNodeRef} {...attributes} {...listeners}>
            <div className="m-3">{props.id}</div>
        </div>
    )
}