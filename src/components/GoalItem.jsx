import {toast} from 'react-toastify'
import { MdDelete, MdEdit } from 'react-icons/md'
import { useDispatch } from 'react-redux'
import { deleteGoal, reset, updateGoal } from '../features/goals/goalSlice'
import { useState } from 'react'


function GoalItem({ goal }) {

    const [isEditing, setIsEditing] = useState(false)

    const dispatch = useDispatch()

    const onClick = () => {
        toast.success('Goal deleted')
        dispatch(deleteGoal(goal._id))
            dispatch(reset())
    }

     const handleSubmit = (goal) => {
      setIsEditing(false)
        dispatch(updateGoal(goal))
        dispatch(reset())
  }


  return (
    <div className='goal'>
      <div>
        <div>{new Date(goal.createdAt).toLocaleDateString('en-US')}
        </div>
        <h2>{goal.text}</h2>
      </div>
        <button className="close" onClick={onClick}><MdDelete size={20} /></button>
        {/* <button className="edit" onClick={handleSubmit}><MdEdit size={20} /></button> */}
    </div>
  )
}

export default GoalItem