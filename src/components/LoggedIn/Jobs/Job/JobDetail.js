import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import useJobDetails from '../../../../customHooks/JobHooks/useJobDetail';
import usePunchIn from '../../../../customHooks/PunchHook/usePunchIn';
import usePunchOut from '../../../../customHooks/PunchHook/usePunchOut';

const JobDetail = () => {

    const job_id = useParams().id
    const { data: job_detail, isLoading, isFetching} = useJobDetails(job_id)
    const { mutate: do_punch_in, isLoading: punching_in, isSuccess: punched_in} = usePunchIn()
    const { mutate: do_punch_out, isLoading: punching_out, isSuccess: punched_out} = usePunchOut()
    const [ total_hours, set_total_hours] = useState(0)

    useEffect(()=>{
        if (job_detail){
            let hours = 0
            job_detail.punches.forEach(punch => {
                const curr_hours = Number(punch.punched_out 
                    ? moment(punch.punched_out).diff(moment(punch.punched_in), 'hours', true).toFixed(2)
                    : moment().diff(moment(punch.punched_in), 'hours', true).toFixed(2))
                hours += curr_hours
            })
            console.log(hours);
            set_total_hours(hours)
        }
    },[job_detail])

    if (isLoading || isFetching){
        return 'loading'
    }
    console.log(job_detail);

    const handle_punch_in = (e) => {
        e.preventDefault()
        do_punch_in(job_id)
    }
    const handle_punch_out = (e) => {
        e.preventDefault()
        do_punch_out(job_id)
    }

   

    return (

        <div>

            {/* <span style={{cursor:'pointer'}} className='float-right custom-button'>
                <AddIcon/>  Go to jobs  
            </span> */}
            
            <span className='menu-header'>
                {job_detail.title} - {job_detail.punches.length} punches
            </span>

            <div style={{display:'inline', marginLeft: 40}}>
                {!job_detail.punched_in 
                  ? <button onClick={handle_punch_in} className='custom-button success-background'>
                     {punching_in ? 'Punching in...' : 'Punch in' } 
                    </button>
                  : <button onClick={handle_punch_out} className='custom-button error-background'>
                      {punching_out ? 'Punching out...' : 'Punch out' } 
                    </button>
                }
            </div>
            <br/><br/>
            <div className='table-div'>
            <table className='custom-table'>
                <thead>
                    <tr>
                    <td>#</td>
                    <td>punched in</td>
                    <td>punched out</td>
                    <td>total hours</td>
                    </tr>
                </thead>
                <tbody>
                {job_detail.punches.map((punch, index) => (
                    <tr key={punch.id}>
                    <td>{index + 1}</td>
                    <td>{moment(punch.punched_in).calendar()}</td>
                    <td>{punch.punched_out ? moment(punch.punched_out).calendar() : <span className='success-badge'>Punched in</span> }</td>
                    <td>
                    {punch.punched_out 
                        ? moment(punch.punched_out).diff(moment(punch.punched_in), 'hours', true).toFixed(2)
                        : moment().diff(moment(punch.punched_in), 'hours', true).toFixed(2)
                    }
                    </td>
                    </tr>
                ))}
                <tr key='totals'>
                    <td></td>
                    <td></td>
                    <td style={{fontWeight:700}}>Total hours: </td>
                    <td style={{fontWeight:700, fontSize: 18}}>{total_hours?.toFixed(2)}</td>
                </tr>
                </tbody>
            </table>

           

            </div>
            
        </div>
    )
}

export default JobDetail;