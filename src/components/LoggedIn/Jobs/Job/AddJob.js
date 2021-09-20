import React, { useState } from 'react';
import AddIcon from '@material-ui/icons/Add';
import { useField } from '../../../../customHooks/Other/useField';
import useAddJob from '../../../../customHooks/JobHooks/useAddJob';

const AddJob = () => {

    const project = useField('text')
    const { mutate: do_add, isLoading, isSuccess } = useAddJob()
    const [show_error, set_show_error] = useState(false)

    const handle_add = (e) => {
        e.preventDefault()
        if (project.value.length > 2 && project.value.length <= 20){
            do_add({title:project.value})
            set_show_error(false)
            project.setvalue('')
        }
        else {
            set_show_error(true)
        }
    }


    return (

        <div>

            {/* <span style={{cursor:'pointer'}} className='float-right custom-button'>
                <AddIcon/>  Go to jobs  
            </span> */}
            
            <div className='login-form'>
                {/* {isLoading ? 'logging in...' : null} */}
                <span className='menu-header'>Add Job</span>
                <br/><br/>
                <form onSubmit={handle_add}>
                    <div className="mb-3">
                        <label className="form-label">Job Title</label>
                        <input 
                            onChange={project.onChange}
                            value={project.value}
                            type={project.type} 
                            className="form-control"
                        />
                        {show_error && <div className='validation-error'>Please enter a valid position</div>}
                    </div>

                
                    <button disabled={isLoading} type="submit" className="custom-button">
                    {isLoading ? 'Loading...' :  <><AddIcon/> Add</>}
                    </button>
                </form>
                <br/>


        </div>

        </div>
    )
}

export default AddJob;