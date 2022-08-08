import {useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import GoalForm from '../components/GoalForm'
import Spinner from '../components/Spinner'
import { getGoals, reset } from '../features/goals/goalSlice'
import GoalItem from '../components/GoalItem'

function Dashboard() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const {user} = useSelector((state) => state.auth)
  const {goals, isLoading,  isError, message} = useSelector((state) => state.goals)
  const [query, setQuery] = useState("");

  useEffect(() => {
    if(isError){
      console.log(message)
    }
  
    if (user) {
      navigate('/')
    } else {
      navigate('/login')
    }

    dispatch(getGoals())
    return () => {
      dispatch(reset())
    }
  },[user, navigate, isError,message, dispatch])

  if (isLoading) {
    return <Spinner />
  }

   const onChange = (e) => {
    setQuery(e.target.value);
  };

  
  return (
    <>
      <section className="heading">
         <div className="form-group">
                <input type="text" name='text' id='text' placeholder='Search for your goals' onChange={onChange} style={{ borderRadius: '50px', paddingLeft: '25px' }} />
            </div>
        <h1>Welcome {user && user.name}</h1>
        <p>Goals Dashboard</p>
      </section>
      <GoalForm />
      <section className="content">
      {goals.length > 0 ? (
        <div className="goals" key={goals._id}>
          {goals
          .filter((goal) => {
          if (query === "") {
            //if query is empty
            return goal;
          } else if (goal.text.toLowerCase().includes(query.toLowerCase())) {
            //returns filtered array
            return goal;
          }
        })
          .map((goal) => (
           <GoalItem key={goal._id} goal={goal} />
          ))}
        </div>
      ) : (<h3>You have no goals yet</h3>)}
      </section>
    </>
  )
}

export default Dashboard