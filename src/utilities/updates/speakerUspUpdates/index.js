import React, {useState, useEffect} from 'react';
import {useSelector} from 'react-redux';
import axios from '../../axios';
import {message, Spin} from 'antd';
import { LoadingOutlined } from '@ant-design/icons';


const antIcon = <LoadingOutlined style={{fontSize: 24, color: '#fff'}} spin />;

export default function Index({initialData, onClose, onSuccess}) {
    const [state, setState] = useState("");
    const [loading, setLoading] = useState(false)

    useEffect(() =>{
        setState(initialData.usp);
    }, [initialData])
    const userId = useSelector(({user}) => user.id);
    const saveBio = () =>{
        // logic to make API call to save bio
        if(!state){
            message.error("Please fill in all fields before proceeding")
            return;
        }
        setLoading(true)
        axios.patch(`/speakers/${userId}/usp`,{
            usp: state
        })
        .then(res => {
            message.success("Profile sucessfully updated!");
            onSuccess()
            onClose();
        })
        .catch((err) => {
            message.error("There was an error updating user!", err.response.data.message);
            onClose();
        })
        .finally(()=>{
            setLoading(false)
        })
    }

    return (
        <div className="updates textareawrapper">
            
            <div className="updates__form">
                <div className="updates__form__header">
                    Why Choose Me?
                    <span>What makes you different from other speakers? (Max. 25 words)</span>
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
                    {
                        loading? <Spin indicator={antIcon} />
                        : "Save"
                    }
                </div>
            </div>

        </div>
    )
}
