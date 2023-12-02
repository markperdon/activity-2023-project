// src/components/MyModal.js
import React, {useState, useEffect} from 'react';

interface AddUserProps {
    clear: boolean;
  }

const AddUser: React.FC<AddUserProps> = ({clear}) => {
    const [username, setUsername] = useState('');
    const [accountType, setAccountType] = useState('');
    const [password, setPassword] = useState('');
    useEffect(() => {
        console.log(clear);
        if(clear){
            setUsername('');
            setPassword('');
            console.log(accountType);
        }
        
    }, [clear]);
    return (
        <><div className="row g-3 align-items-center">
            <div className="col-auto">
                <label className="col-form-label" htmlFor="username">
                    Username:
                </label>
            </div>
            <input
                type="text"
                id="username"
                className="form-control"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                autoFocus />
                </div><div className="row g-3 align-items-center">
                <div className="col-auto">
                    <label className="col-form-label" htmlFor="password">
                        Password:
                    </label>
                </div>
                <input
                    type="password"
                    id="password"
                    className="form-control"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)} />
                {/* Your password visibility toggle code goes here */}
                <div id="passwordHelpBlock" className="form-text">
                    Your password must be 8-20 characters long, contain letters and numbers, and must not contain spaces, special characters, or emoji.
                </div>
            </div><div className="row g-3 align-items-center">
                <div className="col-auto">
                    <label className="col-form-label" htmlFor="accountType">
                        Account Type:
                    </label>
                </div>
                <select
                    id="accountType"
                    className="form-control"
                    value={accountType}
                    onChange={(e) => setAccountType(e.target.value)}
                >
                    <option value="" hidden>
                        Select Account Type
                    </option>
                    <option value="viewer">Viewer</option>
                    <option value="admin">Admin</option>
                </select>
            </div></>
      );
};

export default AddUser;
