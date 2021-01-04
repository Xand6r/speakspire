import React, {useState, useEffect} from 'react';
import {useSelector} from 'react-redux';
import {validateBio} from './validate';
import {message, Spin} from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

import axios from '../../axios';
import '../updates.scss';

const antIcon = <LoadingOutlined style={{fontSize: 24, color: '#fff'}} spin />;

export default function Index({initialData, onClose, onSuccess, eventId}) {
    const [state, setState] = useState("");
    const userId = useSelector(({user}) => user.id);
    const [loading, setLoading] = useState(false);
    useEffect(() =>{
        setState(initialData.description);
    }, [initialData])

    const saveBio = () =>{
        // validate all fields present  
        if(!validateBio(state)){
            message.error("Please fill in all details before submitting!");
            return;
        }
        // set lading state
        setLoading(true)
        // make patch request
        axios.patch(`http://api.speakspire.com/events/${eventId}/description`,{
            "description": state,
            "organizer_id": userId 
        // copy and paste from here
        }).then((res) => {
            message.success("Details updated sucesfully!");
            onSuccess();
            onClose();
        }).catch((err) => {
            message.error("There was an error updating user!", err.response.data.message);
            onClose();
        }).finally(()=>{
            setLoading(false)
        })
        // to here for all requests made
    }

    return (
        <div className="updates textareawrapper">
            
            <div className="updates__form">
                <div className="updates__form__header">
                    About This Event
                </div>

                <div className="updates__form__textareacontent">
                    <textarea
                        name="Tell us about this event"
                        onChange = {
                            ({target}) => {
                                setState(target.value)
                            }
                        }
                        value={state}
                    >

                    </textarea>
                </div>
            </div>
            <div className="updates__action">
                <div
                    className="cancel"
                    onClick={onClose}
                >
                    Cancel
                </div>

                <div
                    className="save"
                    onClick={saveBio}
                >
                {/* add this too */}
                {
                    loading? <Spin indicator={antIcon} />
                    : "Save"
                }
                </div>
            </div>

        </div>
    )
}
