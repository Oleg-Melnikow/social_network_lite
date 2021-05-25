import React, {ChangeEvent, useEffect, useState} from "react";

type ProfileStatusType = {
    status: string,
    updateStatusProfile: (status: string) => void
}

export const ProfileStatusWithHooks = (props: ProfileStatusType) => {

    const [status, setStatus] = useState<string>(props.status);
    const [isEditMode, setIsEditMode] = useState<boolean>(false);

    const activeEditMode = () => {
        setIsEditMode(true);
    }

    const deActiveEditMode = () => {
        setIsEditMode(false);
        props.updateStatusProfile(status);
    }

    const onChangeStatus = (e: ChangeEvent<HTMLInputElement>) => {
        setStatus(e.currentTarget.value);
    }

    useEffect(() => {
        setStatus(props.status)
    }, [props.status]);

    return <div>
        {isEditMode ?
            <input type="text" value={status}
                   onChange={onChangeStatus}
                   autoFocus onBlur={deActiveEditMode}/> :
            <span onDoubleClick={activeEditMode}>{props.status}</span>
        }
    </div>

}