import React from 'react';
import moment from 'moment'
import CallMadeIcon from "@material-ui/icons/CallMade";
import AddIcon from '@material-ui/icons/Add';
import { useHistory } from 'react-router-dom';
import useMyJobs from '../../../customHooks/JobHooks/useMyJobs';

const JobsPage = () => {
    const history = useHistory()
    const {
        data: jobs_data,
        error,
        isLoading,
        isFetching,
      } = useMyJobs()

    console.log(jobs_data);

    const go_to_add = () => {
        history.push('/jobs/add');
    }

    if (isLoading){
        return 'loading'
    }

    return (

        <div>
            <span className='menu-header'>Your Jobs</span>
            <span onClick={go_to_add} style={{cursor:'pointer'}} className='float-right custom-button'>
                <AddIcon/>  Add Job  
            </span>

            <div className='table-div'>
            <table className='custom-table'>
                <thead>
                    <tr>
                    <td>title</td>
                    <td>last punch</td>
                    <td>actions</td>
                    </tr>
                </thead>
                <tbody>
                {jobs_data.map(job => (
                    <tr key={job.id}>
                    <td>{job.title}</td>
                    <td>{job.punched_in ? <span className='success-badge'>Punched in</span> : moment().calendar()}</td>
                    <td >
                        <CallMadeIcon style={{cursor:'pointer'}} onClick={()=> history.push(`/jobs/${job.id}`)}/>
                    </td>
                    </tr>
                ))}
                </tbody>
            </table>
            </div>

        </div>
    )
}

export default JobsPage;