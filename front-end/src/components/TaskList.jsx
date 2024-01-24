import React from 'react'
import { useDrag } from 'react-dnd'
import { ItemTypes } from '../pages/Home'

function TaskList({ category, id, title, description, index, handleOpenTaskModal }) {
    const [{ isDragging }, drag] = useDrag(() => ({
        type: ItemTypes.TASK,
        item: {
            id: id,
            category: category
        },
        collect: monitor => ({
            isDragging: !!monitor.isDragging(),
        }),
    }))

    return (
        <div className={`p-3 w-full bg-purple-950 ${isDragging ? "opacity-50" : "opacity-100"}`} ref={drag} key={id} onClick={() => handleOpenTaskModal(category, id)}>
            <h1 className='p-3 cursor-pointer font-medium capitalize  text-slate-50'>{title}</h1>
        </div>
    )
}

export default TaskList