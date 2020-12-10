import React, {useState, useEffect} from 'react';
import {useSelector} from 'react-redux';
import {validateBio} from './validate';
import {message, Spin} from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

import axios from '../../axios';
import '../updates.scss'
import './speakerBioUpdates.scss';
const antIcon = <LoadingOutlined style={{fontSize: 24, color: '#fff'}} spin />;

export default function Index({initialData, onClose, onSuccess}) {
    const [state, setState] = useState("");
    const userId = useSelector(({user}) => user.id);
    const [loading, setLoading] = useState(false);

    useEffect(() =>{
        setState(initialData.bio);
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
        axios.patch(`organizers/${userId}/bio`,{
            bio: state
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
                   Bio
                    <span>Share more about you, your skillset and experience.</span>
                </div>

                <div className="updates__form__textareacontent">
                    <textarea
                        name="why"
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
