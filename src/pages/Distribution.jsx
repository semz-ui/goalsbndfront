import React, {useEffect} from 'react'
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useSelector, useDispatch } from 'react-redux'
import {getSingleGoal, reset} from '../features/goals/goalSlice'
import Spinner from '../components/Spinner'

function Distribution() {
    const {goals, isLoading, isError, message} = useSelector((state) => state.goals)
    const dispatch = useDispatch()
    const {id} = useParams()
    useEffect(() => {
        if(isError){
            console.log(message)
        }
        dispatch(getSingleGoal(id))
        return () => {
            dispatch(reset())
        }
    } , [])

    if (isLoading) {
        return <Spinner />
    }
  return (
    <div>
        <h1>{goals.text}</h1>
    </div>
  )
}

export default Distribution