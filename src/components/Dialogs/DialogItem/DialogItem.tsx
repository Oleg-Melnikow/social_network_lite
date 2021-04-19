import {NavLink} from "react-router-dom";
import { DialogType } from "../../../redux/dialogsReducer";
import style from "../Dialogs.module.css";

export function DialogItem(props: DialogType) {
    return (
        <div className={style.dialog}>
            <NavLink to={`/dialogs/${props.id}`}>{props.name}</NavLink>
        </div>
    )
}


