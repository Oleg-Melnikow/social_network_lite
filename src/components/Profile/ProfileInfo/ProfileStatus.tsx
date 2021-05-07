import React, {ChangeEvent} from "react";

type ProfileStatusType = {
    status: string,
    updateStatusProfile: (status: string) => void
}

export class ProfileStatus extends React.Component<ProfileStatusType> {

    state = {
        editMode: false,
        status: this.props.status
    }

    activeEditMode = () =>{
        this.setState({editMode: true})
    }

    deActiveEditMode = () => {
        this.setState({editMode: false});
        this.props.updateStatusProfile(this.state.status);
    }

    onChangeStatus = (e:ChangeEvent<HTMLInputElement>) => {
        this.setState({status: e.currentTarget.value})
    }

    componentDidUpdate(prevProps: Readonly<ProfileStatusType>, prevState: Readonly<{}>, snapshot?: any) {
        if(prevProps.status !== this.props.status){
            this.setState({status: this.props.status})
        }
    }

    render() {
        return <div>
            {this.state.editMode ?
                <input type="text" value={this.state.status}
                       onChange={this.onChangeStatus}
                       autoFocus onBlur={this.deActiveEditMode}/>:
                <span onDoubleClick={this.activeEditMode}>{this.props.status}</span>
            }
        </div>
    }
}