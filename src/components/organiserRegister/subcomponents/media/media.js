import React, {useState} from 'react';
import PropTypes from 'prop-types';
import TagsInput from 'react-tagsinput';
import { Link } from 'react-router-dom';
import Select from 'react-select';
import { Upload, message, Button } from 'antd';
import ImgCrop from 'antd-img-crop';


import './media.scss';
import 'react-tagsinput/react-tagsinput.css';
import '../../../../stylesheets/tag.scss';



import fileUpload from '../../assets/uploadFile.svg';
import whiteTick from '../../assets/whiteTick.svg';
import deleteBin from '../../assets/deleteBin.svg';

import wwwLogo from '../../assets/www.svg';
import Instagram from '../../assets/instagram.svg';
import LinkedIn from '../../assets/linkedin.svg';
import Twitter from '../../assets/twitter.svg';
import Facebook from '../../assets/facebook.svg';
import behance from '../../assets/behance.svg';
import dribbble from '../../assets/dribbble.svg';
import pintrest from '../../assets/pintrest.svg';
import github from '../../assets/github.svg';

import { SPEAKER_SPECIALITY } from '../../component/constants';


const PROFILE_LINKS = [
    [wwwLogo, 'www'],
    [Instagram, 'instagram.com/'],
    [LinkedIn, 'linkedin.com/in/'],
    [Twitter, 'twitter.com/'],
    [Facebook, 'facebook.com/ '],
    [behance, 'behance.net/'],
    [dribbble, 'dribbble.com/ '],
    [pintrest, 'pintrest.com/ '],
    [github, 'github.com/ '],
]

const FileImage = () => (
    <img height="14px" style={ {'margin-right': '10px'} } src={fileUpload} alt="calendar"/>
);

const DoneImage = () => (
    <img height="14px" style={ {'margin-right': '10px'} } src={whiteTick} alt="calendar"/>
)


async function readFileAsDataURL(file) {
    let result_base64 = await new Promise((resolve) => {
        let fileReader = new FileReader();
        fileReader.onload = (e) => resolve(fileReader.result);
        fileReader.readAsDataURL(file);
    });    
    return result_base64;
}

const props = {
    name: 'file',
    action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
    headers: {
      authorization: 'authorization-text',
    },
    onChange(info) {
      if (info.file.status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === 'done') {
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };

export default function Media({
    stateChanger, state
}) {
    const [tagInputState, setTagInputState] = useState("");
    const changeTagInputState = (value) =>{
        if (value.length < 20){
            setTagInputState(value)
        }
    };

    const [secTagInputState, setSecTagInputState] = useState("");
    const changeSecTagInputState = (value) =>{
        if (value.length < 20){
            setSecTagInputState(value)
        }
    };

    const [thirdtagInputState, setThirdTagInputState] = useState("");
    const changeThirdTagInputState = (value) =>{
        if (value.length < 20){
            setThirdTagInputState(value)
        }
    };
    

    const changeSelectState = (name, value)=>{
        stateChanger({
            ...state,
            [name]: value
          });
    }

    console.log(state)

    return (
        <div className="organiserlogin">
            
            <div className="organiserlogin__heading --more-padding">
                <div className="organiserlogin__heading__header">
                    Organiser info
                </div>
            </div>

            <div className="organiserlogin__formsection">


                <div className="organiserlogin__formsection__section --more-padding">
                    
                    <label className="double" htmlFor="position">
                        specialty
                    </label>
                    <div className="--singleselect">
                        <Select
                            options={SPEAKER_SPECIALITY}
                            isSearchable
                            placeholder="Select"
                            className="--item"
                            onChange={(value) => changeSelectState('speciality', value)}
                            value={state.speciality}
                        />
                    </div>

                </div>

                <div className="organiserlogin__formsection__section --more-padding">
                    <label className="double">
                        Services
                        <span>
                            Add specific services you offer. Separate services with commas.
                        </span>
                    </label>
                    <div className="--input_wrapper --tags --grey">
                        <TagsInput
                            value={state.services}
                            addKeys={[9, 13, 188 ]}
                            onChange={(tag)=>{
                                changeSelectState('services', tag)
                            }}
                            inputValue={tagInputState}
                            onChangeInput={changeTagInputState}
                            inputProps={{
                                placeholder:"Service 1, Service 2"
                            }}
                        />
                    </div>
                </div>

                <div className="organiserlogin__formsection__section --more-padding">
                    <label class="double" htmlFor="fullbio">
                        Company Bio
                        <span>
                            Enter company bio
                        </span>
                    </label>
                    <textarea
                        name="bio"
                        type="text"
                        placeholder="Enter Your Full Bio"
                        value={state.bio}
                        onChange={(e)=>{
                            changeSelectState('bio', e.target.value)
                        }}
                    />
                </div>

                <div className="organiserlogin__formsection__section --more-padding">
                    <label className="double">
                        Clients
                        <span>
                            Who have you worked for? Separate client names with commas. 
                        </span>
                    </label>
                    <div className="--input_wrapper --tags --grey">
                        <TagsInput
                            value={state.clients}
                            addKeys={[9, 13, 188 ]}
                            onChange={(tag)=>{
                                changeSelectState('clients', tag)
                            }}
                            inputValue={secTagInputState}
                            onChangeInput={changeSecTagInputState}
                            inputProps={{
                                placeholder:"Client 1, Client 2"
                            }}
                        />
                    </div>
                </div>

                <div className="organiserlogin__formsection__section --more-padding">
                    <label className="double">
                        Partners
                        <span>
                            Who do you work with? Separate client names with commas.
                        </span>
                    </label>
                    <div className="--input_wrapper --tags --grey">
                        <TagsInput
                            value={state.partners}
                            addKeys={[9, 13, 188 ]}
                            onChange={(tag)=>{
                                changeSelectState('partners', tag)
                            }}
                            inputValue={thirdtagInputState}
                            onChangeInput={changeThirdTagInputState}
                            inputProps={{
                                placeholder:"Partner 1, Partner 2"
                            }}
                        />
                    </div>
                </div>

                <div className="organiserlogin__formsection__section --more-padding">
                    <label htmlFor="">Profile Links</label>
                    <div className="form_wrapper">
                        {
                            PROFILE_LINKS.map((profileLink,index) => (
                                <div className="icon_input">
                                    <img src={profileLink[0]} alt="icon" className="icon" />
                                    <input
                                        type="text"
                                        placeholder={profileLink[1]}
                                        value={state.links[index]}
                                        onChange={(e)=>{
                                            let newState = [...state.links];
                                            newState[index]=e.target.value
                                            changeSelectState('links', newState)
                                        }}
                                    />
                                </div>
                            ))
                        }
                    </div>
                </div>



                <div className="organiserlogin__formsection__section --more-padding">
                    <label htmlFor="">Profile Photo</label>
                    <div className="form_wrapper">
                        <ImgCrop
                            shape="round"
                        >
                            <Upload
                                {...props}
                                beforeUpload ={ file => {
                                    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
                                    if (!isJpgOrPng) {
                                    message.error('You can only upload JPG/PNG file!');
                                    return;
                                    }
                                    const addFile = async ()=>{
                                        const dataURL = await readFileAsDataURL(file)
                                        changeSelectState('profilePhoto', {file, src:dataURL});
                                    }
                                    addFile();
                                    return false;
                                }}
                            >
                                {
                                    (state.profilePhoto.src)?(
                                        <div className="image_upload_button --uploaded">
                                            <Button disabled icon={<DoneImage />}>Uploaded</Button>
                                        </div>
                                    ):(
                                        <div className="image_upload_button">
                                            <Button icon={<FileImage />}>Upload File</Button>
                                        </div>
                                    )

                                }
                            </Upload>
                        </ImgCrop>
                        {
                            (state.profilePhoto.src)?(
                                <div
                                    className="file_delete"
                                    onClick={(e)=>{
                                        changeSelectState('profilePhoto', {src:undefined});
                                    }}
                                >
                                    <img src={deleteBin} alt=""/>
                                    <span>Delete Photo</span>
                                </div>
                            ):""
                        }
                    </div>
                </div>

                <div className="organiserlogin__formsection__section --more-padding --more-margin">
                    <label htmlFor="">Cover Photo</label>
                    <div className="form_wrapper">
                        <ImgCrop
                            aspect="3.49"
                        >
                            <Upload
                                {...props}
                                beforeUpload ={ file => {
                                    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
                                    if (!isJpgOrPng) {
                                    message.error('You can only upload JPG/PNG file!');
                                    return;
                                    }
                                    const addFile = async ()=>{
                                        const dataURL = await readFileAsDataURL(file)
                                        changeSelectState('coverPhoto', {file, src:dataURL});
                                    }
                                    addFile();
                                    return false;
                                }}
                            >
                                {
                                    (state.coverPhoto.src)?(
                                        <div className="image_upload_button --uploaded">
                                            <Button disabled icon={<DoneImage />}>Uploaded</Button>
                                        </div>
                                    ):(
                                        <div className="image_upload_button">
                                            <Button icon={<FileImage />}>Upload File</Button>
                                        </div>
                                    )

                                }
                            </Upload>
                        </ImgCrop>
                        {
                            (state.coverPhoto.src)?(
                                <div
                                    className="file_delete"
                                    onClick={(e)=>{
                                        changeSelectState('coverPhoto', {src:undefined});
                                    }}
                                >
                                    <img src={deleteBin} alt=""/>
                                    <span>Delete Photo</span>
                                </div>
                            ):""
                        }
                    </div>
                </div>

            </div>
            

            <div className="organiserlogin__footer">

                <div className="--button_group">
                    <Link className="link" to="/organiser/1">
                        <div className="cancel">
                            Back
                        </div>
                    </Link>

                    <Link
                        className="link"
                        to="/"
                        onClick={()=>{
                            console.log(state)
                        }}
                    >
                        <div className="next">
                            Next
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    )
}

Media.propTypes = {
    stateChanger: PropTypes.func.isRequired,
    state: PropTypes.instanceOf(Object).isRequired
}
